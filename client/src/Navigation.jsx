import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navigation extends Component {
  render(){
    return(
      <nav>
      <Link to="/">Sign out</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/glucose_average">Glucose</Link>
      <Link to="/ac1">AC1</Link>
      </nav>
    )
  }
} 