import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Questions from "../Questions";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { questionsList } from "constants/questionnaire";
import { createRoot } from 'react-dom/client';

import "i18n";

let container = null;
let root = null;

const initialResponse = [
  {
    question: "one",
    value: null
  },
  {
    question: "two",
    value: null
  },
  {
    question: "three",
    value: null
  },
  {
    question: "four",
    value: null
  },
  {
    question: "five",
    value: 162 // default to UK average height in cm
  },
  {
    question: "six",
    value: null
  }
];

const answeredResponse = [
  {
    question: "one",
    value: "1"
  },
  {
    question: "two",
    value: "1"
  },
  {
    question: "three",
    value: "1"
  },
  {
    question: "four",
    value: "smoker"
  },
  {
    question: "five",
    value: 162 // default to UK average height in cm
  },
  {
    question: "six",
    value: 68
  }
];

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

it("Questions Renders Elements Correctly", async () => {
  const history = createMemoryHistory();

  act(() => {
    root.render(
      <Router history={history}>
        <Questions questionsList={questionsList} responses={initialResponse} onChange={() => {}} onAnswer={() => {}} />
      </Router>
    );
  });
  const title = container.querySelector("[data-testid='title'");
  const radioWrapper = container.querySelector("[data-testid='questionnaire-radio'");
  const emptyQuestionState = container.querySelector("[data-testid='blank-questionnaire'");
  const nextButton = container.querySelector("[data-testid='next-button'");

  expect(title.nodeName).toBe("H2");
  expect(nextButton.nodeName).toBe("BUTTON");
  expect(nextButton.disabled).toBe(true);
  expect(radioWrapper.className).toContain("c-questionnaire__radio-wrapper");
  expect(emptyQuestionState).toBe(null);
});

it("Questions Renders Elements Correctly When Responses Filled In", async () => {
  const history = createMemoryHistory();

  act(() => {
    root.render(
      <Router history={history}>
        <Questions questionsList={questionsList} responses={answeredResponse} onChange={() => {}} onAnswer={() => {}} />
      </Router>
    );
  });
  const title = container.querySelector("[data-testid='title'");
  const radioWrapper = container.querySelector("[data-testid='questionnaire-radio'");
  const emptyQuestionState = container.querySelector("[data-testid='blank-questionnaire'");
  const nextButton = container.querySelector("[data-testid='next-button'");

  expect(title.nodeName).toBe("H2");
  expect(nextButton.nodeName).toBe("BUTTON");
  expect(nextButton.disabled).toBe(false);
  expect(radioWrapper.className).toContain("c-questionnaire__radio-wrapper");
  expect(emptyQuestionState).toBe(null);
});

it("Questions Renders No Elements When QuestionsList Is Empty Array", async () => {
  const history = createMemoryHistory();

  act(() => {
    root.render(
      <Router history={history}>
        <Questions questionsList={[]} responses={initialResponse} onChange={() => {}} onAnswer={() => {}} />
      </Router>
    );
  });
  const emptyQuestionState = container.querySelector("[data-testid='blank-questionnaire'");
  const radioWrapper = container.querySelector("[data-testid='questionnaire-radio'");

  expect(emptyQuestionState.nodeName).toBe("DIV");
  expect(radioWrapper).toBe(null);
});
