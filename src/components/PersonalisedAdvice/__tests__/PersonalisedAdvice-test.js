import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import PersonalisedAdvice from "../PersonalisedAdvice";
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

it("PersonalisedAdvice Renders Category 5 Drinker Correctly", async () => {
  act(() => {
    root.render(<PersonalisedAdvice isUserADrinker={true} ewac={18} auditC={18} audit1={1} />);
  });
  const adviceText = container.querySelector("[data-testid='drink-cat-five'");
  expect(adviceText).not.toBeNull();
  expect(adviceText.nodeName).toBe("P");
});

it("PersonalisedAdvice Renders Not Drinker Advice Correctly", async () => {
  act(() => {
    root.render(<PersonalisedAdvice isUserADrinker={false} ewac={18} auditC={18} audit1={1} />);
  });
  const adviceText = container.querySelector("[data-testid='drink-cat-zero'");
  expect(adviceText).not.toBeNull();
  expect(adviceText.nodeName).toBe("P");
});

it("PersonalisedAdvice Renders Category 4 Drinker Correctly", async () => {
  act(() => {
    root.render(<PersonalisedAdvice isUserADrinker={true} ewac={16} auditC={18} audit1={1}/>);
  });
  const adviceText = container.querySelector("[data-testid='drink-cat-four'");
  expect(adviceText).not.toBeNull();
  expect(adviceText.nodeName).toBe("P");
});

it("PersonalisedAdvice Renders Category 3 Drinker Correctly", async () => {
  act(() => {
    root.render(<PersonalisedAdvice isUserADrinker={true} ewac={12} auditC={18} audit1={1} />);
  });
  const adviceText = container.querySelector("[data-testid='drink-cat-three'");
  expect(adviceText).not.toBeNull();
  expect(adviceText.nodeName).toBe("P");
});

it("PersonalisedAdvice Renders Category 6 Drinker Correctly", async () => {
  act(() => {
    root.render(<PersonalisedAdvice isUserADrinker={true} ewac={8} auditC={18} audit1={1} />);
  });
  const adviceText = container.querySelector("[data-testid='drink-cat-six'");
  expect(adviceText).not.toBeNull();
  expect(adviceText.nodeName).toBe("P");
});

it("PersonalisedAdvice Renders Category 1 and 2 Drinker Correctly", async () => {
  act(() => {
    root.render(<PersonalisedAdvice isUserADrinker={true} ewac={2} auditC={2} audit1={0} />);
  });
  const adviceText = container.querySelector("[data-testid='drink-cat-one-two'");
  expect(adviceText).not.toBeNull();
  expect(adviceText.nodeName).toBe("P");
});

it("PersonalisedAdvice Renders Category 1 and 2 Drinker Correctly", async () => {
  act(() => {
    root.render(<PersonalisedAdvice isUserADrinker={true} ewac={2} auditC={2} audit1={2} />);
  });
  const adviceText = container.querySelector("[data-testid='drink-cat-seven'");
  expect(adviceText).not.toBeNull();
  expect(adviceText.nodeName).toBe("P");
});
