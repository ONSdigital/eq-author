import updateOptionMutation from "graphql/updateOption.graphql";
import { graphql } from "react-apollo";

export default graphql(updateOptionMutation, {
  props: ({ mutate }) => ({
    onUpdateOption: option => mutate({ variables: option })
  })
});
