import { gql } from "react-apollo";

const createQuestionPage = gql`
  mutation createQuestionPage(
    $title: String!
    $description: String
    $guidance: String
    $type: QuestionType!
    $sectionId: Int!
  ) {
    createQuestionPage(
      title: $title
      description: $description
      guidance: $guidance
      type: $type
      sectionId: $sectionId
    ) {
      id
      title
      description
      guidance
      pageType
      type
      answers {
        id
      }
      sectionId
    }
  }
`;

export default createQuestionPage;
