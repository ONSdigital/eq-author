import { graphql, gql, compose } from "react-apollo";
import QuestionnaireCreate from "./QuestionnaireCreate";

export const createQuestionnaire = gql`
  mutation createQuestionnaire($title: String!, $description: String!, $theme: String!, $legalBasis: String!, $navigation: Boolean) {
    createQuestionnaire(title: $title, description: $description, theme: $theme, legalBasis: $legalBasis, navigation: $navigation) {
      id
    }
  }
`;

export const withMutation = graphql(createQuestionnaire, {
  props: ({ ownProps, mutate }) => ({
    createQuestionnaire(variables) {
      return mutate({ variables });
    }
  })
});

export default compose(withMutation)(QuestionnaireCreate);
