import React, { useState, useEffect, useContext } from "react";
import { store } from "./store.js";
import { useProjectsDispatch } from "./utils/utility_functions";
import history from "./utils/history";
import { StripeProvider } from "react-stripe-elements";
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
  const { state, dispatch } = useContext(store);
  const { projects } = state;
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useProjectsDispatch(`http://localhost:3000/projects`, store, "projects");

  const handleWindowResize = () => {
    setWindowWidth(window.innerWidth);
    dispatch({ type: "mobile", payload: windowWidth < 780 ? true : false });
  };

  useEffect(() => {
    handleWindowResize();
    // async function fetchProjects() {
    //   dispatch({ type: "projects", payload: getProjects() });
    // }
    // if (!projects) fetchProjects();
    // if (!projects) dispatch({ type: "projects", payload: getProjects() });
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [windowWidth]);

  // useEffect(() => {
  //   // if (!projects) getProjects();
  // if (!projects) dispatch({ type: "projects", payload: "hello" });
  // });

  // const checkoutProject = project => {
  //   project ? setCheckout({ ...project }) : setCheckout(null);
  // };

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
    </StripeProvider>
  );
};

export default App;
