import { graphql } from "react-apollo";
import { remove } from "lodash";
import deleteQuestionnaire from "graphql/deleteQuestionnaire.graphql";
import getQuestionnaireList from "graphql/getQuestionnaireList.graphql";

export const mapMutateToProps = ({ ownProps, mutate }) => ({
  onDeleteQuestionnaire(questionnaireId) {
    return mutate({
      variables: {
        id: questionnaireId
      },
      optimisticResponse: {
        deleteQuestionnaire: {
          id: questionnaireId,
          __typename: "Questionnaire"
        }
      }
    });
  }
});

export const handleUpdate = (proxy, { data: { deleteQuestionnaire } }) => {
  const data = proxy.readQuery({ query: getQuestionnaireList });
  remove(data.questionnaires, { id: deleteQuestionnaire.id });
  proxy.writeQuery({ query: getQuestionnaireList, data });
};

export default graphql(deleteQuestionnaire, {
  props: mapMutateToProps,
  options: {
    update: handleUpdate
  }
});
