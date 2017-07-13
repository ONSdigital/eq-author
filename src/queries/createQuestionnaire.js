import { gql } from "react-apollo";

const createQuestionnaire = gql`
  mutation createQuestionnaire(
    $title: String!
    $description: String!
    $surveyId: String!
    $theme: String!
    $legalBasis: LegalBasis!
    $navigation: Boolean
  ) {
    createQuestionnaire(
      title: $title
      description: $description
      surveyId: $surveyId
      theme: $theme
      legalBasis: $legalBasis
      navigation: $navigation
    ) {
      id
    }
  }
`;

export default createQuestionnaire;
