import { flowRight } from "lodash";
import Questionnaires from "./QuestionnairesPage";
import withQuestionnaireList from "../enhancers/withQuestionnaireList";
import withDeleteQuestionnaire from "../enhancers/withDeleteQuestionnaire";
import withCreateQuestionnaire from "../enhancers/withCreateQuestionnaire";
import { raiseToast } from "redux/toast/actions";
import { connect } from "react-redux";

export default flowRight(
  connect(null, { raiseToast }),
  withQuestionnaireList,
  withCreateQuestionnaire,
  withDeleteQuestionnaire // relies on raiseToast to display undo
)(Questionnaires);
