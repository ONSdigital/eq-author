import { graphql, gql, compose } from "react-apollo";
import CreateQuestionnairePage from "pages/CreateQuestionnaire";

const getQuestionnaire = gql`
  query GetQuestionnaire {
    questionnaire(id: 1) {
      id,
      title,
      description,
      navigation,
      legalBasis,
      theme
    }
  }
`;

const updateQuestionnaire = gql`
  mutation UpdateQuestionnaire(
    $id:ID!,
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
      navigation: $navigation
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

const mapResultsToProps = ({ data: { loading, questionnaire }, mutate }) => ({
  questionnaire,
  loading
});

export const createUpdater = mutate => variables => mutate({ variables });

const CreateQuestionnaire = compose(
  graphql(getQuestionnaire, {
    props: mapResultsToProps
  }),
  graphql(updateQuestionnaire, {
    props: ({ mutate }) => ({
      onUpdate: createUpdater(mutate)
    })
  })
)(CreateQuestionnairePage);

export default CreateQuestionnaire;