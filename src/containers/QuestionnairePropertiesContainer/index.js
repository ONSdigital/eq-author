import { compose } from "react-apollo";

import withUpdateQuestionnaire from "containers/enhancers/withUpdateQuestionnaire";
import withEntityEditor from "components/withEntityEditor";
import questionnaireFragment from "graphql/fragments/questionnaire.graphql";
import StatelessQuestionnaireProperties from "components/QuestionnaireProperties";

export default compose(
  withUpdateQuestionnaire,
  withEntityEditor("questionnaire", questionnaireFragment)
)(StatelessQuestionnaireProperties);
