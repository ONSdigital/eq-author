import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "actions/surveyItems";
import { push } from "react-router-redux";
import SurveySidebar from "components/SurveySidebar";

const mapStateToProps = (state, ownProps) => {
  return {
    sections: state.survey.sections,
    questions: state.survey.questions,
    answers: state.survey.answers
  };
};

const mapDispatchToProps = (dispatch, ownProps) =>
  bindActionCreators({ ...actions, push }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false
})(SurveySidebar);
