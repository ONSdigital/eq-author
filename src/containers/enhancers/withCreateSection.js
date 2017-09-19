import { graphql, gql } from "react-apollo";
import createSectionMutation from "graphql/createSection.graphql";

export const fragment = gql`
  fragment Questionnaire on Questionnaire {
    sections {
      id
    }
  }
`;

export const redirectToNewPage = ownProps => ({ data }) => {
  const { history, questionnaireId } = ownProps;
  const section = data.createSection;
  const page = section.pages[0];

  history.push(
    `/questionnaire/${questionnaireId}/design/${section.id}/${page.id}`
  );
};

export const createUpdater = questionnaireId => (proxy, result) => {
  const id = `Questionnaire${questionnaireId}`;
  const data = proxy.readFragment({ id, fragment });

  data.sections.push(result.data.createSection);

  proxy.writeFragment({
    id,
    fragment,
    data
  });
};

export const mapMutateToProps = ({ mutate, ownProps }) => ({
  onAddSection() {
    const section = {
      title: "",
      description: "",
      questionnaireId: ownProps.questionnaireId
    };

    const optimisticResponse = {
      createSection: {
        __typename: "Section",
        id: -1,
        description: "",
        pages: [],
        ...section
      }
    };

    const update = createUpdater(ownProps.questionnaireId);

    return mutate({
      variables: section,
      optimisticResponse,
      update
    }).then(redirectToNewPage(ownProps));
  }
});

export default graphql(createSectionMutation, {
  props: mapMutateToProps
});
