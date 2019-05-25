import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingPage from "./LandingPage";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Login from "./Login";

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
              render={props => <SignIn {...props} isAuthed={true} />}
            />
            <Route
              exact
              path="/signUp"
              render={props => <SignUp {...props} isAuthed={true} />}
            />

            <Route
              exact
              path="/profile"
              render={props => <Profile {...props} isAuthed={true} />}
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
            <Route
              exact
              path="/ressetpassword"
              render={props => <LandingPage {...props} isAuthed={true} />}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}
