import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { Provider } from "react-redux";
import { act } from "react-dom/test-utils";
import Results from "../ResultsContainer";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import configureMockStore from "redux-mock-store";

import "i18n";

const mockStore = configureMockStore();
const userDrinksStore = mockStore({
  questionnaire: {
    questions: [],
    response: [
      {
        question: "one",
        value: "2"
      },
      {
        question: "two",
        value: "3"
      },
      {
        question: "three",
        value: "2"
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
        value: 60
      }
    ],
    currentSection: 0,
    hasStarted: false
  }
});

const userTeetotalStore = mockStore({
  questionnaire: {
    questions: [],
    response: [
      {
        question: "one",
        value: "0"
      },
      {
        question: "two",
        value: "0"
      },
      {
        question: "three",
        value: "0"
      },
      {
        question: "four",
        value: "non-smoker"
      },
      {
        question: "five",
        value: 162 // default to UK average height in cm
      },
      {
        question: "six",
        value: 60
      }
    ],
    currentSection: 0,
    hasStarted: false
  }
});

const userUnderweightStore = mockStore({
  questionnaire: {
    questions: [],
    response: [
      {
        question: "one",
        value: "0"
      },
      {
        question: "two",
        value: "0"
      },
      {
        question: "three",
        value: "0"
      },
      {
        question: "four",
        value: "non-smoker"
      },
      {
        question: "five",
        value: 180
      },
      {
        question: "six",
        value: 50
      }
    ],
    currentSection: 0,
    hasStarted: false
  }
});

const userOverweightStore = mockStore({
  questionnaire: {
    questions: [],
    response: [
      {
        question: "one",
        value: "0"
      },
      {
        question: "two",
        value: "0"
      },
      {
        question: "three",
        value: "0"
      },
      {
        question: "four",
        value: "non-smoker"
      },
      {
        question: "five",
        value: 130
      },
      {
        question: "six",
        value: 100
      }
    ],
    currentSection: 0,
    hasStarted: false
  }
});

const userAverageWeightStore = mockStore({
  questionnaire: {
    questions: [],
    response: [
      {
        question: "one",
        value: "0"
      },
      {
        question: "two",
        value: "0"
      },
      {
        question: "three",
        value: "0"
      },
      {
        question: "four",
        value: "non-smoker"
      },
      {
        question: "five",
        value: 170
      },
      {
        question: "six",
        value: 60
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

it("Results Renders Elements Correctly When User Drinks Alcohol", async () => {
  const history = createMemoryHistory();

  act(() => {
    render(
      <Router history={history}>
        <Provider store={userDrinksStore}>
          <Results />
        </Provider>
      </Router>,

      container
    );
  });
  const title = container.querySelector("[data-testid='title'");
  const drinkerComparison = container.querySelector("[data-testid='drinker-comparison'");

  //expect(JSON.stringify(title.nodeName)).toBe("H2");
  //expect(drinkerComparison.nodeName).toBe(JSON.parse("DIV"));
});

it("Results Renders Elements Correctly When User Is Teetotal", async () => {
  const history = createMemoryHistory();

  act(() => {
    render(
      <Router history={history}>
        <Provider store={userTeetotalStore}>
          <Results />
        </Provider>
      </Router>,

      container
    );
  });
  const title = container.querySelector("[data-testid='title'");
  const drinkerComparison = container.querySelector("[data-testid='drinker-comparison'");

  //expect(title.nodeName).toBe("H2");
  //expect(drinkerComparison).toBe(null);
});

it("Results Renders Elements Correctly When User Is A Smoker", async () => {
  const history = createMemoryHistory();

  act(() => {
    render(
      <Router history={history}>
        <Provider store={userDrinksStore}>
          <Results />
        </Provider>
      </Router>,

      container
    );
  });
  const smokerText = container.querySelector("[data-testid='smoker-data'");
  //expect(smokerText).not.toHaveTextContent(JSON.parse("You said you do not smoke"));
});

it("Results Renders Elements Correctly When User Is A Non-Smoker", async () => {
  const history = createMemoryHistory();

  act(() => {
    render(
      <Router history={history}>
        <Provider store={userTeetotalStore}>
          <Results />
        </Provider>
      </Router>,

      container
    );
  });
  //const smokerText = container.querySelector("[data-testid='smoker-data'");
  //expect(smokerText).toHaveTextContent("You said you do not smoke");
});

it("Results Renders Elements Correctly When User Is Underweight", async () => {
  const history = createMemoryHistory();

  act(() => {
    render(
      <Router history={history}>
        <Provider store={userUnderweightStore}>
          <Results />
        </Provider>
      </Router>,

      container
    );
  });
  //const bmiText = container.querySelector("[data-testid='bmi-data'");
  //expect(bmiText).toHaveTextContent("(BMI) is 15.4");
});

it("Results Renders Elements Correctly When User Is Average Weight", async () => {
  const history = createMemoryHistory();

  act(() => {
    render(
      <Router history={history}>
        <Provider store={userAverageWeightStore}>
          <Results />
        </Provider>
      </Router>,

      container
    );
  });
  //const bmiText = container.querySelector("[data-testid='bmi-data'");
  //expect(bmiText).toHaveTextContent("you have a healthy weight");
});

it("Results Renders Elements Correctly When User Is Overweight", async () => {
  const history = createMemoryHistory();

  act(() => {
    render(
      <Router history={history}>
        <Provider store={userOverweightStore}>
          <Results />
        </Provider>
      </Router>,

      container
    );
  });
  //const bmiText = container.querySelector("[data-testid='bmi-data'");
  //expect(bmiText).toHaveTextContent("your body mass index may be high.");
});
