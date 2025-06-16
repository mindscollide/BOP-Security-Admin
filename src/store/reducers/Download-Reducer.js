import * as actions from "../action_types";

const initialState = {
  Loading: false,
  Spinner: false,
  ResponseMessage: "",
  bankuserReportData: null,
  corporateUserReportData: null,
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
