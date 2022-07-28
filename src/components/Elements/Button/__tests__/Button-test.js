import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Button from "../Button";

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

it("Button Renders Correctly", async () => {
  act(() => {
    render(<Button>Click here</Button>, container);
  });
  const button = container.querySelector("[data-testid='button'");

  expect(button.nodeName).toBe("BUTTON");
  expect(button.className).toContain("c-button");
  expect(button.innerHTML).toBe("Click here");
});

it("Light Button Renders Correctly", async () => {
  act(() => {
    render(<Button isLight>Click here</Button>, container);
  });
  const button = container.querySelector("[data-testid='button'");

  expect(button.nodeName).toBe("BUTTON");
  expect(button.className).toContain("c-button");
  expect(button.className).toContain("c-button--is-light");
  expect(button.innerHTML).toBe("Click here");
});

it("Button Clicks Correctly", async () => {
  const mockFunc = jest.fn();

  act(() => {
    render(<Button onClick={mockFunc}>Click here</Button>, container);
  });
  const button = container.querySelector("[data-testid='button'");

  act(() => {
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  expect(mockFunc.mock.calls.length).toBe(1);
});
