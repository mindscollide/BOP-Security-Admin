import * as actions from "../action_types";

const initialState = {
  Loading: false,
  GetUserSettings: null,
  UpdateUserSettings: null,
  GetMarketTimeSettings: null,
  SaveMarketSettings: null,
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
        GetMarketTimeSettings: null,
        ResponseMessage: action.message,
      };

    //Get Market Time Settings
    case actions.GET_MARKET_TIME_SETTINGS_INIT:
      return {
        ...state,
        Loading: true,
      };

    case actions.GET_MARKET_TIME_SETTINGS_SUCCESS:
      return {
        ...state,
        Loading: false,
        GetMarketTimeSettings: action.response,
        ResponseMessage: action.message,
      };

    case actions.GET_MARKET_TIME_SETTINGS_FAIL:
      return {
        ...state,
        Loading: false,
        GetMarketTimeSettings: null,
        ResponseMessage: action.message,
      };

    //Save Market Time Settings
    case actions.SAVE_MARKET_TIME_SETTINGS_INIT:
      return {
        ...state,
        Loading: true,
      };

    case actions.SAVE_MARKET_TIME_SETTINGS_SECCESS:
      return {
        ...state,
        Loading: false,
        SaveMarketTimeSettings: action.response,
        ResponseMessage: action.message,
      };

    case actions.SAVE_MARKET_TIME_SETTINGS_FAIL:
      return {
        ...state,
        Loading: false,
        SaveMarketTimeSettings: null,
        ResponseMessage: action.message,
      };
    default:
      return { ...state };
  }
};

export default settingsReducer;
