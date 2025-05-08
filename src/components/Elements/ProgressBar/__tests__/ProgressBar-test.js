import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import ProgressBar from "../ProgressBar";
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

it("Progress Bar Renders Correctly", async () => {
  act(() => {
    root.render(<ProgressBar min={0} max={6} value={3} />);
  });
  const progressBar = container.querySelector("[data-testid='progress-bar'");
  const steps = container.querySelectorAll(".c-progress-bar__step");
  const active = container.querySelectorAll(".c-progress-bar__step--active");
  const complete = container.querySelectorAll(".c-progress-bar__step--complete");

  expect(progressBar).not.toBeNull();
  expect(progressBar.nodeName).toBe("DIV");
  expect(progressBar.className).toContain("c-progress-bar");

  // Should have 6 steps, 3 complete, 1 active
  expect(steps.length).toBe(6);
  expect(active.length).toBe(1);
  expect(complete.length).toBe(3);
});
