import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Footer from "../Footer";

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

it("Footer Renders Correctly", async () => {
  act(() => {
    render(
      <Router>
        <Footer />
      </Router>,
      container
    );
  });
  const button = container.querySelector("[data-testid='footer'");

  expect(button.nodeName).toBe("FOOTER");
  expect(button.className).toContain("c-footer");
});
