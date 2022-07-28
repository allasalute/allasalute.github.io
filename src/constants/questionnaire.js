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
  }
];

export const drinkResultsCategories = {
  ONE_TWO: {
    category: "one-two",
    listTranslationKey: null,
    titleTranslationKey: null,
    bodyTranslationKey: "questionnaireResults.alcoholIntake.intro.drinkCategoryOne.body"
  },
  THREE: {
    category: "three",
    titleTranslationKey: "questionnaireResults.alcoholIntake.intro.drinkCategoryThree.title",
    listTranslationKey: null,
    bodyTranslationKey: "questionnaireResults.alcoholIntake.intro.drinkCategoryThree.body"
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
    listTranslationKey: null,
    bodyTranslationKey: "questionnaireResults.alcoholIntake.intro.drinkCategorySix.body"
  },
  SEVEN: {
    category: "seven",
    titleTranslationKey: null,
    listTranslationKey: null,
    bodyTranslationKey: "questionnaireResults.alcoholIntake.intro.drinkCategorySeven.body"
  }
};
