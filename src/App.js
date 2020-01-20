import React, { useState, useEffect, useContext } from "react";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer.js";
import PrivateRoute from "./components/PrivateRoute.js";
import Home from "./containers/Home";
import Projects from "./containers/Projects";
import Project from "./containers/Project";
import Pledge from "./containers/Pledge";
import About from "./containers/About";
import Account from "./containers/Account";
import { StripeProvider } from "react-stripe-elements";
import { Segment, Container } from "semantic-ui-react";
import "./App.css";
import { Router, Route, Switch } from "react-router-dom";
import history from "./utils/history";

import { store } from "./store.js";

const App = () => {
  const { state, dispatch } = useContext(store);
  const { projects } = state;
  // const [projects, setProjects] = useState([]);
  const [checkout, setCheckout] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  // const [mobile, setMobile] = useState(false);

  const handleWindowResize = () => {
    setWindowWidth(window.innerWidth);
    // windowWidth < 780 ? setMobile(true) : setMobile(false);
    windowWidth < 780
      ? dispatch({ type: "mobile", payload: true })
      : dispatch({ type: "mobile", payload: false });
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

  useEffect(() => {
    if (projects.length === 0) getProjects();
  });

  const checkoutProject = project => {
    project ? setCheckout({ ...project }) : setCheckout(null);
  };

  const getProjects = async () => {
    const endpoint = `http://localhost:3000/projects`;
    const response = await fetch(endpoint);
    const data = await response.json();
    // setProjects(data);
    dispatch({ type: "projects", payload: data });
  };

  return (
    <StripeProvider apiKey="pk_test_waOqfE4v56zJkQEG6l4EgKUD004Ku9v3wY">
      <Router history={history}>
        <div className="App">
          <Segment vertical>
            <NavBar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route
                exact
                path="/projects"
                render={props => (
                  <Projects
                    {...projects}
                    getProjects={getProjects}
                    context="index"
                  />
                )}
              />
              <Route
                path="/projects/:name"
                render={props => (
                  <Project
                    {...projects}
                    getProjects={getProjects}
                    checkoutProject={checkoutProject}
                  />
                )}
              />
              <Route
                path="/pledge"
                render={props => (
                  <Pledge
                    {...projects}
                    getProjects={getProjects}
                    checkout={checkout}
                    checkoutProject={checkoutProject}
                  />
                )}
              />
              <Route path="/about" component={About} />
              <PrivateRoute path="/account" component={Account} />
            </Switch>
            <Footer />
          </Segment>
        </div>
      </Router>
    </StripeProvider>
  );
};

export default App;
