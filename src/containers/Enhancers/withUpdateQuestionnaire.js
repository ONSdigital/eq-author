import updateQuestionnaire from "graphql/updateQuestionnaire.graphql";
import { graphql } from "react-apollo";

export const mapMutateToProps = ({ mutate }) => ({
  onUpdate(questionnaire) {
    return mutate({ variables: questionnaire });
  }
});

export default graphql(updateQuestionnaire, {
  props: mapMutateToProps
});
