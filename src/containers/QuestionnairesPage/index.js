import { compose } from "react-apollo";
import QuestionnairesPage from "./QuestionnairesPage";
import withQuestionnaireList from "../enhancers/withQuestionnaireList";
import withDeleteQuestionnaire from "../enhancers/withDeleteQuestionnaire";
import { raiseToast } from "redux/toast/actions";
import withCreateQuestionnaire from "../enhancers/withCreateQuestionnaire";
import { connect } from "react-redux";

export default compose(
  connect(null, { raiseToast }),
  withQuestionnaireList,
  withDeleteQuestionnaire, // relies on raiseToast to display undo
  withCreateQuestionnaire
)(QuestionnairesPage);
