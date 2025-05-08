import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Button from "../Button";
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

it("Button Renders Correctly", async () => {
  act(() => {
    root.render(<Button>Click here</Button>);
  });
  const button = container.querySelector("[data-testid='button'");
  expect(button).not.toBeNull();
  expect(button.nodeName).toBe("BUTTON");
  expect(button.className).toContain("c-button");
  expect(button.innerHTML).toBe("Click here");
});

it("Light Button Renders Correctly", async () => {
  act(() => {
    root.render(<Button isLight>Click here</Button>);
  });
  const button = container.querySelector("[data-testid='button'");
  expect(button).not.toBeNull();
  expect(button.nodeName).toBe("BUTTON");
  expect(button.className).toContain("c-button");
  expect(button.className).toContain("c-button--is-light");
  expect(button.innerHTML).toBe("Click here");
});

it("Button Clicks Correctly", async () => {
  const mockFunc = jest.fn();

  act(() => {
    root.render(<Button onClick={mockFunc}>Click here</Button>);
  });
  const button = container.querySelector("[data-testid='button'");

  act(() => {
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  expect(mockFunc.mock.calls.length).toBe(1);
});
