import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class LandingPage extends Component {
  render() {
    return (
      <header>
        <section className="header-content">
          <img className="rocky-dashed animate-pop-in" src="" />
          <h1 className="header-title animate-pop-in">Antidia</h1>
          <h3 className="header-subtitle animate-pop-in">
            Diabetes personal tracker for all your needs
          </h3>
          <p className="header-button animate-pop-in">
            <a>
              <Link to="/signUp">
                <button className="button">SIGN UP</button>
              </Link>

              <Link to="/login">
                <button className="button">LOG IN</button>
              </Link>
            </a>
          </p>
        </section>
      </header>
    );
  }
}
