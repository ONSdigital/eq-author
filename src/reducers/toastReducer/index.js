import { TOAST_DISMISS, TOAST_RAISE } from "actions/toast";

export default (state = {}, action) => {
  switch (action.type) {
    case TOAST_RAISE: {
      return {
        ...state,
        [action.payload.id]: {
          message: action.payload.message,
          undoAction: action.payload.undoAction,
          context: action.payload.context
        }
      };
    }
    case TOAST_DISMISS: {
      const newState = Object.assign({}, state);
      delete newState[action.payload.id];
      return newState;
    }
    default:
      return state;
  }
};
