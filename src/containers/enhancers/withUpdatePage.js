import updatePageMutation from "graphql/updatePage.graphql";
import { graphql } from "react-apollo";

export const mapMutateToProps = ({ mutate }) => ({
  onUpdatePage: page => mutate({ variables: page })
});

export default graphql(updatePageMutation, {
  props: mapMutateToProps
});
