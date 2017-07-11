import { gql } from "react-apollo";

const updateQuestionnaire = gql`
  mutation UpdateQuestionnaire(
    $id: Int!
    $title: String!
    $description: String!
    $surveyId: String!
    $theme: String!
    $legalBasis: LegalBasis!
    $navigation: Boolean
  ) {
    updateQuestionnaire(
      id: $id
      title: $title
      description: $description
      surveyId: $surveyId
      theme: $theme
      legalBasis: $legalBasis
      navigation: $navigation
    ) {
      id
      title
      description
      surveyId
      theme
      legalBasis
      navigation
    }
  }
`;
export default updateQuestionnaire;
