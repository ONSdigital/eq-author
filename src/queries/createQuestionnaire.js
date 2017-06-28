import { gql } from "react-apollo";

const createQuestionnaire = gql`
  mutation createQuestionnaire($title: String!, $description: String!, $theme: String!, $legalBasis: String!, $navigation: Boolean) {
    createQuestionnaire(title: $title, description: $description, theme: $theme, legalBasis: $legalBasis, navigation: $navigation) {
      id
    }
  }
`;

export default createQuestionnaire;
