import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import survey from "reducers/survey/";

const rootReducer = combineReducers({
  survey,
  router: routerReducer
});

export default rootReducer;
