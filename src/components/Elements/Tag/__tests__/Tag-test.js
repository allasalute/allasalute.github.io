import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { createRoot } from 'react-dom/client';
import { act } from "react-dom/test-utils";
import Tag from "../Tag";

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

it("Tag Renders Correctly", async () => {
  act(() => {
    root.render(<Tag text="Tag here" />);
  });
  const button = container.querySelector("[data-testid='tag'");

   expect(button).not.toBeNull();
  expect(button.nodeName).toBe("P");
  expect(button.className).toContain("c-tag");
  expect(button.innerHTML).toBe("Tag here");
});
