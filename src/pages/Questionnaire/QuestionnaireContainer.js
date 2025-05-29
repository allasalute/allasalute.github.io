import { connect } from "react-redux";
import Questionnaire from "./Questionnaire";
import { getQuestionnaire, updateResponse, restartQuestionnaire } from "redux/modules/questionnaire";

const mapStateToProps = ({ questionnaire }) => ({
  questions: questionnaire.getQuestionnaire,
  response: questionnaire.response
});

const mapDispatchToProps = dispatch => {
  return {
    getQuestionnaire: () => {
      dispatch(getQuestionnaire());
    },
    setResponse: payload => {
      dispatch(updateResponse(payload));
    },
    endSession: history => {
      dispatch(restartQuestionnaire());
      history.push("/");
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Questionnaire);
