import * as actions from "../action_types";

const initialState = {
  Loading: false,
  emailData: "",
  ResponseMessage: "",
  Token: "",
  Refresh: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.LOG_IN_INIT:
      return { ...state, Loading: true };

    case actions.LOG_IN_SUCCESS:
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.message,
      };

    case actions.LOG_IN_FAIL:
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.message,
      };

    case actions.SEND_EMAIL_RESET_PASSWORD_INIT:
      return { ...state, Loading: true };

    case actions.SEND_EMAIL_RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        Loading: false,
        emailData: action.response,
        ResponseMessage: action.message,
      };

    case actions.SEND_EMAIL_RESET_PASSWORD_FAIL:
      return {
        ...state,
        Loading: false,
        emailData: "",
        ResponseMessage: action.message,
      };

    case actions.SIGN_OUT:
      localStorage.clear();
      return {
        ...state,
        Loading: false,
        Token: "",
        Refresh: "",
      };
    default:
      return { ...state };
  }
};

export default authReducer;
