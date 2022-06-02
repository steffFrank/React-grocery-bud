import React from "react";


export const Form = ({value, addItems, handleChange, isEdit}) => {
    return (
        <form className="form-control" onSubmit={addItems}>
            <input className="grocery" type="text" value={value} onChange={handleChange} placeholder="e.g eggs" />
            <button className="submit-btn" type="submit">
                {isEdit ? "edit" : "submit"}
            </button>
        </form>
    )
}