import app from 'firebase/app';
import {
  AUTH_CONFIG
} from "/home/hc-39/Documents/Antidia/env.js";
import 'firebase/auth';

const config = {
  apiKey: AUTH_CONFIG.apiKey,
  authDomain: AUTH_CONFIG.authDomain,
  databaseURL: AUTH_CONFIG.databaseURL,
  storageBucket: AUTH_CONFIG.storageBucket,
  messagingSenderId: AUTH_CONFIG.messagingSenderId,
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    //start auth
    this.auth = app.auth();
  }
  /*Auth API */

  //  methods to iniate registration/signup taking the email parameters
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  // methods to iniate login/signin taking the email parameters
  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  // methods to change and reset the password
  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);
}

export default Firebase;