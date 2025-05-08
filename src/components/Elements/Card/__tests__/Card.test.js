import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Card from "../Card";
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

it("Card Renders Correctly", async () => {
  act(() => {
    root.render(<Card>Click here</Card>);
  });
  const card = container.querySelector("[data-testid='card'");

  expect(card).not.toBeNull();
  expect(card.nodeName).toBe("DIV");
  expect(card.className).toContain("c-card");
  expect(card.innerHTML).toContain("Click here");
});
