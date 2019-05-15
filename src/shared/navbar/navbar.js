import React from "react";
import {Link} from "react-router-dom";
import UserContext from "../../context/user.js";

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container">
      <Link className="navbar-brand" to="/">Navbar</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"/>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              <i className="mdi mdi-home"/> Home
            </Link>
          </li>

          <UserContext.Consumer>
            {LoginDecider}
          </UserContext.Consumer>

        </ul>
      </div>
    </div>
  </nav>
);

const LoginDecider = (props) => (
  props.loggedIn ? <AuthenticatedUserMenu abc={123} {...props} /> : <AnonymousUserMenu {...props} />
);
// React.createElement(AuthenticatedUserMenu, {abc: 123, ...props})
// React.createElement(AuthenticatedUserMenu, Object.assign({}, {abc:123}, props));


const AnonymousUserMenu = (props) => (
  <li className="nav-item ml-1">
    <button type='button' className='btn btn-outline-light' onClick={props.login}>
      <i className="mdi mdi-account"/> Login
    </button>
  </li>
);

const AuthenticatedUserMenu = (props) => (
  <React.Fragment>
    <li className="nav-item">
      <Link className="nav-link" to="/albums">
        <i className="mdi mdi-album"/> Albums
      </Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link" to="/artists">
        <i className="mdi mdi-guitar-electric"/> Artists
      </Link>
    </li>
    <li className="nav-item ml-1">
      <button type='button' className='btn btn-outline-light' onClick={props.logout}>
        <i className="mdi mdi-account"/> Logout
      </button>
    </li>
  </React.Fragment>
);

export default Navbar;