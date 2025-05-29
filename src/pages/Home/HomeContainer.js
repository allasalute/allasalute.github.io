import { connect } from "react-redux";
import Home from "./Home";
import { restartQuestionnaire } from "redux/modules/questionnaire";

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => {
  return {
    endSession: history => {
      dispatch(restartQuestionnaire());
      history.push("/");
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
