import * as actions from "../action_types";

const initialState = {
  Loading: false,
  Spinner: false,
  ResponseMessage: "",
  // Drives the global toast's color: "success" on a *_SUCCESS case that sets
  // ResponseMessage, "error" on a *_FAIL case. See context/NotificationContext.js.
  Severity: "",
  bankuserReportData: null,
  corporateUserReportData: null,
  userLoginHistoryData: null,
  accessDetailReportData: null,
  lastLoggedInData: null,
  userStatusWiseReportData: null,
  pdfBankUserReportData: null,
  pdfCorporateUserReportData: null,
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
        Severity: "success",
      };

    case actions.BANK_USER_REPORT_FAIL:
      return {
        ...state,
        Loading: false,
        bankuserReportData: null,
        ResponseMessage: action.message,
        Severity: "error",
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
        Severity: "success",
      };

    case actions.CORPORATE_USER_REPORT_FAIL:
      return {
        ...state,
        Loading: false,
        corporateUserReportData: null,
        ResponseMessage: action.message,
        Severity: "error",
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
        Severity: "success",
      };

    case actions.SECURITY_ADMIN_USER_LOGIN_HISTORY_FAIL:
      return {
        ...state,
        Loading: false,
        userLoginHistoryData: null,
        ResponseMessage: action.message,
        Severity: "error",
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
        Severity: "success",
      };

    case actions.ACCESS_DETAIL_REPORT_FAIL:
      return {
        ...state,
        Loading: false,
        accessDetailReportData: null,
        ResponseMessage: action.message,
        Severity: "error",
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
        Severity: "success",
      };

    case actions.LAST_LOGGED_IN_REPORT_FAIL:
      return {
        ...state,
        Loading: false,
        lastLoggedInData: null,
        ResponseMessage: action.message,
        Severity: "error",
      };

    //User Status Wise  Report
    case actions.USER_STATUS_WISE_REPORT_INIT:
      return {
        ...state,
        Loading: true,
      };

    case actions.USER_STATUS_WISE_REPORT_SUCCESS:
      return {
        ...state,
        Loading: false,
        userStatusWiseReportData: action.response,
        ResponseMessage: action.message,
        Severity: "success",
      };

    case actions.USER_STATUS_WISE_REPORT_FAIL:
      return {
        ...state,
        Loading: false,
        userStatusWiseReportData: null,
        ResponseMessage: action.message,
        Severity: "error",
      };

    //PDF version Bank User  Report
    case actions.PDF_BANK_USER_REPORT_INIT:
      return {
        ...state,
        Loading: true,
      };

    case actions.PDF_BANK_USER_REPORT_SUCCESS:
      return {
        ...state,
        Loading: false,
        pdfBankUserReportData: action.response,
        ResponseMessage: action.message,
        Severity: "success",
      };

    case actions.PDF_BANK_USER_REPORT_FAIL:
      return {
        ...state,
        Loading: false,
        pdfBankUserReportData: null,
        ResponseMessage: action.message,
        Severity: "error",
      };

    //PDF version Bank User  Report
    case actions.PDF_CORPORATE_USER_REPORT_INIT:
      return {
        ...state,
        Loading: true,
      };

    case actions.PDF_CORPORATE_USER_REPORT_SUCCESS:
      return {
        ...state,
        Loading: false,
        pdfCorporateUserReportData: action.response,
        ResponseMessage: action.message,
        Severity: "success",
      };

    case actions.PDF_CORPORATE_USER_REPORT_FAIL:
      return {
        ...state,
        Loading: false,
        pdfCorporateUserReportData: null,
        ResponseMessage: action.message,
        Severity: "error",
      };

    case actions.CLEARE_MESSAGE: {
      return {
        ...state,
        ResponseMessage: "",
        Severity: "",
      };
    }

    default:
      return { ...state };
  }
};

export default DownloadReportReducer;
