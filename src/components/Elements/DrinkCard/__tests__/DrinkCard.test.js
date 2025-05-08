import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import DrinkCard from "../DrinkCard";
import pintImage from "assets/images/drinks/pint-b.svg";
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

it("DrinkCard Renders Correctly", async () => {
  act(() => {
    root.render(
      <DrinkCard content={{ title: "click here", description: "description", image: pintImage }}>Click here</DrinkCard>
    );
  });
  const card = container.querySelector("[data-testid='drink-card'");

  expect(card).not.toBeNull();
  expect(card.nodeName).toBe("DIV");
  expect(card.className).toContain("c-drink-card");
  expect(card.innerHTML).toContain("Click here");
});
