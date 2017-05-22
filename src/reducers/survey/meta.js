/* eslint-disable camelcase */

import { SURVEY_LOAD } from "actions/survey";
import { META_UPDATE } from "actions/survey/meta";

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

    case SURVEY_LOAD:
      return {
        ...state,
        ...payload.meta
      };

    default:
      return state;
  }
};

export default meta;
