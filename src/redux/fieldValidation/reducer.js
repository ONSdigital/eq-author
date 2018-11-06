import {
  FIELD_VALID,
  FIELD_INVALID,
  FIELDS_INVALID,
  FIELDS_VALID
} from "./actions";
import { concat, without, includes } from "lodash";

const initialState = {
  appValid: true
};

const appValid = (state, pageId) => {
  if (state[pageId] === undefined) {
    return true;
  }
  return state[pageId].length > 0;
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
        appValid: appValid(state, pageId),
        [pageId]: concat(state[pageId] || [], fieldId)
      };
    }
    case FIELD_VALID: {
      const { pageId, fieldId } = payload;

      return {
        ...state,
        appValid: appValid(state, pageId),
        [pageId]: without(state[pageId], fieldId)
      };
    }
    case FIELDS_VALID: {
      const { pageId, fieldIds } = payload;

      return {
        ...state,
        appValid: appValid(state, pageId),
        [pageId]: without(
          state[pageId],
          fieldIds.filter(id => !includes(state[pageId], id))
        )
      };
    }
    case FIELDS_INVALID: {
      const { pageId, fieldIds } = payload;

      return {
        ...state,
        appValid: appValid(state, pageId),
        [pageId]: concat(
          state[pageId] || [],
          fieldIds.filter(id => !includes(state[pageId], id))
        )
      };
    }
    default:
      return state;
  }
};
