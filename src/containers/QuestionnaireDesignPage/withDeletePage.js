import { graphql } from "react-apollo";
import getQuestionnaireQuery from "queries/getQuestionnaire.graphql";
import deletePageMutation from "queries/deletePage.graphql";
import { find, remove, get } from "lodash";

const findById = (collection, id) => find(collection, { id: parseInt(id, 10) });

const maybeRedirect = ownProps => (...args) => {
  const data = args[0].data;
  const currentPage = parseInt(ownProps.pageId, 10);
  const deletedPage = data.deletePage.id;

  if (currentPage !== deletedPage) {
    return;
  }

  const { questionnaire, sectionId, history } = ownProps;
  const section = findById(questionnaire.sections, sectionId);
  const pageId = get(section, "pages[0].id");

  history.push(
    `/questionnaire/${questionnaire.id}/design/${sectionId}/${pageId}`
  );
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
    }).then(maybeRedirect(ownProps));
  }
});

export default graphql(deletePageMutation, {
  props: mapMutateToProps
});
