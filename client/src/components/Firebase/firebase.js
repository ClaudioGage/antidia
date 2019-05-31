import app from "firebase/app";
import {
  AUTH_CONFIG
} from "/home/hc-39/Documents/Antidia/env.js";
import "firebase/auth";
import "firebase/database";

const config = {
  apiKey: AUTH_CONFIG.apiKey,
  authDomain: AUTH_CONFIG.authDomain,
  databaseURL: AUTH_CONFIG.databaseURL,
  projectId: AUTH_CONFIG.projectId,
  storageBucket: AUTH_CONFIG.storageBucket,
  messagingSenderId: AUTH_CONFIG.messagingSenderId
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

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  /* Database API */

  // post specifc user by id
  user = uid => this.db.ref(`users/${uid}`);

  // get all users
  users = () => this.db.ref("users");

  //create glucose
  crg = uid => this.db.ref(`users/${uid}/glucose/`);

  // uid the specific user
  // gid the glucose measure created, used to create the child containing all glucose measurements
  glucose = (uid, gid) => this.db.ref(`users/${uid}/glucose/${gid}`);

  // Post request to add glucose level and date

  glda = (uid, glu, date) => {
    var gludate = {};
    gludate["date"] = date;
    gludate["glucoseLevel"] = glu;
    console.log("this is gludate ...", gludate);
    this.db
      .ref(`users/${uid}/glucose/`)
      .child("glucoseLevels")
      .push(gludate);
  };

  retrieve = uid => {
    var db = this.db;
    return new Promise(function (resolve, reject) {
      db.ref(`users/${uid}/glucose/glucoseLevels`)
        .on("value", function (snapshot) {
          console.log(" this is unfiltered data ...", snapshot.val());
          var data = snapshot.val();
          var dateglu = [];

          var keys = Object.keys(data);

          for (var i = 0; i < keys.length; i++) {
            var x = keys[i];
            var date = data[x].date;
            var glucose = data[x].glucoseLevel;
            var info = [date, glucose];
            dateglu.push(info);
          }
          console.log("filter data array of arrays...", dateglu);
          return resolve(dateglu);
        });
    })

  };
}

export default Firebase;