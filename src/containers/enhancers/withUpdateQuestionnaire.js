import updateQuestionnaire from "graphql/updateQuestionnaire.graphql";
import { graphql } from "react-apollo";

export const mapMutateToProps = ({ mutate }) => ({
  onUpdate: questionnaire =>
    mutate({
      variables: { input: questionnaire }
    })
});

export default graphql(updateQuestionnaire, {
  props: mapMutateToProps
});
