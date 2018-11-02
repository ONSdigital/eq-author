import { graphql } from "react-apollo";
import { get } from "lodash/fp";

import duplicateQuestionnaireMutation from "graphql/duplicateQuestionnaire.graphql";
import getQuestionnaireList from "graphql/getQuestionnaireList.graphql";

export const mapMutateToProps = ({ mutate }) => ({
  onDuplicateQuestionnaire({ id, title }) {
    return mutate({
      variables: { input: { id } },
      optimisticResponse: {
        duplicateQuestionnaire: {
          id: `dupe-${id}`,
          title: `Copy of ${title}`,
          createdAt: new Date(Date.now()).toISOString(),
          createdBy: {
            name: "In progress...",
            __typename: "User"
          },
          __typename: "Questionnaire"
        }
      }
    }).then(get("data.duplicateQuestionnaire"));
  }
});

export const handleUpdate = (proxy, { data: { duplicateQuestionnaire } }) => {
  console.log("hu");
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
