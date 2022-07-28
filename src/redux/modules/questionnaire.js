import { questionsList } from "constants/questionnaire";

export const UPDATE_QUESTIONNAIRE_RESPONSE = "questionnaire/UPDATE_QUESTIONNAIRE_RESPONSE";
export const CURRENT_SECTION = "questionnaire/CURRENT_SECTION";
export const HAS_STARTED = "questionnaire/HAS_STARTED";
export const RESTART_QUESTIONNAIRE = "questionnaire/RESTART_QUESTIONNAIRE";
export const GET_QUESTIONNAIRE = "questionnaire/GET_QUESTIONNAIRE";
export const initialState = {
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
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_QUESTIONNAIRE:
      return { ...state, getQuestionnaire: action.payload };
    case UPDATE_QUESTIONNAIRE_RESPONSE:
      return {
        ...state,
        response: state.response.map(item => (item.question === action.payload.question ? action.payload : item))
      };
    case CURRENT_SECTION:
      return { ...state, currentSection: action.payload };
    case HAS_STARTED:
      return { ...state, hasStarted: action.payload };
    case RESTART_QUESTIONNAIRE:
      return action.payload;
    default:
      return state;
  }
};

export const updateResponse = payload => {
  return {
    type: UPDATE_QUESTIONNAIRE_RESPONSE,
    payload
  };
};

export const setCurrentSection = payload => {
  return {
    type: CURRENT_SECTION,
    payload
  };
};

export const setHasStarted = payload => {
  return {
    type: HAS_STARTED,
    payload
  };
};

export const restartQuestionnaire = payload => {
  return {
    type: RESTART_QUESTIONNAIRE,
    payload: initialState
  };
};

export const getQuestionnaire = code => {
  return {
    type: GET_QUESTIONNAIRE,
    payload: questionsList
  };
};
