import React from "react";


export const Alert = ({msg, type, show}) => {
  return (
    <div className="alert">
      {show && <p className={`alert-${type}`}>{msg}</p>}
    </div>
  )
}
