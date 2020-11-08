import React from "react";

const NotFound = ({history}) => {

  return (
    <div className="col-sm-8 offset-sm-2">
      <h1 style={{fontSize: "3em"}}>
        Uppss... page <code>{history.location.pathname}</code> not found...
      </h1>
    </div>
  );
};

export default NotFound;





