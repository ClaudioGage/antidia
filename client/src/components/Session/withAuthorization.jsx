import React from "react";
import { withRouter } from "react-router-dom";
import AuthUserContext from "./context";
import { withFirebase } from "../Firebase";
import { compose } from "recompose";

/*
how to establish the condition based on the the type of authorization

basic condition:
const condition = authUser => !!authUser;

role-based authorization
const condition = authUser => authUser.role === 'ADMIN';

permission-based authorization - can edit the account
const condition = authUser => authUser.permissions.canEditAccount;

ex.

 export default withAuthorization("Name of component")("type of condition"):

*/

const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
        if (!condition(authUser)) {
          this.props.history.push("/login");
        }
      });
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser =>
            condition(authUser) ? <Component {...this.props} /> : null
          }
        </AuthUserContext.Consumer>
      );
    }
  }
  return compose(
    withRouter,
    withFirebase
  )(WithAuthorization);
};

export default withAuthorization;
