import React, { useState, useEffect } from "react";
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
import { Segment } from "semantic-ui-react";
import "./App.css";
import { Router, Route, Switch } from "react-router-dom";
import history from "./utils/history";

const App = () => {
  const [projects, setProjects] = useState([]);
  const [checkout, setCheckout] = useState(null);

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
    setProjects(data);
  };

  return (
    <StripeProvider apiKey="pk_test_waOqfE4v56zJkQEG6l4EgKUD004Ku9v3wY">
      <Router history={history}>
        <div className="App">
          <Segment inverted vertical textAlign="center">
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
                )} // this seems to overwrite any other props being passed
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

{
  /* <Route path="/account" component={Account} /> */
}
