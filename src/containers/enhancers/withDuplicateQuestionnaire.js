import { graphql } from "react-apollo";
import { get } from "lodash/fp";

import duplicateQuestionnaireMutation from "graphql/duplicateQuestionnaire.graphql";

export const mapMutateToProps = ({ mutate }) => ({
  onDuplicateQuestionnaire(id) {
    return mutate({
      variables: { input: { id } }
    }).then(get("data.duplicateQuestionnaire"));
  }
});

export default graphql(duplicateQuestionnaireMutation, {
  props: mapMutateToProps
});
