import React, { useEffect, useState } from "react";
import { List } from "./List";
import { Alert } from "./Alert";
import { Form } from "./Form";

const getLocalData = () => {
  const list = localStorage.getItem("listItems");
  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
}

export const App = () => {

  const [items, setItems] = useState(getLocalData());
  const [value, setValue] = useState("");
  const [alert, setAlert] = useState({msg: "", type: "", show: false})
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    setValue(e.target.value);
    
  }

  const addItems = (e) => {
    e.preventDefault();

    if (checkValue(value)) {
      return;
    }
    if (!value) {
      showAlert("please enter a value", "danger", true);
    } else if (value && isEdit) {
      
      setItems(prevItems => {
        return prevItems.map(item => {
          if (item.id === editId) {
            showAlert("value changed", "success", true);
            setEditId(null);
            setIsEdit(false);
            return {...item, item:value};
          }
          return item;
        })
      })
    } else {
      setItems(prevItems => {
        showAlert(`${value} added in the list`, "success", true);
        return [...prevItems,
          {id: new Date().getTime(), item: value}
        ]
      })
    }
    setValue("");
  }


  const deleteItem = (id) => {
    setItems(prevItems => {
      const deletedItem = items.find(item => item.id === id).item;
      showAlert(`${deletedItem} deleted from the list`);
      return prevItems.filter(item => item.id !== id);
    })
    
  }

  const clearItems = () => {
    showAlert("All values deleted from the list", "danger", true);
    setItems([]);
  }
  
  const showAlert = (msg="", type="danger", show=true) => {
    setAlert({msg, type, show});
  }

  const editItem = (item) => {
    setEditId(item.id)
    setValue(item.item);
    setIsEdit(true);
  }

  const checkValue = val => {
    const checkedVal = items.find(item => item.item.toLowerCase() === val.toLowerCase());
    if (checkedVal) {
      if (isEdit) {
        setIsEdit(false);
        setEditId(null);
      }
      showAlert(`${value} already in the list`, "danger", true);
      setValue("");
      return true;
    }
    return false;
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      showAlert("", "", false);
    }, 2000);
    return () => clearTimeout(timeout);
  })

  useEffect(() => {
    localStorage.setItem("listItems", JSON.stringify(items));
  }, [items])


  return (
      
    <div className="section-center">
      <Alert {...alert}/>
      <div className="grocery-form">
        <h3>grocery bud</h3>
        <Form addItems={addItems}
          handleChange={handleChange}
          value={value}
          isEdit={isEdit}/>
          <List items={items}
            clearItems={clearItems}
            deleteItem={deleteItem}
            editItem={editItem}/>
      </div>
    </div>
  )
}
