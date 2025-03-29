import { connect } from "react-redux";
import Results from "./Results";

const mapStateToProps = ({ questionnaire }) => ({
  response: questionnaire.response
});

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Results);
