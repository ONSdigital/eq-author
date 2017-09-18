import { compose } from "react-apollo";
import { withRouter } from "react-router-dom";
import Questionnaires from "./QuestionnairesPage";
import withQuestionnaireList from "../enhancers/withQuestionnaireList";
import withDeleteQuestionnaire from "../enhancers/withDeleteQuestionnaire";

export default compose(
  withRouter,
  withQuestionnaireList,
  withDeleteQuestionnaire
)(Questionnaires);
