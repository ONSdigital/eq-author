import { TOAST_RAISE, TOAST_DISMISS } from "actions/toast";

export const raiseToast = (id, message, undoAction, context) => {
  return {
    payload: {
      id,
      message,
      undoAction,
      context
    },
    type: TOAST_RAISE
  };
};

export const dismissToast = id => {
  return {
    payload: {
      id
    },
    type: TOAST_DISMISS
  };
};

export const undoToast = (id, undoAction, context) => {
  return (dispatch, getState, client) => {
    return undoAction(id, context).then(() => dispatch(dismissToast(id)));
  };
};
