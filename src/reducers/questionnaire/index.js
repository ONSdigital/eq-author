import { combineReducers } from "redux";

import meta from "reducers/questionnaire/meta";
import items from "reducers/questionnaire/items";

export const questionnaire = combineReducers({
  meta,
  items
});

export default questionnaire;
