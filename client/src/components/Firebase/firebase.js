import firebase from 'firebase';
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

firebase.initializeApp(config);