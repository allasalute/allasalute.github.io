import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import PersonalisedAdvice from "../PersonalisedAdvice";

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

it("PersonalisedAdvice Renders Category 5 Drinker Correctly", async () => {
  act(() => {
    render(<PersonalisedAdvice isUserADrinker={true} ewac={18} auditC={18} audit1={1} />, container);
  });
  const adviceText = container.querySelector("[data-testid='drink-cat-five'");

  expect(adviceText.nodeName).toBe("P");
});

it("PersonalisedAdvice Renders Not Drinker Advice Correctly", async () => {
  act(() => {
    render(<PersonalisedAdvice isUserADrinker={false} ewac={18} auditC={18} audit1={1} />, container);
  });
  const adviceText = container.querySelector("[data-testid='drink-cat-zero'");

  expect(adviceText.nodeName).toBe("P");
});

it("PersonalisedAdvice Renders Category 4 Drinker Correctly", async () => {
  act(() => {
    render(<PersonalisedAdvice isUserADrinker={true} ewac={16} auditC={18} audit1={1}/>, container);
  });
  const adviceText = container.querySelector("[data-testid='drink-cat-four'");

  expect(adviceText.nodeName).toBe("P");
});

it("PersonalisedAdvice Renders Category 3 Drinker Correctly", async () => {
  act(() => {
    render(<PersonalisedAdvice isUserADrinker={true} ewac={12} auditC={18} audit1={1} />, container);
  });
  const adviceText = container.querySelector("[data-testid='drink-cat-three'");

  expect(adviceText.nodeName).toBe("P");
});

it("PersonalisedAdvice Renders Category 6 Drinker Correctly", async () => {
  act(() => {
    render(<PersonalisedAdvice isUserADrinker={true} ewac={8} auditC={18} audit1={1} />, container);
  });
  const adviceText = container.querySelector("[data-testid='drink-cat-six'");

  expect(adviceText.nodeName).toBe("P");
});

it("PersonalisedAdvice Renders Category 1 and 2 Drinker Correctly", async () => {
  act(() => {
    render(<PersonalisedAdvice isUserADrinker={true} ewac={2} auditC={2} audit1={0} />, container);
  });
  const adviceText = container.querySelector("[data-testid='drink-cat-one-two'");

  expect(adviceText.nodeName).toBe("P");
});

it("PersonalisedAdvice Renders Category 1 and 2 Drinker Correctly", async () => {
  act(() => {
    render(<PersonalisedAdvice isUserADrinker={true} ewac={2} auditC={2} audit1={2} />, container);
  });
  const adviceText = container.querySelector("[data-testid='drink-cat-seven'");

  expect(adviceText.nodeName).toBe("P");
});
