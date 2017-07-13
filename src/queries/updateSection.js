import { gql } from "react-apollo";

export const updateSection = gql`
  mutation UpdateSection($id: Int!, $title: String!, $description: String!) {
    updateSection: updateGroup(
      id: $id
      title: $title
      description: $description
    ) {
      id
      title
      description
      pages {
        id
      }
    }
  }
`;
export default updateSection;
