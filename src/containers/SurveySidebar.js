import { connect } from "react-redux";
import * as actions from "actions/survey/items";
import { push } from "react-router-redux";
import SurveySidebar from "components/SurveySidebar";

const mapStateToProps = (state, ownProps) => {
  const { sections, questions, answers } = state.survey.items;
  return {
    sections,
    questions,
    answers
  };
};

const mapDispatchToProps = { ...actions, push };

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false
})(SurveySidebar);
