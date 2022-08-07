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

  //expect(title.nodeName).toBe(JSON.parse(JSON.stringify("H2")));
  //expect(drinkerComparison.nodeName).toBe(JSON.parse(JSON.stringify("DIV")));
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

  //expect(title.nodeName).toBe(JSON.parse(JSON.stringify("H2")));
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
  expect(smokerText).not.toHaveTextContent(JSON.parse(JSON.stringify("You said you do not smoke")));
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
  const smokerText = container.querySelector("[data-testid='smoker-data'");
  expect(smokerText).toHaveTextContent(
    JSON.parse(JSON.stringify("Hai detto che non fumi.Non fumare è uno dei modi migliori per mantenersi in salute."))
  );
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
  const bmiText = container.querySelector("[data-testid='bmi-data'");
  expect(bmiText).toHaveTextContent(
    JSON.parse(
      JSON.stringify(
        "Sulla base delle tue risposte, il tuo indice di massa corporea (BMI) è 15.4. Un BMI inferiore a 18,5 significa che il tuo peso è basso.Se sei preoccupato per questo, chiedi consiglio al tuo medico di famiglia."
      )
    )
  );
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
  const bmiText = container.querySelector("[data-testid='bmi-data'");
  expect(bmiText).toHaveTextContent(
    JSON.parse(
      JSON.stringify(
        "In base alle tue risposte, hai un peso ideale.Mantenere un peso inferiore a 72kg è un buon modo per rimanere in salute."
      )
    )
  );
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
  const bmiText = container.querySelector("[data-testid='bmi-data'");
  expect(bmiText).toHaveTextContent(
    JSON.parse(
      JSON.stringify(
        "In base alle tue risposte, il tuo indice di massa corporea è superiore alla norma.I medici raccomandano di mantenere un peso ideale per contenere i rischi di malattia.Per le donne della tua altezza, è inferiore a 42kg.Nella home page puoi trovare semplici consigli su un'alimentazione sana e su come mantenerti attiva."
      )
    )
  );
});
