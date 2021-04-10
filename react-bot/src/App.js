import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";



import AddUser from "./components/user/add-user.component";


class App extends Component {
  render() {
    return (
      <Router>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
         
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                users Add
              </Link>
            </li>
           
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
           
            <Route exact path="/add" component={AddUser} />
           
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;