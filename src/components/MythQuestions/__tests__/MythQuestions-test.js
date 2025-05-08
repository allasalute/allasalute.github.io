import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import MythQuestions from "../MythQuestions";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { mythOrRiskQuestions } from "constants/mythQuestions";

import "i18n";

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

it("MythQuestions Renders Elements Correctly", async () => {
  const history = createMemoryHistory();

  act(() => {
    root.render(
      <Router history={history}>
        <MythQuestions questionsList={mythOrRiskQuestions} onChange={() => {}} />
      </Router>
    );
  });
  const title = container.querySelector("[data-testid='title'");

  expect(title).not.toBeNull();
  expect(title.nodeName).toBe("H2");
});
