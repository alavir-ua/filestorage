import React from "react";

const Notification = ({message, success}) => {
  if (message === null) {
    return null
  }

  return (
    <div className={success ? "alert alert-success green-style" : "alert alert-danger red-style"} role="alert">
      {message}
    </div>
  )
}

export default Notification;





