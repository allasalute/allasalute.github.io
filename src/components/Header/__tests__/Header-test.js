import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Header from "../Header";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

import "i18n";

let container = null;

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("Header Renders Elements Correctly", async () => {
  const history = createMemoryHistory();

  act(() => {
    render(
      <Router history={history}>
        <Header onNotificationClick={() => {}} />
      </Router>,
      container
    );
  });
  const navbar = container.querySelector("[data-testid='navbar'");
  const logo = container.querySelector("[data-testid='logo'");

  expect(navbar.nodeName).toBe("NAV");
  expect(logo.className).toContain("c-header__logo");
});
