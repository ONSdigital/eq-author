/* eslint-disable camelcase */

import { QUESTIONNAIRE_LOAD_SUCCESS } from "actions/questionnaire";
import { META_UPDATE } from "actions/questionnaire/meta";

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

export const meta = (state = defaultState, action) => {
  const { payload } = action;
  switch (action.type) {
    case META_UPDATE:
      return {
        ...state,
        [payload.key]: payload.value
      };

    case QUESTIONNAIRE_LOAD_SUCCESS:
      return {
        ...state,
        ...payload.meta
      };

    default:
      return state;
  }
};

export default meta;
