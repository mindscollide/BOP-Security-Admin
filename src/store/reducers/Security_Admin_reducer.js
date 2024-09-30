import * as actions from "../action_types";

const initialState = {
  Spinner: false,
  ResponseMessage: "",
  saveUserData: "",
  bankUserRequestData: null,
  corporateUserData: "",
  rejectUserRequest: "",
  Loading: false,
};

const securityReducer = (state = initialState, action) => {
  switch (action.type) {
    // User Count State
    case actions.SAVE_BANK_USER_INIT:
      return { ...state, Loading: true };

    case actions.SAVE_BANK_USER_SUCCESS:
      return {
        ...state,
        Loading: false,
        saveBankUser: action.response,
        ResponseMessage: action.message,
      };
    case actions.SAVE_BANK_USER_FAIL:
      return {
        ...state,
        Loading: false,
        saveBankUser: "",
        ResponseMessage: action.message,
      };

    case actions.GET_NEW_BANK_USER_REQUESTS_INIT:
      return { ...state, Loading: true };

    case actions.GET_NEW_BANK_USER_REQUESTS_SUCCESS:
      return {
        ...state,
        Loading: false,
        bankUserRequestData: action.response,
        ResponseMessage: action.message,
      };
    case actions.GET_NEW_BANK_USER_REQUESTS_FAIL:
      return {
        ...state,
        Loading: false,
        bankUserRequestData: null,
        ResponseMessage: action.message,
      };

    case actions.SAVE_CORPORATE_USER_INIT:
      return { ...state, Loading: true };
    case actions.SAVE_CORPORATE_USER_SUCCESS:
      return {
        ...state,
        Loading: false,
        corporateUserData: action.response,
        ResponseMessage: action.message,
      };
    case actions.SAVE_CORPORATE_USER_FAIL:
      return {
        ...state,
        Loading: false,
        corporateUserData: "",
        ResponseMessage: action.message,
      };

    case actions.GET_NEW_BANK_USER_REQUESTS_INIT:
      return { ...state, Loading: true };

    case actions.GET_NEW_BANK_USER_REQUESTS_SUCCESS:
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.message,
      };

    case actions.GET_NEW_BANK_USER_REQUESTS_FAIL:
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.message,
      };

    case actions.REJECT_USER_REQUEST_INIT:
      return { ...state, Loading: true };

    case actions.REJECT_USER_REQUEST_SUCCESS:
      return {
        ...state,
        Loading: false,
        rejectUserRequest: action.response,
        ResponseMessage: action.message,
      };

    case actions.REJECT_USER_REQUEST_FAIL:
      return {
        ...state,
        Loading: false,
        rejectUserRequest: "",
        ResponseMessage: action.message,
      };

    default:
      return { ...state };
  }
};

export default securityReducer;
