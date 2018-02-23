import { flowRight } from "lodash";
import Questionnaires from "./QuestionnairesPage";
import withQuestionnaireList from "../enhancers/withQuestionnaireList";
import withDeleteQuestionnaire from "../enhancers/withDeleteQuestionnaire";
import withCreateQuestionnaire from "../enhancers/withCreateQuestionnaire";
import { raiseToast } from "redux/toast/actions";
import { connect } from "react-redux";
import { getUser } from "redux/auth/reducer";

const mapStateToProps = state => ({
  user: getUser(state)
});

export default flowRight(
  connect(mapStateToProps, { raiseToast }),
  withQuestionnaireList,
  withCreateQuestionnaire,
  withDeleteQuestionnaire // relies on raiseToast to display undo
)(Questionnaires);
