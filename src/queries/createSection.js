import { gql } from "react-apollo";

export const createSection = gql`
  mutation CreateSection(
    $title: String!
    $description: String!
    $questionnaireId: Int!
  ) {
    createSection(
      title: $title
      description: $description
      questionnaireId: $questionnaireId
    ) {
      id
      title
      description
      questionnaireId
      pages {
        id
      }
    }
  }
`;
export default createSection;
