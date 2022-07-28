import { combineReducers } from "redux";
import app from "./modules/app";
import questionnaire from "./modules/questionnaire";

const reducer = combineReducers({
  app,
  questionnaire
});

export default reducer;
