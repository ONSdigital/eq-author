import { gql } from "react-apollo";

export const getSection = gql`
  query getSection($id: Int!) {
    section: group(id: $id) {
      id
      title
      description
      pages
      questionnaireId
    }
  }
`;
export default getSection;
