import { graphql, compose } from "react-apollo";
import QuestionnaireCreatePage from "./QuestionnaireCreatePage";
import createQuestionnaireQuery from "queries/createQuestionnaire";
import createSectionQuery from "queries/createSection";
import createPageQuery from "queries/createPage";

export const withCreateQuestionnaire = graphql(createQuestionnaireQuery, {
  props: ({ mutate }) => ({
    createQuestionnaire: questionnaire => mutate({ variables: questionnaire })
  })
});

export const withCreateSection = graphql(createSectionQuery, {
  props: ({ mutate }) => ({
    createSection: section => mutate({ variables: section })
  })
});

const redirectToDesigner = (page, history) => ({ data }) => {
  const { id } = data.createQuestionPage;
  const { questionnaireId, sectionId } = page;
  history.push(`/questionnaire/${questionnaireId}/design/${sectionId}/${id}`);
};

export const withCreatePage = graphql(createPageQuery, {
  props: ({ ownProps, mutate }) => ({
    createPage: page => {
      return mutate({ variables: page }).then(
        redirectToDesigner(page, ownProps.history)
      );
    }
  })
});

export default compose(
  withCreateQuestionnaire,
  withCreateSection,
  withCreatePage
)(QuestionnaireCreatePage);
