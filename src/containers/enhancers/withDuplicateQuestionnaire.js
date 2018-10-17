import { graphql } from "react-apollo";
import { get } from "lodash/fp";

import duplicateQuestionnaireMutation from "graphql/duplicateQuestionnaire.graphql";
import getQuestionnaireList from "graphql/getQuestionnaireList.graphql";

export const mapMutateToProps = ({ mutate }) => ({
  onDuplicateQuestionnaire(id) {
    return mutate({
      variables: { input: { id } }
    }).then(get("data.duplicateQuestionnaire"));
  }
});

export const handleUpdate = (proxy, { data: { duplicateQuestionnaire } }) => {
  const cacheData = proxy.readQuery({ query: getQuestionnaireList });
  proxy.writeQuery({
    query: getQuestionnaireList,
    data: {
      ...cacheData,
      questionnaires: [duplicateQuestionnaire, ...cacheData.questionnaires]
    }
  });
};

export default graphql(duplicateQuestionnaireMutation, {
  props: mapMutateToProps,
  options: {
    update: handleUpdate
  }
});
