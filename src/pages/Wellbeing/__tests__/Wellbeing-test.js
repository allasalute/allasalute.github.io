import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { Provider } from "react-redux";
import { act } from "react-dom/test-utils";
import Wellbeing from "../Wellbeing";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import configureMockStore from "redux-mock-store";

import "i18n";

const mockStore = configureMockStore();
const store = mockStore({
  questionnaire: {
    questions: [],
    response: [
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
    ],
    currentSection: 0,
    hasStarted: false
  }
});

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

it("Weight Renders Elements Correctly", async () => {
  const history = createMemoryHistory();

  act(() => {
    render(
      <Router history={history}>
        <Provider store={store}>
          <Wellbeing />
        </Provider>
      </Router>,

      container
    );
  });
  const title = container.querySelector("[data-testid='title'");

  expect(title.nodeName).toBe("H2");
});
