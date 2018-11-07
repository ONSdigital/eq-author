import {
  FIELD_VALID,
  FIELD_INVALID,
  FIELDS_INVALID,
  APP_INVALID,
  APP_VALID
} from "./actions";
import { concat, without, includes, isEmpty } from "lodash";

const initialState = {
  appValid: true,
  errors: {}
};

const appValid = state => isEmpty(state.errors);

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FIELD_INVALID: {
      const { pageId, fieldId } = payload;

      if (includes(state.errors[pageId], fieldId)) {
        return {
          ...state,
          appValid: appValid(state)
        };
      } else {
        const newState = {
          ...state,
          errors: {
            ...state.errors,
            [pageId]: concat(state.errors[pageId] || [], fieldId)
          }
        };

        return {
          ...newState,
          appValid: appValid(newState)
        };
      }
    }
    case FIELD_VALID: {
      const { pageId, fieldId } = payload;

      const pageErrors = without(state.errors[pageId], fieldId);

      const newState = {
        ...state,
        errors: {
          ...state.errors,
          [pageId]: pageErrors
        }
      };

      if (newState.errors[pageId].length === 0) {
        delete newState.errors[pageId];
      }

      return {
        ...newState,
        appValid: appValid(newState)
      };
    }

    case FIELDS_INVALID: {
      const { pageId, fieldIds } = payload;

      const newState = {
        ...state,
        errors: {
          ...state.errors,
          [pageId]: concat(
            state.errors[pageId] || [],
            fieldIds.filter(id => !includes(state.errors[pageId], id))
          )
        }
      };

      return {
        ...newState,
        appValid: appValid(newState)
      };
    }

    case APP_VALID: {
      return {
        ...state,
        appValid: true
      };
    }

    case APP_INVALID: {
      return {
        ...state,
        appValid: false
      };
    }

    default:
      return state;
  }
};
