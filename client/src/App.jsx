import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingPage from "./LandingPage";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import { withFirebase } from "./components/Firebase";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null
    };
  }
  /*
  componentDidMount() {
    this.listener = this.props.firebase.auth().onAuthStateChanged(authUser => {
      authUser
        ? this.setState({ authUser })
        : this.setState({ authUser: null });
    });
  }

  componentWillUnmount() {
    this.listener();
  }
*/
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
              render={props => (
                <Profile {...props} authUser={this.state.authUser} />
              )}
            />
            <Route
              exact
              path="/glucose_average"
              render={props => (
                <LandingPage {...props} authUser={this.state.authUser} />
              )}
            />
            <Route
              exact
              path="/ac1"
              render={props => (
                <LandingPage {...props} authUser={this.state.authUser} />
              )}
            />
            <Route
              exact
              path="/ressetpassword"
              render={props => (
                <LandingPage {...props} authUser={this.state.authUser} />
              )}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}
export default App;
