import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Tag from "../Tag";

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

it("Tag Renders Correctly", async () => {
  act(() => {
    render(<Tag text="Tag here" />, container);
  });
  const button = container.querySelector("[data-testid='tag'");

  expect(button.nodeName).toBe("P");
  expect(button.className).toContain("c-tag");
  expect(button.innerHTML).toBe("Tag here");
});
