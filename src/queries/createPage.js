import { gql } from "react-apollo";

const createQuestionPage = gql`
  mutation CreateQuestionPage(
    $title: String!
    $description: String!
    $guidance: String
    $type: QuestionType!
    $mandatory: Boolean
    $sectionId: Int!
  ) {
    createQuestionPage(
      title: $title
      description: $description
      guidance: $guidance
      type: $type
      mandatory: $mandatory
      sectionId: $sectionId
    ) {
      id
      description
      sectionId
    }
  }
`;

export default createQuestionPage;
