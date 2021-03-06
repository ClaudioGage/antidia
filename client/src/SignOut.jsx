import React from "react";

import { withFirebase } from "./components/Firebase";

const SignOut = ({ firebase }) => (
  <button className="SignOut" type="button" onClick={firebase.doSignOut}>
    Sign Out
  </button>
);

export default withFirebase(SignOut);
