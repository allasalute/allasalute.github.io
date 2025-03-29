import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import DrinkCard from "../DrinkCard";
import pintImage from "assets/images/drinks/pint-b.svg";

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

it("DrinkCard Renders Correctly", async () => {
  act(() => {
    render(
      <DrinkCard content={{ title: "click here", description: "description", image: pintImage }}>Click here</DrinkCard>,
      container
    );
  });
  const card = container.querySelector("[data-testid='drink-card'");

  expect(card.nodeName).toBe("DIV");
  expect(card.className).toContain("c-drink-card");
  expect(card.innerHTML).toContain("Click here");
});
