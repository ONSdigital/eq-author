import {
  FIELD_VALID,
  FIELD_INVALID,
  FIELDS_INVALID,
  FIELDS_VALID,
  APP_INVALID,
  APP_VALID,
  PAGE_VALID
} from "./actions";
import { without, isEmpty, union } from "lodash";

const initialState = {
  appValid: true,
  errors: {}
};

const appValid = state => isEmpty(state.errors);

const errors = (state, action) => {
  const { type, payload } = action;
  const { pageId, fieldId, fieldIds } = payload;
  const page = state[pageId];

  switch (type) {
    case FIELD_INVALID: {
      return {
        ...state,
        [pageId]: union(page, [fieldId])
      };
    }
    case FIELD_VALID: {
      return {
        ...state,
        [pageId]: without(page, fieldId)
      };
    }

    case FIELDS_INVALID: {
      return {
        ...state,
        [pageId]: union(page, fieldIds)
      };
    }

    case FIELDS_VALID: {
      return {
        ...state,
        [pageId]: without(page, ...fieldIds)
      };
    }

    default:
      return state;
  }
};

export default (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case FIELD_INVALID: {
      const newState = {
        ...state,
        errors: errors(state.errors, action)
      };

      return {
        ...newState,
        appValid: appValid(newState)
      };
    }
    case FIELD_VALID: {
      const newState = {
        ...state,
        errors: errors(state.errors, action)
      };

      if (newState.errors[action.payload.pageId].length === 0) {
        delete newState.errors[action.payload.pageId];
      }

      return {
        ...newState,
        appValid: appValid(newState)
      };
    }

    case FIELDS_INVALID: {
      const newState = {
        ...state,
        errors: errors(state.errors, action)
      };

      return {
        ...newState,
        appValid: appValid(newState)
      };
    }

    case FIELDS_VALID: {
      const newState = {
        ...state,
        errors: errors(state.errors, action)
      };

      if (newState.errors[action.payload.pageId].length === 0) {
        delete newState.errors[action.payload.pageId];
      }

      return {
        ...newState,
        appValid: appValid(newState)
      };
    }

    case PAGE_VALID: {
      const newState = {
        ...state
      };

      delete newState.errors[action.payload.pageId];

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
