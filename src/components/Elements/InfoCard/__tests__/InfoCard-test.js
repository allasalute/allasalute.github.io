import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import InfoCard from "../InfoCard";

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

it("InfoCard Renders Correctly", async () => {
  act(() => {
    render(<InfoCard text="Info here" />, container);
  });
  const button = container.querySelector("[data-testid='info-card'");

  expect(button.nodeName).toBe("P");
  expect(button.className).toContain("c-info-card");
  expect(button.innerHTML).toBe("Info here");
});
