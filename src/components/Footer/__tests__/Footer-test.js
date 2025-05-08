import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Footer from "../Footer";
import { createRoot } from 'react-dom/client';

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

it("Footer Renders Correctly", async () => {
  act(() => {
    root.render(
      <Router>
        <Footer />
      </Router>
    );
  });
  const button = container.querySelector("[data-testid='footer'");

  expect(button).not.toBeNull();
  expect(button.nodeName).toBe("FOOTER");
  expect(button.className).toContain("c-footer");
});
