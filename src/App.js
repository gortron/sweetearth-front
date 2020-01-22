import React, { useState, useEffect, useContext } from "react";
import { store } from "./store.js";
import { useProjectsDispatch } from "./utils/utility_functions";
import history from "./utils/history";
import { Router, Route, Switch } from "react-router-dom";
import { Segment } from "semantic-ui-react";
import "./App.css";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer.js";
import PrivateRoute from "./components/PrivateRoute.js";
import Home from "./containers/Home";
import Projects from "./containers/Projects";
import Project from "./containers/Project";
import Pledge from "./containers/Pledge";
import About from "./containers/About";
import Account from "./containers/Account";

const App = () => {
  const { dispatch } = useContext(store);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useProjectsDispatch(
    `https://sweetearth.herokuapp.com/projects`,
    store,
    "projects"
  );

  const handleWindowResize = () => {
    setWindowWidth(window.innerWidth);
    dispatch({ type: "mobile", payload: windowWidth < 780 ? true : false });
  };

  useEffect(() => {
    handleWindowResize();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [windowWidth]);

  return (
    <Router history={history}>
      <div className="App">
        <Segment vertical>
          <NavBar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              exact
              path="/projects"
              render={props => <Projects page="projects" />}
            />
            <Route path="/projects/:name" component={Project} />
            <Route path="/pledge" component={Pledge} />
            <Route path="/about" component={About} />
            <PrivateRoute path="/account" component={Account} />
          </Switch>
          <Footer />
        </Segment>
      </div>
    </Router>
  );
};

export default App;
