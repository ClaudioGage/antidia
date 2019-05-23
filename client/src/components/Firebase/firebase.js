import app from 'firebase/app';
import {
  AUTH_CONFIG
} from "/home/hc-39/Documents/Antidia/env.js";

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
  }
}

export default Firebase;