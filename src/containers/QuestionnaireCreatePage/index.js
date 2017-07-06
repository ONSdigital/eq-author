import { graphql, compose } from "react-apollo";
import QuestionnaireCreate from "./QuestionnaireCreate";
import createQuestionnaireQuery from "queries/createQuestionnaire";
import createSectionQuery from "queries/createSection";

export const withCreateQuestionnaire = graphql(createQuestionnaireQuery, {
  props: ({ ownProps, mutate }) => ({
    createQuestionnaire: ({ questionnaire }) =>
      mutate({ variables: questionnaire })
  })
});

export const withCreateSection = graphql(createSectionQuery, {
  props: ({ ownProps: { match, history, location }, mutate }) => ({
    createSection(variables) {
      return mutate({ variables }).then(({ data }) => {
        const { id, questionnaireId } = data.createSection;
        history.push(`/questionnaire/${questionnaireId}/design/${id}`);
      });
    }
  })
});

export default compose(withCreateQuestionnaire, withCreateSection)(
  QuestionnaireCreate
);
