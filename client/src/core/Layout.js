import React from "react";

const Layout = ({title, description, className, children}) => (
  <div className={className}>
    <h2>{title}</h2>
    <p className="lead">{description}</p>
    {children}
  </div>
);

export default Layout;





