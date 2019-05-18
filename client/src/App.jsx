import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import LandingPage from "./LandingPage";

export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route
              exact
              path="/"
              render={props => <LandingPage {...props} isAuthed={true} />}
            />
            <Route
              exact
              path="/login"
              render={props => <LandingPage {...props} isAuthed={true} />}
            />
            <Route
              exact
              path="/signUp"
              render={props => <LandingPage {...props} isAuthed={true} />}
            />
            <Route
              exact
              path="/profile"
              render={props => <LandingPage {...props} isAuthed={true} />}
            />
            <Route
              exact
              path="/glucose_average"
              render={props => <LandingPage {...props} isAuthed={true} />}
            />
            <Route
              exact
              path="/ac1"
              render={props => <LandingPage {...props} isAuthed={true} />}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}
