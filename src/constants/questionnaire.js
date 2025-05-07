const questionOne = [
  {
    key: "question-one-1",
    value: "0",
    subLabel: false
  },
  {
    key: "question-one-2",
    value: "1",
    subLabel: true
  },
  {
    key: "question-one-3",
    value: "2",
    subLabel: true
  },
  {
    key: "question-one-4",
    value: "3",
    subLabel: true
  },
  {
    key: "question-one-5",
    value: "4",
    subLabel: true
  },
  {
    key: "question-one-6",
    value: "5",
    subLabel: true
  }
];

const questionTwo = [
  {
    key: "question-two-1",
    value: "0",
    subLabel: true
  },
  {
    key: "question-two-2",
    value: "1",
    subLabel: true
  },
  {
    key: "question-two-3",
    value: "2",
    subLabel: true
  },
  {
    key: "question-two-4",
    value: "3",
    subLabel: true
  },
  {
    key: "question-two-5",
    value: "4",
    subLabel: true
  },
  {
    key: "question-two-6",
    value: "5",
    subLabel: true
  }
];

const questionThree = [
  {
    key: "question-three-1",
    value: "0",
    subLabel: false
  },
  {
    key: "question-three-2",
    value: "1",
    subLabel: false
  },
  {
    key: "question-three-3",
    value: "2",
    subLabel: false
  },
  {
    key: "question-three-4",
    value: "3",
    subLabel: false
  },
  {
    key: "question-three-5",
    value: "5",
    subLabel: false
  }
];

const questionFour = [
  {
    key: "question-four-1",
    value: "smoker",
    subLabel: false
  },
  {
    key: "question-four-2",
    value: "occasional-smoker",
    subLabel: false
  },
  {
    key: "question-four-3",
    value: "non-smoker",
    subLabel: false
  }
];

const questionFive = [
  {
    key: "question-five-1",
    options: [
      {
        label: "one",
        items: ["cm"]
      }
    ],
    value: 162
  }
];

const questionSix = [
  {
    key: "question-six-1",
    options: [
      {
        label: "one",
        items: ["kg"]
      }
    ],
    value: 0
  }
];

const questionSeven = [
  {
    key: "question-seven-days",
    options: [
      {
        label: "one",
        items: ["days"]
      }
    ],
    value: ""
  },
  {
    key: "question-seven-minutes",
    options: [
      {
        label: "two",
        items: ["minutes"]
      }
    ],
    value: ""
  }
];

const questionEight = [
  {
    key: "question-eight-days",
    options: [
      {
        label: "one",
        items: ["days"]
      }
    ],
    value: ""
  },
  {
    key: "question-eight-minutes",
    options: [
      {
        label: "two",
        items: ["minutes"]
      }
    ],
    value: ""
  }
];

const questionNine = [
  {
    key: "question-nine-days",
    options: [
      {
        label: "one",
        items: ["days"]
      }
    ],
    value: ""
  },
  {
    key: "question-nine-minutes",
    options: [
      {
        label: "two",
        items: ["minutes"]
      }
    ],
    value: ""
  }
];

export const questionsList = [
  {
    questions: questionOne,
    questionType: "radio",
    key: "one",
    analyticsPageView: "questionnaire_alcohol_frequency"
  },
  {
    questions: questionTwo,
    questionType: "radio",
    key: "two",
    analyticsPageView: "questionnaire_alcohol_units_total"
  },
  {
    questions: questionThree,
    questionType: "radio",
    key: "three",
    analyticsPageView: "questionnaire_alcohol_units_frequency"
  },
  {
    questions: questionFour,
    questionType: "radio",
    key: "four",
    analyticsPageView: "questionnaire_smoking"
  },
  {
    questions: questionFive,
    questionType: "number",
    key: "five",
    analyticsPageView: "questionnaire_height"
  },
  {
    questions: questionSix,
    questionType: "number",
    key: "six",
    analyticsPageView: "questionnaire_weight"
  },
  {
    questions: questionSeven,
    questionType: "time",
    key: "seven",
    analyticsPageView: "questionnaire_intence_fisical_activity_days_and_minutes" // Nome della pagina per la visualizzazione analytics
  },
  {
    questions: questionEight,
    questionType: "time",
    key: "eight",
    analyticsPageView: "questionnaire_moderate_fisical_activity_days_and_minutes" // Nome della pagina per la visualizzazione analytics
  },
  {
    questions: questionNine,
    questionType: "time",
    key: "nine",
    analyticsPageView: "questionnaire_walk_fisical_activity_days_and_minutes" // Nome della pagina per la visualizzazione analytics
  }
];

export const drinkResultsCategories = {
  ONE_TWO: {
    category: "one-two",
    listTranslationKey: "questionnaireResults.alcoholIntake.intro.drinkCategoryOne.list",
    titleTranslationKey: null,
    bodyTranslationKey: null
  },
  THREE: {
    category: "three",
    titleTranslationKey: "questionnaireResults.alcoholIntake.intro.drinkCategoryThree.title",
    listTranslationKey: "questionnaireResults.alcoholIntake.intro.drinkCategoryThree.list",
    bodyTranslationKey: null
  },
  FOUR: {
    category: "four",
    listTranslationKey: "questionnaireResults.alcoholIntake.intro.drinkCategoryFour.list",
    titleTranslationKey: null,
    bodyTranslationKey: "questionnaireResults.alcoholIntake.intro.drinkCategoryFour.body"
  },
  FOUR_MULTIPLE_UNITS: {
    category: "four",
    listTranslationKey: "questionnaireResults.alcoholIntake.intro.drinkCategoryFour.listMultiple",
    titleTranslationKey: null,
    bodyTranslationKey: "questionnaireResults.alcoholIntake.intro.drinkCategoryFour.body"
  },
  FIVE: {
    category: "five",
    listTranslationKey: "questionnaireResults.alcoholIntake.intro.drinksCategoryFive.list",
    titleTranslationKey: null,
    bodyTranslationKey: "questionnaireResults.alcoholIntake.intro.drinksCategoryFive.body"
  },
  SIX: {
    category: "six",
    titleTranslationKey: null,
    listTranslationKey: "questionnaireResults.alcoholIntake.intro.drinkCategorySix.list",
    bodyTranslationKey: "questionnaireResults.alcoholIntake.intro.drinkCategorySix.body"
  },
  SEVEN: {
    category: "seven",
    titleTranslationKey: null,
    listTranslationKey: "questionnaireResults.alcoholIntake.intro.drinkCategorySeven.list",
    bodyTranslationKey: null
  },
  EIGHT: {
    category: "eight",
    titleTranslationKey: null,
    listTranslationKey: null,
    bodyTranslationKey: "questionnaireResults.alcoholIntake.intro.drinkCategorySeven.body"
  },
  NINE: {
    category: "nine",
    titleTranslationKey: null,
    listTranslationKey: null,
    bodyTranslationKey: "questionnaireResults.alcoholIntake.intro.drinkCategorySeven.body"
  }
};
