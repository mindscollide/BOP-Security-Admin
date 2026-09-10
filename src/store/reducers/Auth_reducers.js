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
  allUserStatusData: null,
  RoleList: null,
  GetBankUserRoles: null,
  GetAllBranches: null,
  LogOut: null,
  resetPassword: null,
  forgotPassword: null,
  resetPasswordEmailVerification: null,
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

    case actions.REFRESH_TOKEN_SUCCESS: {
      localStorage.setItem("token", JSON.stringify(action.response.token));
      localStorage.setItem(
        "refreshToken",
        JSON.stringify(action.response.refreshToken)
      );
      return {
        ...state,
        Loading: false,
        Token: action.response.token,
        Refresh: action.response.refreshToken,
        SessionExpeireResponseMessage: action.message,
      };
    }
    case actions.REFRESH_TOKEN_FAIL: {
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
    case actions.GET_ALL_USER_STATUS_INIT:
      return {
        ...state,
        Loading: true,
      };

    case actions.GET_ALL_USER_STATUS_SUCCESS:
      return {
        ...state,
        Loading: false,
        allUserStatusData: action.response,
        ResponseMessage: action.message,
      };

    case actions.GET_ALL_USER_STATUS_FAIL:
      return {
        ...state,
        Loading: false,
        allUserStatusData: [],
        ResponseMessage: action.message,
      };

    //RoleList Reducer
    case actions.ROLE_LIST_INIT:
      return {
        ...state,
        Loading: true,
      };

    case actions.ROLE_LIST_SUCCESS:
      return {
        ...state,
        Loading: false,
        RoleList: action.response,
        ResponseMessage: action.message,
      };

    case actions.ROLE_LIST_FAIL:
      return {
        ...state,
        Loading: false,
        RoleList: [],
        ResponseMessage: action.message,
      };

    //GetBankUserRoles Reducer
    case actions.GET_BANK_USER_ROLES_INIT:
      return {
        ...state,
        Loading: true,
      };

    case actions.GET_BANK_USER_ROLES_SUCCESS:
      return {
        ...state,
        Loading: false,
        GetBankUserRoles: action.response,
        ResponseMessage: action.message,
      };

    case actions.GET_BANK_USER_ROLES_FAIL:
      return {
        ...state,
        Loading: false,
        GetBankUserRoles: null,
        ResponseMessage: action.message,
      };

    //GetAllBranches Reducer
    case actions.GET_ALL_BRANCHES_INIT:
      return {
        ...state,
        Loading: true,
      };

    case actions.GET_ALL_BRANCHES_SUCCESS:
      return {
        ...state,
        Loading: false,
        GetAllBranches: action.response,
        ResponseMessage: action.message,
      };

    case actions.GET_ALL_BRANCHES_FAIL:
      return {
        ...state,
        Loading: false,
        GetAllBranches: null,
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
    case actions.LOGOUT_INIT:
      return { ...state, Loading: true };

    case actions.LOGOUT_SUCCESS:
      return {
        ...state,
        Loading: false,
        LogOut: action.response,
        ResponseMessage: action.message,
      };

    case actions.LOGOUT_FAIL: {
      return {
        ...state,
        Loading: false,
        LogOut: null,
        ResponseMessage: action.message,
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
      case actions.RESET_PASSWORD_INIT: {
      return {
        ...state,
        Loading: true,
      };
    }

    case actions.RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        Loading: false,
        resetPassword: action.response,
        ResponseMessage: action.message,
      };
    }

    case actions.RESET_PASSWORD_FAIL: {
      return {
        ...state,
        Loading: false,
        resetPassword: null,
        ResponseMessage: action.message,
      };
    }

    case actions.FORGOT_PASSWORD_INIT: {
      return {
        ...state,
        Loading: true,
      };
    }

    case actions.FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        Loading: false,
        forgotPassword: action.response,
        ResponseMessage: action.message,
      };
    }

    case actions.FORGOT_PASSWORD_FAIL: {
      return {
        ...state,
        Loading: false,
        forgotPassword: null,
        ResponseMessage: action.message,
      };
    }

    case actions.RESETPASSWORDEMAILVERIFICATION_INIT: {
      return {
        ...state,
        Loading: true,
      };
    }

    case actions.RESETPASSWORDEMAILVERIFICATION_SUCCESS: {
      return {
        ...state,
        Loading: false,
        resetPasswordEmailVerification: action.response,
        ResponseMessage: action.message,
      };
    }

    case actions.RESETPASSWORDEMAILVERIFICATION_FAIL: {
      return {
        ...state,
        Loading: false,
        resetPasswordEmailVerification: null,
        ResponseMessage: action.message,
      };
    }
    default:
      return { ...state };
  }
};

export default authReducer;
