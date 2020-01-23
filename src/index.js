import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { StateProvider } from "./store.js";
import { StripeProvider } from "react-stripe-elements";
import { Auth0Provider } from "./utils/react-auth0";
import config from "./auth_config.json";
import history from "./utils/history";
import * as serviceWorker from "./serviceWorker";

// A function that routes the user to the right place
// after login
const onRedirectCallback = appState => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

const app = (
  <StateProvider>
    <Auth0Provider
      domain={config.domain}
      client_id={config.clientId}
      redirect_uri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      <StripeProvider apiKey="pk_live_pmqnlQzvbBpYSS4LHztsn2la00Gpj4L43A">
        <App />
      </StripeProvider>
    </Auth0Provider>
  </StateProvider>
);

ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
