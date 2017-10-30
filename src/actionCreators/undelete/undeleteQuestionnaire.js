import query from "graphql/undeleteQuestionnaire.graphql";
import GetQuestionnaireList from "graphql/getQuestionnaireList.graphql";
import { findUndeleteIndex } from "utils/findUndeleteIndex";
import createMutate from "utils/createMutate";

import {
  UNDELETE_QUESTIONNAIRE_REQUEST,
  UNDELETE_QUESTIONNAIRE_SUCCESS,
  UNDELETE_QUESTIONNAIRE_FAILURE
} from "actions/undelete";

const undeleteRequest = () => {
  return {
    type: UNDELETE_QUESTIONNAIRE_REQUEST
  };
};

const undeleteSuccess = () => {
  return {
    type: UNDELETE_QUESTIONNAIRE_SUCCESS
  };
};

const undeleteFailure = () => {
  return {
    type: UNDELETE_QUESTIONNAIRE_FAILURE
  };
};

export const createUpdate = context => (proxy, result) => {
  const data = proxy.readQuery({ query: GetQuestionnaireList });

  const index = findUndeleteIndex(data.questionnaires, context.questionnaireId);
  data.questionnaires.splice(index, 0, result.data.undeleteQuestionnaire);

  proxy.writeQuery({
    query: GetQuestionnaireList,
    data
  });
};

export const createUndelete = mutate => (id, context) =>
  mutate(
    Object.assign(
      {},
      {
        variables: { input: { id } },
        update: createUpdate(context)
      }
    )
  );

export const undeleteQuestionnaire = (id, context) => {
  return (dispatch, getState, client) => {
    const undelete = createUndelete(createMutate(client, query));
    dispatch(undeleteRequest());
    return undelete(context.questionnaireId, context)
      .then(() => dispatch(undeleteSuccess()))
      .catch(() => dispatch(undeleteFailure()));
  };
};
