import { graphql, gql } from "react-apollo";

import createQuestionPageMutation from "schema/createQuestionPage.graphql";

export const sectionFragment = gql`
  fragment Section on Section {
    id
    pages {
      id
    }
  }
`;

export const redirectToDesigner = ownProps => ({ data }) => {
  const { history, questionnaireId } = ownProps;
  const { id, sectionId } = data.createQuestionPage;
  history.push(`/questionnaire/${questionnaireId}/design/${sectionId}/${id}`);
};

export const createUpdater = (questionnaireId, sectionId) => (
  proxy,
  result
) => {
  const id = `Section${sectionId}`;
  const section = proxy.readFragment({
    id,
    fragment: sectionFragment
  });

  section.pages.push(result.data.createQuestionPage);

  proxy.writeFragment({
    id,
    fragment: sectionFragment,
    data: section
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
