import { connect } from "react-redux";
import Header from "./Header";
import { restartQuestionnaire } from "redux/modules/questionnaire";

const mapStateToProps = ({ questionnaire }) => ({
  response: questionnaire.response
});

const mapDispatchToProps = dispatch => {
  return {
    endSession: async history => {
      dispatch(restartQuestionnaire());
      history.push("/");
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
