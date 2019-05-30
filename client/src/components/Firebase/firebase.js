import app from 'firebase/app';
import {
  AUTH_CONFIG
} from "/home/hc-39/Documents/Antidia/env.js";
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: AUTH_CONFIG.apiKey,
  authDomain: AUTH_CONFIG.authDomain,
  databaseURL: AUTH_CONFIG.databaseURL,
  projectId: AUTH_CONFIG.projectId,
  storageBucket: AUTH_CONFIG.storageBucket,
  messagingSenderId: AUTH_CONFIG.messagingSenderId,
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    //start auth
    this.auth = app.auth();
    // start database
    this.db = app.database();
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

  /* Database API */

  // post specifc user by id
  user = uid => this.db.ref(`users/${uid}`);

  // get all users
  users = () => this.db.ref('users');

  //create glucose
  crg = uid => this.db.ref(`users/${uid}/glucose/`);

  //post into into glucose
  // uid the specific user
  // gid the glucose measure created
  glucose = (uid, gid) => this.db.ref(`users/${uid}/glucose/${gid}`);

}

export default Firebase;