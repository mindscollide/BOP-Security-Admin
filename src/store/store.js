import { applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  authReducer,
  securityReducer,
  CorporateReducer,
  SearchReducer,
  downloadReducer,
} from "./reducers";
import { configureStore } from "@reduxjs/toolkit";
import * as actions from "./action_types";

const AppReducer = combineReducers({
  auth: authReducer,
  securityReducer: securityReducer,
  CorporateReducer: CorporateReducer,
  SearchReducer: SearchReducer,
  downloadReducer: downloadReducer,
});

const rootReducer = (state, action) => {
  // when a logout action is dispatched it will reset redux state
  if (action.type === actions.SIGN_OUT) {
    state = undefined;
  }
  return AppReducer(state, action);
};

const store = configureStore(
  { reducer: rootReducer },
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
