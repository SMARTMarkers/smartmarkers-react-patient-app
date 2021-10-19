import { combineReducers } from "redux";

import { mainReducer } from "./main/reducer";

export default combineReducers({
  root: mainReducer,
});
