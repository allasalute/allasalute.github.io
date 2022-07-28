// test-utils.js
import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "./redux/configureStore";
import { BrowserRouter as Router } from "react-router-dom";

function render(ui, { storeConfig = configureStore({}), ...renderOptions } = {}) {
  function Wrapper({ children }) {
    return (
      <Provider store={storeConfig.store}>
        <Router>{children}</Router>
      </Provider>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from "@testing-library/react";

// override render method
export { render };
