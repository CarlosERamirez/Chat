import React from "react";
import { Provider } from "react-redux";
import firebase from 'firebase/compat/app';
import "firebase/database";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { createFirestoreInstance } from "redux-firestore";
import { store } from "../../redux/store";
import { apiConfig, firebaseConfig } from "../../config";


try {
  firebase.initializeApp(firebaseConfig);
} catch (err) {}

const rrfProps = {
  firebase,
  config: {
    userProfile: apiConfig.db,
    useFirestoreForProfile: true,
  },
  dispatch: store.dispatch,
  createFirestoreInstance,
};

function FirebaseProvider({ children }) {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        {children}
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}

export default FirebaseProvider;
