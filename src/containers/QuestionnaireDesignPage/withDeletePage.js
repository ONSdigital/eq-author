import { graphql } from "react-apollo";
import getQuestionnaireQuery from "queries/getQuestionnaire.graphql";
import deletePageMutation from "queries/deletePage.graphql";
import { find, remove } from "lodash";

export const redirectToDesigner = ownProps => ({ data }) => {
  const { history, questionnaireId } = ownProps;
  const { id, sectionId } = data.createQuestionPage;
  history.push(`/questionnaire/${questionnaireId}/design/${sectionId}/${id}`);
};

const findById = (collection, id) => find(collection, { id: parseInt(id, 10) });

export const createUpdater = (questionnaireId, sectionId, pageId) => (
  proxy,
  result
) => {
  const data = proxy.readQuery({
    query: getQuestionnaireQuery,
    variables: { id: questionnaireId }
  });

  const section = findById(data.questionnaire.sections, sectionId);
  remove(section.pages, { id: pageId });

  proxy.writeQuery({
    query: getQuestionnaireQuery,
    variables: { id: questionnaireId },
    data
  });
};

export const mapMutateToProps = ({ ownProps, mutate }) => ({
  onDeletePage(sectionId, pageId) {
    const page = { id: pageId };
    const optimisticResponse = {
      deletePage: {
        __typename: "Page",
        ...page
      }
    };

    const update = createUpdater(ownProps.questionnaireId, sectionId, pageId);

    return mutate({
      variables: page,
      optimisticResponse,
      update
    });
  }
});

export default graphql(deletePageMutation, {
  props: mapMutateToProps
});
