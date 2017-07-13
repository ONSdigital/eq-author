import { gql } from "react-apollo";

const updatePage = gql`
  mutation UpdateQuestionPage(
    $id: Int!
    $title: String
    $description: String
    $guidance: String
    $type: QuestionType
    $mandatory: Boolean
  ) {
    updateQuestionPage(
      id: $id
      title: $title
      description: $description
      guidance: $guidance
      type: $type
      mandatory: $mandatory
    ) {
      id
    }
  }
`;

export default updatePage;
