import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import MythQuestions from "../MythQuestions";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { mythOrRiskQuestions } from "constants/mythQuestions";

import "i18n";

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

it("MythQuestions Renders Elements Correctly", async () => {
  const history = createMemoryHistory();

  act(() => {
    render(
      <Router history={history}>
        <MythQuestions questionsList={mythOrRiskQuestions} onChange={() => {}} />
      </Router>,
      container
    );
  });
  const title = container.querySelector("[data-testid='title'");

  expect(title.nodeName).toBe("H2");
});
