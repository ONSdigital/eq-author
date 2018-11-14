import { DEFINITION_UPDATE, INFO_UPDATE } from "./actions";

export default (state = {}, { type, payload }) => {
  switch (type) {
    case DEFINITION_UPDATE: {
      const newState = {
        ...state,
        [payload.id]: {
          definition: {
            ...state[payload.id].definition,
            [payload.name]: payload.value
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
          additionalInfo: {
            ...state[payload.id].additionalInfo,
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
