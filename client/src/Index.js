import React from 'react';
import {
  render
} from 'react-dom';
import App from './App';
import Firebase, {
  FirebaseContext
} from './components/Firebase';


render( < FirebaseContext.Provider value = {
      new Firebase()
    } >
    <
    App / >
    <
    /FirebaseContext.Provider> , document.getElementById('app'));