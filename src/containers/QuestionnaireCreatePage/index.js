import { graphql } from "react-apollo";
import QuestionnaireCreate from "./QuestionnaireCreate";
import createQuestionnaire from "queries/createQuestionnaire";

export const withMutation = graphql(createQuestionnaire, {
  props: ({ ownProps, mutate }) => ({
    createQuestionnaire: variables => mutate({ variables })
  })
});

export default withMutation(QuestionnaireCreate);
