import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { SignUpLink } from "./SignUp";
import { withFirebase } from "/home/hc-39/Documents/Antidia/client/src/components/Firebase";
//"/home/hc-39/Documents/Antidia/client/src/components/Firebase" for use in hc

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push("/profile");
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === "" || email === "";

    return (
      <div>
        <div>
          <form onSubmit={this.onSubmit}>
            <input
              name="email"
              value={email}
              onChange={this.onChange}
              type="text"
              placeholder="Email Address"
            />
            <input
              name="password"
              value={password}
              onChange={this.onChange}
              type="password"
              placeholder="Password"
            />
            <button disabled={isInvalid} type="submit">
              Sign In
            </button>

            {error && <p>{error.message}</p>}
          </form>
        </div>
        <div>
          <SignUpLink />
        </div>
        <div>
          <Link to={"/forgotpassword"}>Forgot Password?</Link>
        </div>
      </div>
    );
  }
}

export default withRouter(withFirebase(SignInFormBase));
