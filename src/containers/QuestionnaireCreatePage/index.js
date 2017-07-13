import { graphql, compose } from "react-apollo";
import QuestionnaireCreatePage from "./QuestionnaireCreatePage";
import createQuestionnaireQuery from "queries/createQuestionnaire";
import createSectionQuery from "queries/createSection";
import createPageQuery from "queries/createPage";

export const withCreateQuestionnaire = graphql(createQuestionnaireQuery, {
  props: ({ ownProps, mutate }) => ({
    createQuestionnaire: variables => mutate({ variables })
  })
});

export const withCreateSection = graphql(createSectionQuery, {
  props: ({ ownProps: { match, history, location }, mutate }) => ({
    createSection: variables => mutate({ variables })
  })
});

const redirectToDesigner = history => ({ data }) => {
  const { id, questionnaireId } = data.createSection;
  history.push(`/questionnaire/${questionnaireId}/design/${id}`);
};

export const withCreatePage = graphql(createPageQuery, {
  props: ({ ownProps: { history }, mutate }) => ({
    createPage: variables =>
      mutate({ variables }).then(redirectToDesigner(history))
  })
});

export default compose(withCreateQuestionnaire, withCreateSection)(
  QuestionnaireCreatePage
);
