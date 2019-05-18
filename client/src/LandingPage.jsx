import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";

export default class LandingPage extends Component {
  render() {
    return (
      <header>
        <section class="header-content">
          <img
            class="rocky-dashed animate-pop-in"
            src="https://cssanimation.rocks/levelup/public/images/rocky-dashed.svg"
          />
          <h1 class="header-title animate-pop-in">Antidia</h1>
          <h3 class="header-subtitle animate-pop-in">
            The personal tracker for diabetes for all your needs
          </h3>
          <p class="header-button animate-pop-in">
            <a
              href="http://courses.cssanimation.rocks/p/level-up"
              class="button"
            >
              Get started today
            </a>
          </p>
        </section>
      </header>
    );
  }
}
