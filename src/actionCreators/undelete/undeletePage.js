import query from "graphql/undeletePage.graphql";
import fragment from "graphql/sectionFragment.graphql";
import { findUndeleteIndex } from "utils/findUndeleteIndex";
import createMutate from "utils/createMutate";

import {
  UNDELETE_PAGE_REQUEST,
  UNDELETE_PAGE_SUCCESS,
  UNDELETE_PAGE_FAILURE
} from "actions/undelete";

const undeleteRequest = () => {
  return {
    type: UNDELETE_PAGE_REQUEST
  };
};

const undeleteSuccess = () => {
  return {
    type: UNDELETE_PAGE_SUCCESS
  };
};

const undeleteFailure = () => {
  return {
    type: UNDELETE_PAGE_FAILURE
  };
};

export const createUpdate = context => (proxy, result) => {
  const id = `Section${context.sectionId}`;
  const section = proxy.readFragment({ id, fragment });

  const index = findUndeleteIndex(section.pages, context.pageId);
  section.pages.splice(index, 0, result.data.undeleteQuestionPage);

  proxy.writeFragment({
    id,
    fragment,
    data: section
  });
};

export const createUndelete = mutate => (id, context) =>
  mutate({
    variables: { input: { id } },
    update: createUpdate(context)
  });

export const undeletePage = (id, context) => {
  return (dispatch, getState, client) => {
    const undelete = createUndelete(createMutate(client, query));
    dispatch(undeleteRequest());

    return undelete(context.pageId, context)
      .then(() => dispatch(undeleteSuccess()))
      .catch(() => dispatch(undeleteFailure()));
  };
};
