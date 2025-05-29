import { connect } from "react-redux";
import Results from "./Results";
import { restartQuestionnaire } from "redux/modules/questionnaire";

const mapStateToProps = ({ questionnaire }) => ({
  response: questionnaire.response
});

const mapDispatchToProps = dispatch => ({
  endSession: history => {
    dispatch(restartQuestionnaire());
    history.push("/");
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Results);
