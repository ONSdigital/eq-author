import { DEFINITION_UPDATE, INFO_UPDATE } from "./actions";
import { merge } from "lodash";

export default (state = {}, { type, payload }) => {
  console.log(state);
  console.log(type);
  console.log(payload);

  switch (type) {
    case DEFINITION_UPDATE: {
      return merge(state, {
        [payload.id]: { definition: { [payload.name]: payload.value } }
      });
    }

    case INFO_UPDATE: {
      const key = payload.name.replace("additional-info-", "");

      return merge(state, {
        [payload.id]: { additionalInfo: { [key]: payload.value } }
      });
    }

    default:
      return state;
  }
};

export const getQuestionPage = (state, pageId) => {
  return {
    definition: {
      label: null,
      content: null
    },
    additionalInfo: {
      label: null,
      content: null
    },
    ...state.page[pageId]
  };
};
