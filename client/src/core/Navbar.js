import React, {Fragment} from "react";
import {Link, withRouter} from "react-router-dom";
import {signout, isAuthenticated} from "../auth";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return {color: "#ff9900"};
  } else {
    return {color: "#ffffff"};
  }
};

const Navbar = ({history}) => {
  return (
    <nav className="navbar navbar-inverse fixed-top" id="sidebar-wrapper" role="navigation">
      <ul className="nav sidebar-nav">
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <a href="/">File Storage</a></div>
        </div>

        <li className="nav-item">
          <Link
            className="nav-link"
            style={isActive(history, "/")}
            to="/"
          >
            <i className="fa fa-home"></i>&nbsp;Home
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className="nav-link"
            style={isActive(history, "/contacts")}
            to="/contacts"
          >
            <i className="fa fa-at"></i>&nbsp;Contacts
          </Link>
        </li>

        {!isAuthenticated() && (
          <Fragment>
            <li className="nav-item">
              <Link
                className="nav-link"
                style={isActive(history, "/signin")}
                to="/signin"
              >
                <i className="fa fa-sign-in"></i>&nbsp;Signin
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                style={isActive(history, "/signup")}
                to="/signup"
              >
                <i className="fa fa-registered"></i>&nbsp;Signup
              </Link>
            </li>
          </Fragment>
        )}

        {isAuthenticated() && isAuthenticated().user.role === 1 && (
          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, "/admin/dashboard")}
              to="/admin/dashboard"
            >
              <i className="fa fa-dashboard"></i>&nbsp;Admin Dashboard
              <br/>
            </Link>
          </li>
        )}

        {isAuthenticated() && isAuthenticated().user.role === 0 && (
          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, "/user/dashboard")}
              to="/user/dashboard"
            >
              <i className="fa fa-dashboard"></i>&nbsp;Dashboard
            </Link>
          </li>
        )}

        {isAuthenticated() && (
          <li className="nav-item">
                    <span
                      className="nav-link"
                      style={{cursor: "pointer", color: "#ffffff"}}
                      onClick={() =>
                        signout(() => {
                          history.push("/");
                        })
                      }
                    >
                        <i className="fa fa-sign-out"></i>&nbsp;Signout
                    </span>
          </li>
        )}

      </ul>
      <footer>
        <div className="footer-copyright py-1">
          &copy; Fedorenko A.G., 2017-{new Date().getFullYear()}
        </div>
      </footer>
    </nav>
  )
}

export default withRouter(Navbar);



