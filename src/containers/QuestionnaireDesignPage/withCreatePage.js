import { graphql } from "react-apollo";
import getQuestionnaireQuery from "queries/getQuestionnaire.graphql";
import createQuestionPageMutation from "queries/createQuestionPage.graphql";
import { find } from "lodash";

export const redirectToDesigner = ownProps => ({ data }) => {
  const { history, questionnaireId } = ownProps;
  const { id, sectionId } = data.createQuestionPage;
  history.push(`/questionnaire/${questionnaireId}/design/${sectionId}/${id}`);
};

export const createUpdater = (questionnaireId, sectionId) => (
  proxy,
  result
) => {
  const data = proxy.readQuery({
    query: getQuestionnaireQuery,
    variables: { id: questionnaireId }
  });

  const section = find(data.questionnaire.sections, {
    id: parseInt(sectionId, 10)
  });

  section.pages.push(result.data.createQuestionPage);

  proxy.writeQuery({
    query: getQuestionnaireQuery,
    variables: { id: questionnaireId },
    data
  });
};

export const mapMutateToProps = ({ ownProps, mutate }) => ({
  onAddPage(sectionId) {
    const { questionnaireId } = ownProps;

    const page = {
      title: "",
      description: "",
      type: "General",
      sectionId
    };

    const optimisticResponse = {
      createQuestionPage: {
        __typename: "QuestionPage",
        id: -1,
        guidance: "",
        pageType: "",
        answers: [],
        ...page
      }
    };

    const update = createUpdater(questionnaireId, sectionId);

    return mutate({
      variables: page,
      optimisticResponse,
      update
    }).then(redirectToDesigner(ownProps));
  }
});

export default graphql(createQuestionPageMutation, {
  props: mapMutateToProps
});
