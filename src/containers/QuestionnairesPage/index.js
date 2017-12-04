import { compose } from "react-apollo";
import Questionnaires from "./QuestionnairesPage";
import withQuestionnaireList from "../enhancers/withQuestionnaireList";
import withDeleteQuestionnaire from "../enhancers/withDeleteQuestionnaire";
import * as ToastActionCreators from "redux/toast/actions";
import { connect } from "react-redux";

export default compose(
  connect(null, ToastActionCreators),
  withQuestionnaireList,
  withDeleteQuestionnaire
)(Questionnaires);
