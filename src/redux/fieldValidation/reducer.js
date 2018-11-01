import { FIELD_VALID, FIELD_INVALID } from "./actions";
import { concat, without, includes } from "lodash";

const initialState = {
  appValid: true
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FIELD_INVALID: {
      const { pageId, fieldId } = payload;

      if (includes(state[pageId], fieldId)) {
        return state;
      }

      return {
        ...state,
        [pageId]: concat(state[pageId] || [], fieldId)
      };
    }
    case FIELD_VALID: {
      const { pageId, fieldId } = payload;

      return {
        ...state,
        [pageId]: without(state[pageId], fieldId)
      };
    }
    default:
      return state;
  }
};
