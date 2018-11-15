import { FIELD_ENABLE, FIELD_DISABLE } from "./actions";

const initialState = {};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FIELD_ENABLE: {
      return {
        ...state,
        [payload.pageId]: {
          ...state[payload.pageId],
          [payload.fieldId]: {
            enabled: true
          }
        }
      };
    }

    case FIELD_DISABLE: {
      return {
        ...state,
        [payload.pageId]: {
          ...state[payload.pageId],
          [payload.fieldId]: { enabled: false }
        }
      };
    }

    default:
      return state;
  }
};

export const getProperties = (state, pageId) => ({
  guidance: { enabled: false, focused: true },
  description: { enabled: false, focused: false },
  guidance: { enabled: false, focused: false },
  additionalInfo: { enabled: false, focused: false },
  ...state.properties[pageId]
});
