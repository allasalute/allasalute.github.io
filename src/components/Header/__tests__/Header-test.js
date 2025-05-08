import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Header from "../Header";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { createRoot } from 'react-dom/client';

import "i18n";

let container = null;
let root = null;

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  // cleanup on exiting
  root.unmount();
  container.remove();
  container = null;
});

it("Header Renders Elements Correctly", async () => {
  const history = createMemoryHistory();

  act(() => {
    root.render(
      <Router history={history}>
        <Header onNotificationClick={() => {}} />
      </Router>
    );
  });
  const navbar = container.querySelector("[data-testid='navbar'");
  const logo = container.querySelector("[data-testid='logo'");

  expect(navbar).not.toBeNull();
  expect(navbar.nodeName).toBe("NAV");
  expect(logo.className).toContain("c-header__logo");
});
