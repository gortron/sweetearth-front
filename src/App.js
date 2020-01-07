import React from "react";
import NavBar from "./components/NavBar";

import { Router, Route, Switch } from "react-router-dom";
import history from "./utils/history";

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <header>
          <NavBar />
        </header>
        <Switch>
          <Route path="/" exact />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
