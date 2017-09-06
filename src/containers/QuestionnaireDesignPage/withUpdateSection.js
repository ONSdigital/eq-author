import updateSectionMutation from "schema/updateSection.graphql";
import { graphql } from "react-apollo";

export default graphql(updateSectionMutation, {
  props: ({ mutate }) => ({
    onUpdateSection: section => mutate({ variables: section })
  })
});
