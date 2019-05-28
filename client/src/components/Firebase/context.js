import React from 'react';

const FirebaseContext = React.createContext(null);
console.log(FirebaseContext.Consumer, "is there something going on with that");

// prettier-ignore

export const withFirebase = Component => props => (
  <FirebaseContext.Consumer>
    {firebase => <Component {...props} firebase={firebase} />}
  </FirebaseContext.Consumer>
);

    console.log(withFirebase);

    export default FirebaseContext;