import * as actions from "../action_types";

const initialState = {
  Loading: false,
  Spinner: false,
  ResponseMessage: "",
  bankuserReportData: null,
  corporateUserReportData: null,
  userLoginHistoryData: null,
  accessDetailReportData: null,
  lastLoggedInData: null,
};

const DownloadReportReducer = (state = initialState, action) => {
  switch (action.type) {
    //Bank  User Report
    case actions.BANK_USER_REPORT_INIT:
      return {
        ...state,
        Loading: true,
      };

    case actions.BANK_USER_REPORT_SUCCESS:
      return {
        ...state,
        Loading: false,
        bankuserReportData: action.response,
        ResponseMessage: action.message,
      };

    case actions.BANK_USER_REPORT_FAIL:
      return {
        ...state,
        Loading: false,
        bankuserReportData: null,
        ResponseMessage: action.message,
      };

    //Corporate  User Report
    case actions.CORPORATE_USER_REPORT_INIT:
      return {
        ...state,
        Loading: true,
      };

    case actions.CORPORATE_USER_REPORT_SUCCESS:
      return {
        ...state,
        Loading: false,
        corporateUserReportData: action.response,
        ResponseMessage: action.message,
      };

    case actions.CORPORATE_USER_REPORT_FAIL:
      return {
        ...state,
        Loading: false,
        corporateUserReportData: null,
        ResponseMessage: action.message,
      };

    //Security User Login History Report
    case actions.SECURITY_ADMIN_USER_LOGIN_HISTORY_INIT:
      return {
        ...state,
        Loading: true,
      };

    case actions.SECURITY_ADMIN_USER_LOGIN_HISTORY_SUCCESS:
      return {
        ...state,
        Loading: false,
        userLoginHistoryData: action.response,
        ResponseMessage: action.message,
      };

    case actions.SECURITY_ADMIN_USER_LOGIN_HISTORY_FAIL:
      return {
        ...state,
        Loading: false,
        userLoginHistoryData: null,
        ResponseMessage: action.message,
      };

    //Access Detail  Report
    case actions.ACCESS_DETAIL_REPORT_INIT:
      return {
        ...state,
        Loading: true,
      };

    case actions.ACCESS_DETAIL_REPORT_SUCCESS:
      return {
        ...state,
        Loading: false,
        accessDetailReportData: action.response,
        ResponseMessage: action.message,
      };

    case actions.ACCESS_DETAIL_REPORT_FAIL:
      return {
        ...state,
        Loading: false,
        accessDetailReportData: null,
        ResponseMessage: action.message,
      };

    //Access Detail  Report
    case actions.LAST_LOGGED_IN_REPORT_INIT:
      return {
        ...state,
        Loading: true,
      };

    case actions.LAST_LOGGED_IN_REPORT_SUCCESS:
      return {
        ...state,
        Loading: false,
        lastLoggedInData: action.response,
        ResponseMessage: action.message,
      };

    case actions.LAST_LOGGED_IN_REPORT_FAIL:
      return {
        ...state,
        Loading: false,
        lastLoggedInData: null,
        ResponseMessage: action.message,
      };

    case actions.CLEARE_MESSAGE: {
      return {
        ...state,
        ResponseMessage: "",
      };
    }

    default:
      return { ...state };
  }
};

export default DownloadReportReducer;
