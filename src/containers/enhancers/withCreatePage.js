import { graphql } from "react-apollo";
import fragment from "graphql/sectionFragment.graphql";
import createQuestionPageMutation from "graphql/createQuestionPage.graphql";

export const redirectToNewPage = ownProps => ({ data }) => {
  const { history, questionnaireId } = ownProps;
  const { id, section } = data.createQuestionPage;
  history.push(`/questionnaire/${questionnaireId}/design/${section.id}/${id}`);
};

export const createUpdater = sectionId => (proxy, result) => {
  const id = `Section${sectionId}`;
  const section = proxy.readFragment({ id, fragment });

  section.pages.push(result.data.createQuestionPage);

  proxy.writeFragment({
    id,
    fragment,
    data: section
  });
};

export const mapMutateToProps = ({ ownProps, mutate }) => ({
  onAddPage(sectionId) {
    const page = {
      title: "",
      description: "",
      sectionId
    };

    const optimisticResponse = {
      createQuestionPage: {
        __typename: "QuestionPage",
        id: -1,
        guidance: "",
        pageType: "",
        answers: [],
        section: {
          __typename: "Section",
          id: sectionId
        },
        ...page
      }
    };

    const update = createUpdater(sectionId);

    return mutate({
      variables: page,
      optimisticResponse,
      update
    }).then(redirectToNewPage(ownProps));
  }
});

export default graphql(createQuestionPageMutation, {
  props: mapMutateToProps
});
