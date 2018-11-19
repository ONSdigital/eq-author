import { FORMAT_CHANGE, TYPE_CHANGE } from "./actions";

import { merge } from "lodash";

const initialState = {};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case TYPE_CHANGE: {
      return merge({}, state, { [payload.answerId]: { type: payload.type } });
    }

    case FORMAT_CHANGE: {
      return merge({}, state, {
        [payload.answerId]: { format: payload.format }
      });
    }

    default:
      return state;
  }
};

export const getUnit = (state, answerId) => {
  return {
    type: "Number",
    ...state.answer[answerId]
  };
};
