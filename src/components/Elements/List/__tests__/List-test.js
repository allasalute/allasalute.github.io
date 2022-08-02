//import React from "react";
import { createRoot } from "react-dom/client";
import { act } from "react-dom/test-utils";
//import List from "../List";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  const root = createRoot(container);
  root.unmount();
  container.remove();
  container = null;
});

it("List Renders Correctly", async () => {
  act(() => {
    createRoot(container);
  });
  const button = container.querySelector("[data-testid='list'");

  expect(button.nodeName).toBe("SPAN");
  expect(button.className).toContain("c-list");
});
