import { FIELD_ENABLE, FIELD_DISABLE } from "./actions";

const initialState = {};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FIELD_ENABLE: {
      return {
        ...state,
        [payload.pageId]: {
          ...state[payload.pageId],
          [payload.fieldId]: true
        }
      };
    }

    case FIELD_DISABLE: {
      return {
        ...state,
        [payload.pageId]: {
          ...state[payload.pageId],
          [payload.fieldId]: false
        }
      };
    }

    default:
      return state;
  }
};

export const getProperties = (state, pageId) => ({
  guidance: false,
  description: false,
  includeExclude: false,
  additionalInfo: false,
  ...state.properties[pageId]
});
