import { combineReducers } from "redux";

import meta from "reducers/survey/meta";
import items from "reducers/survey/items";

const survey = combineReducers({
  meta,
  items
});

export default survey;
