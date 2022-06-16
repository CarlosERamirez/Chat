import React from "react";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import FirebaseProvider from "./components/Auth/FirebaseProvider";
import Home from "./views/Home";


const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <FirebaseProvider>
        <Home />
      </FirebaseProvider>
    </Router>
  );
}

export default App;
