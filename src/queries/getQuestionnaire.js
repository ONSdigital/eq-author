import { gql } from "react-apollo";

const getQuestionnaire = gql`
  query GetQuestionnaire($id: Int!) {
    questionnaire(id: $id) {
      id
      title
      description
      surveyId
      legalBasis
      theme
      navigation
      sections {
        id
        title
        description
        pages {
          id
          title
          description
          pageType
          ... on QuestionPage {
            type
            guidance
            type
            description
            answers {
              id
              description
              guidance
              qCode
              label
              mandatory
              type
              questionPageId
            }
          }
        }
      }
    }
  }
`;

export default getQuestionnaire;
