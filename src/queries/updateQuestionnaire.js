import { gql } from "react-apollo";

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
export default updateQuestionnaire;
