import updatePageMutation from "schema/updatePage.graphql";
import { graphql } from "react-apollo";

export default graphql(updatePageMutation, {
  props: ({ mutate }) => ({
    onUpdatePage: page => mutate({ variables: page })
  })
});
