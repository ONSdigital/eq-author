import { gql } from "react-apollo";

const createPage = gql`
  mutation createPage(
    $title: String!
    $description: String!
    $groupId: String!
  ) {
    createPage(title: $title, description: $description, groupId: $groupId) {
      id
      description
      groupId
    }
  }
`;

export default createPage;
