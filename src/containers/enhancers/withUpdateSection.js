import updateSectionMutation from "graphql/updateSection.graphql";
import { graphql } from "react-apollo";

export const mapMutateToProps = ({ mutate }) => ({
  onUpdateSection: section => mutate({ variables: section })
});

export default graphql(updateSectionMutation, {
  props: mapMutateToProps
});
