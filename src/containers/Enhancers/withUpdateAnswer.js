import updateAnswerMutation from "graphql/updateAnswer.graphql";
import { graphql } from "react-apollo";

export default graphql(updateAnswerMutation, {
  props: ({ mutate }) => ({
    onUpdateAnswer: answer => mutate({ variables: answer })
  })
});
