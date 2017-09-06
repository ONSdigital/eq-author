import { graphql } from "react-apollo";
import QuestionnaireCreatePage from "./QuestionnaireCreatePage";

import createQuestionnaireQuery from "schema/createQuestionnaire.graphql";

export const mapMutateToProps = ({ ownProps, mutate }) => ({
  createQuestionnaire: questionnaire =>
    mutate({ variables: questionnaire }).then(
      redirectToDesigner(ownProps.history)
    )
});

export const redirectToDesigner = history => ({ data }) => {
  const questionnaire = data.createQuestionnaire;
  const section = questionnaire.sections[0];
  const page = section.pages[0];

  history.push(
    `/questionnaire/${questionnaire.id}/design/${section.id}/${page.id}`
  );
};

const withCreateQuestionnaire = graphql(createQuestionnaireQuery, {
  props: mapMutateToProps
});

export default withCreateQuestionnaire(QuestionnaireCreatePage);
