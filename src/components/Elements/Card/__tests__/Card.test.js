import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Card from "../Card";

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

it("Card Renders Correctly", async () => {
  act(() => {
    render(<Card>Click here</Card>, container);
  });
  const card = container.querySelector("[data-testid='card'");

  expect(card.nodeName).toBe("DIV");
  expect(card.className).toContain("c-card");
  expect(card.innerHTML).toContain("Click here");
});
