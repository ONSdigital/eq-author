import { graphql } from "react-apollo";
import getQuestionnaireQuery from "graphql/getQuestionnaire.graphql";
import deletePageMutation from "graphql/deletePage.graphql";
import { find, findIndex, remove } from "lodash";

const findById = (collection, id) => find(collection, { id });

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

export const handleDeletion = (ownProps, sectionId, deletedPageId) => {
  const { questionnaire, history, onAddPage, pageId: currentPageId } = ownProps;

  const section = findById(questionnaire.sections, sectionId);

  if (section.pages.length === 1) {
    return onAddPage(sectionId);
  }

  if (currentPageId === deletedPageId) {
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
    const variables = { id: pageId };
    const update = createUpdater(ownProps.questionnaireId, sectionId, pageId);

    return mutate({ variables, update }).then(res =>
      handleDeletion(ownProps, sectionId, pageId).then(() => res)
    );
  }
});

export default graphql(deletePageMutation, {
  props: mapMutateToProps
});
