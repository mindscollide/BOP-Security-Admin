import * as actions from "../action_types";

const initialState = {
  Loading: false,
  GetUserSettings: null,
  UpdateUserSettings: null,
  ResponseMessage: "",
  // Drives the global toast's color: "success" on a *_SUCCESS case that sets
  // ResponseMessage, "error" on a *_FAIL case. See utils/ResponseMessage.js.
  Severity: "",
};

const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    //Get user Settings reducer
    case actions.GET_USER_SETTINGS_INIT:
      return {
        ...state,
        Loading: true,
      };

    case actions.GET_USER_SETTINGS_SUCCESS:
      return {
        ...state,
        Loading: false,
        GetUserSettings: action.response,
        ResponseMessage: action.message,
        Severity: "success",
      };

    case actions.GET_USER_SETTINGS_FAIL:
      return {
        ...state,
        Loading: false,
        GetUserSettings: null,
        ResponseMessage: action.message,
        Severity: "error",
      };
    // Uodate User Settings reducer
    case actions.UPDATE_USER_SETTINGS_INIT:
      return {
        ...state,
        Loading: true,
      };

    case actions.UPDATE_USER_SETTINGS_SUCCESS:
      return {
        ...state,
        Loading: false,
        UpdateUserSettings: action.response,
        ResponseMessage: action.message,
        Severity: "success",
      };

    case actions.UPDATE_USER_SETTINGS_FAIL:
      return {
        ...state,
        Loading: false,
        UpdateUserSettings: null,
        ResponseMessage: action.message,
        Severity: "error",
      };

    case actions.CLEARE_MESSAGE:
      return {
        ...state,
        ResponseMessage: "",
        Severity: "",
      };

    default:
      return { ...state };
  }
};

export default settingsReducer;
