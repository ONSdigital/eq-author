import { graphql } from "react-apollo";
import deletePageMutation from "graphql/deletePage.graphql";
import { remove } from "lodash";
import findById from "utils/findById";
import fragment from "graphql/sectionFragment.graphql";
import getNextPage from "utils/getNextOnDelete";
import { getLink } from "utils/UrlUtils";

export const handleDeletion = (ownProps, sectionId, deletedPageId) => {
  const { questionnaire, history, onAddPage, pageId: currentPageId } = ownProps;

  const section = findById(questionnaire.sections, sectionId);

  if (section.pages.length === 1) {
    return onAddPage(sectionId);
  }

  if (currentPageId === deletedPageId) {
    const page = getNextPage(section.pages, currentPageId);

    history.push(getLink(questionnaire.id, sectionId, page.id));
  }

  return Promise.resolve();
};

export const displayToast = (ownProps, sectionId, pageId) => {
  ownProps.raiseToast(`Page${pageId}`, "Page deleted", "undeletePage", {
    sectionId,
    pageId
  });
};

export const createUpdater = (sectionId, pageId) => (proxy, result) => {
  const id = `Section${sectionId}`;
  const section = proxy.readFragment({ id, fragment });

  remove(section.pages, { id: pageId });
  section.pages.forEach((page, i) => (page.position = i));

  proxy.writeFragment({
    id,
    fragment,
    data: section
  });
};

export const mapMutateToProps = ({ ownProps, mutate }) => ({
  onDeletePage(sectionId, pageId) {
    const page = { id: pageId };
    const update = createUpdater(sectionId, pageId);

    const mutation = mutate({
      variables: { input: page },
      update
    });

    return mutation
      .then(() => handleDeletion(ownProps, sectionId, pageId))
      .then(() => displayToast(ownProps, sectionId, pageId))
      .then(() => mutation);
  }
});

export default graphql(deletePageMutation, {
  props: mapMutateToProps
});
