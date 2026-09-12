import * as actions from "../action_types";

const initialState = {
  // Counter, not a boolean — see showLoader/hideLoader in UI_Actions.js.
  loadingCount: 0,
};

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SHOW_LOADER:
      return {
        ...state,
        loadingCount: state.loadingCount + 1,
      };

    case actions.HIDE_LOADER:
      return {
        ...state,
        loadingCount: Math.max(0, state.loadingCount - 1),
      };

    default:
      return state;
  }
};

export default uiReducer;
