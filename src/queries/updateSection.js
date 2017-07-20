import { gql } from "react-apollo";

export const updateSection = gql`
  mutation UpdateSection($id: Int!, $title: String!, $description: String!) {
    updateSection(id: $id, title: $title, description: $description) {
      id
      title
      description
    }
  }
`;
export default updateSection;
