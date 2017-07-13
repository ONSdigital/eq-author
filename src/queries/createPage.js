import { gql } from "react-apollo";

const createPage = gql`
  mutation createPage(
    $title: String!
    $description: String!
    $sectionId: String!
  ) {
    createPage(
      title: $title
      description: $description
      sectionId: $sectionId
    ) {
      id
      description
      sectionId
      type
    }
  }
`;

export default createPage;
