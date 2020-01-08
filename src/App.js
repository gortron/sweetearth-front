import React, { useState } from "react";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer.js";
import Home from "./containers/Home";
import Projects from "./containers/Projects";
import Pledge from "./containers/Pledge";
import About from "./containers/About";
import Account from "./containers/Account";
import { Elements, StripeProvider } from "react-stripe-elements";
import CheckoutForm from "./components/CheckoutForm";
import { Router, Route, Switch } from "react-router-dom";
import history from "./utils/history";

const App = () => {
  return (
    <StripeProvider apiKey="pk_test_waOqfE4v56zJkQEG6l4EgKUD004Ku9v3wY">
      <div className="App">
        <Router history={history}>
          <header>
            <NavBar />
            <Footer />
            {/* <Elements>
              <CheckoutForm />
            </Elements> */}
          </header>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/projects" component={Projects} />
            <Route exact path="/pledge" component={Pledge} />
            <Route exact path="/about" component={About} />
            <Route exact path="/account" component={Account} />
          </Switch>
        </Router>
      </div>
    </StripeProvider>
  );
};

export default App;
