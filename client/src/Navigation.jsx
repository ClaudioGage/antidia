import React, { Component } from "react";
import { Link } from "react-router-dom";
import SignOut from "./SignOut";

export default class Navigation extends Component {
  render() {
    return (
      <div>
        <nav>
          <Link to="/profile">Profile</Link>
          <Link to="/glucose_average">Glucose</Link>
          <Link to="/ac1">AC1</Link>
          <Link to="/">
            <SignOut />
          </Link>
        </nav>
      </div>
    );
  }
}
