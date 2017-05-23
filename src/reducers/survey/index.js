import { combineReducers } from "redux";

import meta from "reducers/survey/meta";
import items from "reducers/survey/items";

export const survey = combineReducers({
  meta,
  items
});

export default survey;
