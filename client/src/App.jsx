import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingPage from "./LandingPage";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Profile from "./Profile";
import { withAuthentication } from "./components/Session";
import ForgotPassword from "./components/Password/ForgetPassword";
import GlucoseAve from "./GlucoseAve";
import HAC1 from "./HAC1";

class App extends Component {
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
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/glucose_average" component={GlucoseAve} />} />
            <Route exact path="/ac1" component={HAC1} />} />
            <Route
              exact
              path="/forgotpassword"
              render={props => (
                <ForgotPassword {...props} authUser={this.state.authUser} />
              )}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}
export default withAuthentication(App);
