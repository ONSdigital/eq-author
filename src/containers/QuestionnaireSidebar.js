import { connect } from "react-redux";
import * as actions from "actions/questionnaire/items";
import { push } from "react-router-redux";
import QuestionnaireSidebar from "components/QuestionnaireSidebar";

const mapStateToProps = (state, ownProps) => {
  const { sections, questions, answers } = state.questionnaire.items;
  return {
    sections,
    questions,
    answers
  };
};

const mapDispatchToProps = { ...actions, push };

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false
})(QuestionnaireSidebar);
