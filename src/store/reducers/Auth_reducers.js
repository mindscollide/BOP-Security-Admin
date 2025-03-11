import * as actions from "../action_types";

const initialState = {
  UserDetails: null,
  isLoggedIn: false,
  Loading: false,
  Spinner: false,
  emailData: "",
  ResponseMessage: "",
  Token: "",
  Refresh: "",
  SessionExpeireResponseMessage: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.LOG_IN_INIT:
      return { ...state, Loading: true };

    case actions.LOG_IN_SUCCESS:
      return {
        ...state,
        UserDetails: action.response,
        ResponseMessage: action.message,
        Loading: false,
        Token: action.response.token,
        Refresh: action.response.refreshToken,
      };

    case actions.LOG_IN_FAIL: {
      console.log(action.message);
      return {
        ...state,
        UserDetails: null,
        ResponseMessage: action.message,
        Loading: false,
        Token: "",
        Refresh: "",
      };
    }

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
    case actions.CLEARE_MESSAGE: {
      return {
        ...state,
        ResponseMessage: "",
      };
    }

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
