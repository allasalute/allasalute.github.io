import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import InfoCard from "../InfoCard";
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

it("InfoCard Renders Correctly", async () => {
  act(() => {
    root.render(<InfoCard text="Info here" />);
  });
  const button = container.querySelector("[data-testid='info-card'");

  expect(button).not.toBeNull();
  expect(button.nodeName).toBe("P");
  expect(button.className).toContain("c-info-card");
  expect(button.innerHTML).toBe("Info here");
});
