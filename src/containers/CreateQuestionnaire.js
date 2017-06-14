import gql from "graphql-tag";
import { graphql } from "react-apollo";
import CreateQuestionnairePage from "pages/CreateQuestionnaire";

const questionnaire = gql`
  query GetQuestionnaire {
    questionnaire(id: 1) {
      id,
      title,
      description,
      navigation,
      legalBasis,
      theme
    }
  }
`;

const CreateQuestionnaire = graphql(questionnaire, {
  props: ({ data: { loading, questionnaire } }) => ({
    questionnaire,
    loading
  })
})(CreateQuestionnairePage);

export default CreateQuestionnaire;
