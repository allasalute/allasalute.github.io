import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Tooltip from "../Tooltip";
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

it("tooltip Renders Correctly", async () => {
  act(() => {
    root.render(<Tooltip text="Tooltip here" />);
  });
  const button = container.querySelector("[data-testid='tooltip'");

  expect(button).not.toBeNull();
  expect(button.nodeName).toBe("P");
  expect(button.className).toContain("c-tooltip__text");
  expect(button.innerHTML).toBe("Tooltip here");
});
