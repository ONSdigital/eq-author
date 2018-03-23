import { graphql } from "react-apollo";
import movePageMutation from "graphql/movePage.graphql";
import fragment from "graphql/fragments/movePage.graphql";
import { getLink } from "utils/UrlUtils";

export const createUpdater = ({ from, to }) => (proxy, result) => {
  result = result.data.movePage;

  // remove page from previous section
  const fromSectionId = `Section${from.sectionId}`;
  const fromSection = proxy.readFragment({ id: fromSectionId, fragment });
  const [page] = fromSection.pages.splice(from.position, 1);

  proxy.writeFragment({
    id: fromSectionId,
    fragment,
    data: fromSection
  });

  // add page to new section
  const toSectionId = `Section${to.sectionId}`;
  const toSection = proxy.readFragment({ id: toSectionId, fragment });

  toSection.pages.splice(result.position, 0, page);

  proxy.writeFragment({
    id: toSectionId,
    fragment,
    data: toSection
  });
};

const redirect = ({ history, match }, { from, to }) => {
  const movedToDifferentSection = from.sectionId !== to.sectionId;

  if (movedToDifferentSection) {
    history.replace(getLink(match.params.questionnaireId, to.sectionId, to.id));
  }
};

export const mapMutateToProps = ({ ownProps, mutate }) => ({
  onMovePage({ from, to }) {
    const optimisticResponse = {
      movePage: {
        id: to.id,
        section: {
          id: to.sectionId,
          __typename: "Section"
        },
        position: to.position,
        __typename: "QuestionPage"
      }
    };

    const mutation = mutate({
      update: createUpdater({ from, to }),
      variables: { input: to },
      optimisticResponse
    });

    return mutation
      .then(() => redirect(ownProps, { from, to }))
      .then(() => mutation);
  }
});

export default graphql(movePageMutation, {
  props: mapMutateToProps
});
