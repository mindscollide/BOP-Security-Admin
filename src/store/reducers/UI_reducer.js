import * as actions from "../action_types";

const initialState = {
  toast: {
    open: false,
    message: "",
    severity: "error",
  },
  // Counter, not a boolean — see showLoader/hideLoader in UI_Actions.js.
  loadingCount: 0,
};

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SHOW_TOAST:
      return {
        ...state,
        toast: {
          open: true,
          message: action.message,
          severity: action.severity,
        },
      };

    case actions.HIDE_TOAST:
      return {
        ...state,
        toast: { ...state.toast, open: false },
      };

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
