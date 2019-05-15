import React, {Component} from "react";
import UserContext from "../../context/user.js";
import {login, logout, getSavedLogin} from "../services/login-svc.js";
import bindMethodsToObject from "../helpers/bind-methods.js";

const NUM_OF_TRIES = 100; // 1 try every 2 seconds = 200 seconds

class User extends Component {

  constructor(props) {
    super(props);

    bindMethodsToObject(this, "_login", "_logout");

    this.state = {
      loggedIn: !!getSavedLogin(),
      login: this._login,
      logout: this._logout
    };

    this._attempts = NUM_OF_TRIES;
  }

  _login() {
    login();
    this._clearInterval();
    this._interval = setInterval(() => this._checkLogin(), 2000);
    this._attempts = NUM_OF_TRIES;
  }

  _logout() {
    logout();
    this._clearInterval();
    this.setState({loggedIn: false})
  }

  _clearInterval() {
    if(this._interval !== undefined) {
      clearInterval(this._interval)
    }
  }

  _checkLogin() {
    this._attempts--;
    if(this._attempts < 0) {
      this._clearInterval();
    }
    let token = getSavedLogin();
    if(token) {
      this.setState({loggedIn: true});
      this._clearInterval();
    }
  }

  render() {
    return (
      <UserContext.Provider value={this.state}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default User;