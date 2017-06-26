import { graphql, gql, compose } from "react-apollo";
import { connect } from "react-redux";

import QuestionnaireMeta from "./QuestionnaireMeta";

export const getQuestionnaire = gql`
  query GetQuestionnaire($id: ID!) {
    questionnaire(id: $id) {
      id,
      title,
      description,
      navigation,
      legalBasis,
      theme
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

export const mapStateToProps = (state, ownProps) => ({
  id: ownProps.match.params.id
});

export const mapResultsToProps = ({ data, ownProps }) => {
  const { loading, questionnaire } = data;

  return {
    questionnaire,
    loading
  };
};

export const withData = graphql(getQuestionnaire, {
  props: mapResultsToProps,
  options: props => ({ variables: { id: props.id } })
});

export const withMutation = graphql(updateQuestionnaire, {
  props: ({ ownProps, mutate }) => ({
    onUpdate(variables) {
      return mutate({ variables });
    }
  })
});

export default connect(mapStateToProps)(
  compose(withData, withMutation)(QuestionnaireMeta)
);
