import React, { Component } from "react";
import { Link } from "react-router-dom";
import SignOut from "./SignOut";
import { AuthUserContext } from "./components/Session";

export default class Navigation extends Component {
  render() {
    return (
      <div>
        <ul className="navigation">
          <li>
            <AuthUserContext.Consumer>
              {authUser => (
                <div className="consumer-letter">Account: {authUser.email}</div>
              )}
            </AuthUserContext.Consumer>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/glucose_average">Profile</Link>
          </li>
          <li>
            <Link to="/ac1">AC1</Link>
          </li>
          <li>
            <Link to="/">
              <SignOut />
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}
