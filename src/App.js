import React from "react";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import FirebaseProvider from "./components/Auth/FirebaseProvider";
import Register from "./views/Register/Register";


const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <FirebaseProvider>
        <Register></Register>
      </FirebaseProvider>
    </Router>
  );
}

export default App;
