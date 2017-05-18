/* eslint-disable camelcase */

import { META_UPDATE, LOAD_SURVEY } from "actions/survey";

export const defaultState = {
  data_version: "0.0.1",
  description: "",
  legal_basis: "StatisticsOfTradeAct",
  mime_type: "application/json/ons/eq",
  questionnaire_id: "0001",
  schema_version: "0.0.1",
  id: "000",
  theme: "default",
  title: ""
};

const meta = (state = defaultState, action) => {
  const { payload } = action;
  switch (action.type) {
    case META_UPDATE:
      return {
        ...state,
        [payload.key]: payload.value
      };

    case LOAD_SURVEY:
      return {
        ...state,
        ...payload.meta
      };

    default:
      return state;
  }
};

export default meta;
