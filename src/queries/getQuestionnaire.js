import { gql } from "react-apollo";

export const getQuestionnaire = gql`
  query GetQuestionnaire($id: ID!) {
    questionnaire(id: $id) {
      id,
      title,
      description,
      navigation,
      legalBasis,
      theme
    }
  }
`;

export default getQuestionnaire;
