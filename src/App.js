import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.scss';
import routes from "./routes.js";
import UserHandler from "./shared/user/user.js";

import Navbar from "./shared/navbar/navbar.js"

class App extends Component {
  render() {
    return (
      <UserHandler>
        <Router>
          <div className="App">
            <Navbar/>
            <Switch>
              {routes.map((route, indx) => (
                <Route key={indx} {...route} />
              ))}
            </Switch>
          </div>
        </Router>
      </UserHandler>
    );
  }
}

export default App;
