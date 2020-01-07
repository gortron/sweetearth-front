import React from "react";
import NavBar from "./components/NavBar";
import { Elements, StripeProvider } from "react-stripe-elements";
import CheckoutForm from "./components/CheckoutForm";
import { Router, Route, Switch } from "react-router-dom";
import history from "./utils/history";

function App() {
  return (
    <StripeProvider apiKey="pk_test_waOqfE4v56zJkQEG6l4EgKUD004Ku9v3wY">
      <div className="App">
        <Router history={history}>
          <header>
            <NavBar />
            {/* <Elements>
              <CheckoutForm />
            </Elements> */}
          </header>
          <Switch>
            <Route path="/" exact />
          </Switch>
        </Router>
      </div>
    </StripeProvider>
  );
}

export default App;
