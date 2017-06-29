import { gql } from "react-apollo";

export const getQuestionnaire = gql`
  query GetQuestionnaire($id: Int!) {
    questionnaire(id: $id) {
      id,
      title,
      description,
      navigation,
      legalBasis,
      theme,
      surveyId
    }
  }
`;

export default getQuestionnaire;
