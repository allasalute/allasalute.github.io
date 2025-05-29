import "core-js/es";
import "react-app-polyfill/ie11";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import configureStore from "./redux/configureStore";
import "sanitize.css";
import "./style/main.scss";
import App from "./components/App/App";
import * as serviceWorker from "./serviceWorker";
import * as Sentry from "@sentry/browser";
import { HashRouter as Router } from "react-router-dom";
import "./i18n";
import "moment/locale/en-gb";

const networkWhitelistErrors = [401, 403, 422];

if (process.env.NODE_ENV === "production") {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    environment: process.env.REACT_APP_ENVIRONMENT,
    release: `${process.env.REACT_APP_NAME}@${process.env.REACT_APP_VERSION}`,
    beforeSend(event, hint) {
      if (hint && hint.originalException && networkWhitelistErrors.indexOf(hint.originalException.status) !== -1) {
        return null;
      }
      return event;
    }
  });
}

console.log(`${process.env.REACT_APP_ENVIRONMENT} ${process.env.REACT_APP_VERSION}`);

const storeConfig = configureStore({});

ReactDOM.render(
  <Provider store={storeConfig.store}>
    <PersistGate loading={null} persistor={storeConfig.persistor}>
      <Router>
        <App />
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
