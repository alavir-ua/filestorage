import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Navbar from "./core/Navbar";
import Home from "./core/Home";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import PrivateRoute from "./auth/PrivateRoute";
import AdminRoute from "./auth/AdminRoute";
import UserDashboard from "./user/UserDashboard";
import AdminDashboard from "./user/AdminDashboard";
import NotFound from "./core/NotFound";
import Contacts from "./core/Contacts";

const App = () => {
  return (
    <BrowserRouter>
      <div id="wrapper">
        <div className="overlay"></div>

      <Navbar/>

        <div id="page-content-wrapper">
          <button type="button" className="hamburger animated fadeInLeft is-closed" data-toggle="offcanvas">
            <span className="hamb-top"></span>
            <span className="hamb-middle"></span>
            <span className="hamb-bottom"></span>
          </button>
          <div className="container-fluid">
            <div className="row">
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/signup" exact component={Signup} />
                <PrivateRoute path="/user/dashboard" exact component={UserDashboard} />
                <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
                <Route exact path="/contacts" component={Contacts}/>
                <Route path="*" component={NotFound}/>
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App;





