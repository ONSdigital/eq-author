import { compose } from "react-apollo";
import Questionnaires from "./QuestionnairesPage";
import withQuestionnaireList from "../enhancers/withQuestionnaireList";
import withDeleteQuestionnaire from "../enhancers/withDeleteQuestionnaire";

export default compose(withQuestionnaireList, withDeleteQuestionnaire)(
  Questionnaires
);
