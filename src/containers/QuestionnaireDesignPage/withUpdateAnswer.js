import updateAnswerMutation from "schema/updateAnswer.graphql";
import { graphql } from "react-apollo";

export default graphql(updateAnswerMutation, {
  props: ({ mutate }) => ({
    onUpdateAnswer: answer => mutate({ variables: answer })
  })
});
