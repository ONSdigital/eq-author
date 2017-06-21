import { combineReducers } from "redux";

import items from "reducers/questionnaire/items";

export const questionnaire = combineReducers({
  items
});

export default questionnaire;
