import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Tooltip from "../Tooltip";

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

it("tooltip Renders Correctly", async () => {
  act(() => {
    render(<Tooltip text="Tooltip here" />, container);
  });
  const button = container.querySelector("[data-testid='tooltip'");

  expect(button.nodeName).toBe("P");
  expect(button.className).toContain("c-tooltip__text");
  expect(button.innerHTML).toBe("Tooltip here");
});
