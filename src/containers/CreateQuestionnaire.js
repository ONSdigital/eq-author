import { graphql, gql, compose } from "react-apollo";
import CreateQuestionnairePage from "pages/CreateQuestionnaire";

export const getQuestionnaire = gql`
  query GetQuestionnaire($id: ID!) {
    questionnaire(id: $id) {
      id,
      title,
      description,
      navigation,
      legalBasis,
      theme,
      __typename
    }
  }
`;

export const updateQuestionnaire = gql`
  mutation UpdateQuestionnaire(
    $id: ID!,
    $title: String!,
    $description: String!,
    $theme: String!,
    $legalBasis: String!,
    $navigation: Boolean
  ) {
    updateQuestionnaire(
      id: $id,
      title: $title,
      description: $description,
      theme: $theme,
      legalBasis: $legalBasis,
      navigation: $navigation,
    ) {
      id,
      title,
      description,
      theme,
      legalBasis,
      navigation
    }
  }
`;

const mapResultsToProps = results => {
  const { loading, questionnaire } = results.data;

  return {
    questionnaire,
    loading
  };
};

export const withData = graphql(getQuestionnaire, {
  props: mapResultsToProps,
  options: { variables: { id: 1 } }
});

export const withMutation = graphql(updateQuestionnaire, {
  props: ({ ownProps, mutate }) => ({
    onUpdate(variables) {
      return mutate({ variables });
    }
  })
});

export default compose(withData, withMutation)(CreateQuestionnairePage);
