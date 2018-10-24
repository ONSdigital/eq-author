import { DEFINITION_UPDATE, INFO_UPDATE } from "./actions";

import { get } from "lodash";

export default (state = {}, { type, payload }) => {
  switch (type) {
    case DEFINITION_UPDATE: {
      const key = payload.name.replace("definition-", "");
      const newState = {
        ...state,
        [payload.id]: {
          ...state[payload.id],
          definition: {
            ...get(state[payload.id], "definition"),
            [key]: payload.value
          }
        }
      };

      return newState;
    }

    case INFO_UPDATE: {
      const key = payload.name.replace("additional-info-", "");
      const newState = {
        ...state,
        [payload.id]: {
          ...state[payload.id],
          additionalInfo: {
            ...get(state[payload.id], "definition"),
            [key]: payload.value
          }
        }
      };

      return newState;
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
