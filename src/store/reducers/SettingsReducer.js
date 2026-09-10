import * as actions from "../action_types";

const initialState = {
  Loading: false,
  GetUserSettings: null,
  UpdateUserSettings: null,
  ResponseMessage: "",
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
      };

    case actions.GET_USER_SETTINGS_FAIL:
      return {
        ...state,
        Loading: false,
        GetUserSettings: null,
        ResponseMessage: action.message,
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
      };

    case actions.UPDATE_USER_SETTINGS_FAIL:
      return {
        ...state,
        Loading: false,
        UpdateUserSettings: null,
        ResponseMessage: action.message,
      };

    case actions.CLEARE_MESSAGE:
      return {
        ...state,
        ResponseMessage: "",
      };

    default:
      return { ...state };
  }
};

export default settingsReducer;
