import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";


export const List = ({items, clearItems, deleteItem, editItem}) => {
  return (
    <article className="grocery-container">
      {items.map(item => {
        return (
          <div key={item.id} className="grocery-item">
            <p className="title">{item.item}</p>
            <div>
              <button onClick={() => editItem(item)} className="edit-btn"><FaEdit /></button>
              <button onClick={() => deleteItem(item.id)} className="delete-btn"><FaTrash /></button>
            </div>
          </div>
        )
      })}
      {items.length > 0 && <button onClick={clearItems} className="clear-btn">clear items</button>}
    </article>
  )
}
