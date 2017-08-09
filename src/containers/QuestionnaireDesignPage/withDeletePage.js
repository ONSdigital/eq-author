import { graphql } from "react-apollo";
import getQuestionnaireQuery from "queries/getQuestionnaire.graphql";
import deletePageMutation from "queries/deletePage.graphql";
import { find, findIndex, remove } from "lodash";

const findById = (collection, id) => find(collection, { id: parseInt(id, 10) });

export const getNextPage = (pages, id) => {
  const index = findIndex(pages, { id });
  let nextPageIndex;

  if (index === 0) {
    if (pages.length === 1) {
      nextPageIndex = 0;
    } else {
      nextPageIndex = index + 1;
    }
  } else {
    nextPageIndex = index - 1;
  }

  return pages[nextPageIndex];
};

export const handleDeletion = (ownProps, sectionId, pageId) => {
  const { questionnaire, history, onAddPage } = ownProps;

  const section = findById(questionnaire.sections, sectionId);
  const currentPageId = parseInt(ownProps.pageId, 10);
  const deletedPageId = parseInt(pageId, 10);

  if (section.pages.length === 1) {
    return onAddPage(sectionId);
  }

  if (currentPageId === deletedPageId) {
    const section = findById(questionnaire.sections, sectionId);
    const page = getNextPage(section.pages, currentPageId);

    history.push(
      `/questionnaire/${questionnaire.id}/design/${sectionId}/${page.id}`
    );
  }

  return Promise.resolve();
};

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
    }).then(res => handleDeletion(ownProps, sectionId, pageId).then(() => res));
  }
});

export default graphql(deletePageMutation, {
  props: mapMutateToProps
});
