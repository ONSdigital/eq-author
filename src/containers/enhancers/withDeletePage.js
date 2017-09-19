import { graphql, gql } from "react-apollo";
import deletePageMutation from "graphql/deletePage.graphql";
import { findIndex, remove } from "lodash";
import findById from "utils/findById";

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

export const fragment = gql`
  fragment Section2 on Section {
    pages {
      id
    }
  }
`;

export const createUpdater = (sectionId, pageId) => (proxy, result) => {
  const id = `Section${sectionId}`;
  const section = proxy.readFragment({ id, fragment });

  remove(section.pages, { id: pageId });

  proxy.writeFragment({
    id,
    fragment,
    data: section
  });
};

export const mapMutateToProps = ({ ownProps, mutate }) => ({
  onDeletePage(sectionId, pageId) {
    const variables = { id: pageId };
    const update = createUpdater(sectionId, pageId);

    return mutate({ variables, update }).then(res =>
      handleDeletion(ownProps, sectionId, pageId).then(() => res)
    );
  }
});

export default graphql(deletePageMutation, {
  props: mapMutateToProps
});
