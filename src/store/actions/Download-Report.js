import {
  bankUserReport,
  CorporateUserReport,
  SecurityAdminAccessDetailReport,
  SecurityAdminLastLoggedInReport,
  SecurityAdminUserLoginHistoryReport,
} from "../../commen/apis/Api_config";
import { downloadReportApi } from "../../commen/apis/Api_ends_points";
import * as actions from "../action_types";
import axios from "axios";
import { RefreshToken } from "./Auth_Actions";

const cleareMessage = (response) => {
  return {
    type: actions.CLEARE_MESSAGE,
  };
};

const downloadBankUserReport_init = () => {
  return {
    type: actions.BANK_USER_REPORT_INIT,
  };
};
const downloadBankUserReport_success = (response, message) => {
  return {
    type: actions.BANK_USER_REPORT_SUCCESS,
    response: response,
    message: message,
  };
};
const downloadBankUserReport_fail = (message) => {
  return {
    type: actions.BANK_USER_REPORT_FAIL,
    message: message,
  };
};

const downloadBankUserReportApi = (navigate, Data) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let form = new FormData();
  form.append("RequestMethod", bankUserReport.RequestMethod);
  form.append("RequestData", JSON.stringify(Data));
  return async (dispatch) => {
    await dispatch(downloadBankUserReport_init());
    axios({
      method: "post",
      url: downloadReportApi,
      data: form,
      headers: {
        _token: token,
        "Content-Disposition": "attachment; filename=template.xlsx",
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
      responseType: "arraybuffer",
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(downloadBankUserReportApi(navigate, Data));
        } else if (response.status === 200) {
          const url = window.URL.createObjectURL(new Blob([response.data]));

          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "Bank User Report.xlsx");
          document.body.appendChild(link);
          link.click();
          dispatch(
            downloadBankUserReport_success(
              response.data.responseResult,
              "Download-successffuly"
            )
          );
        }
      })
      .catch((response) => {
        dispatch(downloadBankUserReport_fail(response));
      });
  };
};

// Corporate User Report

const downloadCorporateUserReport_init = () => {
  return {
    type: actions.CORPORATE_USER_REPORT_INIT,
  };
};
const downloadCorporateUserReport_success = (response, message) => {
  return {
    type: actions.CORPORATE_USER_REPORT_SUCCESS,
    response: response,
    message: message,
  };
};
const downloadCorporateUserReport_fail = (message) => {
  return {
    type: actions.CORPORATE_USER_REPORT_FAIL,
    message: message,
  };
};

const downloadCorporateUserReportApi = (navigate, Data) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let form = new FormData();
  form.append("RequestMethod", CorporateUserReport.RequestMethod);
  form.append("RequestData", JSON.stringify(Data));
  return async (dispatch) => {
    await dispatch(downloadCorporateUserReport_init());
    axios({
      method: "post",
      url: downloadReportApi,
      data: form,
      headers: {
        _token: token,
        "Content-Disposition": "attachment; filename=template.xlsx",
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
      responseType: "arraybuffer",
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(downloadCorporateUserReportApi(navigate, Data));
        } else if (response.status === 200) {
          const url = window.URL.createObjectURL(new Blob([response.data]));

          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "Corporate User Report.xlsx");
          document.body.appendChild(link);
          link.click();
          dispatch(
            downloadCorporateUserReport_success(
              response.data.responseResult,
              "Download-successffuly"
            )
          );
        }
      })
      .catch((response) => {
        dispatch(downloadCorporateUserReport_fail(response));
      });
  };
};

// Security Admin UserLogin History Report

const downloadSystemAdminUserLoginHistoryReport_init = () => {
  return {
    type: actions.SECURITY_ADMIN_USER_LOGIN_HISTORY_INIT,
  };
};
const downloadSystemAdminUserLoginHistoryReport_success = (
  response,
  message
) => {
  return {
    type: actions.SECURITY_ADMIN_USER_LOGIN_HISTORY_SUCCESS,
    response: response,
    message: message,
  };
};
const downloadSystemAdminUserLoginHistoryReport_fail = (message) => {
  return {
    type: actions.SECURITY_ADMIN_USER_LOGIN_HISTORY_FAIL,
    message: message,
  };
};

const downloadSystemAdminUserLoginHistoryReportApi = (navigate, Data) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let form = new FormData();
  form.append(
    "RequestMethod",
    SecurityAdminUserLoginHistoryReport.RequestMethod
  );
  form.append("RequestData", JSON.stringify(Data));
  return async (dispatch) => {
    await dispatch(downloadSystemAdminUserLoginHistoryReport_init());
    axios({
      method: "post",
      url: downloadReportApi,
      data: form,
      headers: {
        _token: token,
        "Content-Disposition": "attachment; filename=template.xlsx",
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
      responseType: "arraybuffer",
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(
            downloadSystemAdminUserLoginHistoryReportApi(navigate, Data)
          );
        } else if (response.status === 200) {
          const url = window.URL.createObjectURL(new Blob([response.data]));

          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "User login History Report.xlsx");
          document.body.appendChild(link);
          link.click();
          dispatch(
            downloadSystemAdminUserLoginHistoryReport_success(
              response.data.responseResult,
              "Download-successffuly"
            )
          );
        }
      })
      .catch((response) => {
        dispatch(downloadSystemAdminUserLoginHistoryReport_fail(response));
      });
  };
};

// Last Logged In Report
const downloadLastLoggedInReport_init = () => {
  return {
    type: actions.LAST_LOGGED_IN_REPORT_INIT,
  };
};
const downloadLastLoggedInReport_success = (response, message) => {
  return {
    type: actions.LAST_LOGGED_IN_REPORT_SUCCESS,
    response: response,
    message: message,
  };
};
const downloadLastLoggedInReport_fail = (message) => {
  return {
    type: actions.LAST_LOGGED_IN_REPORT_FAIL,
    message: message,
  };
};

const downloadLastLoggedInReportApi = (navigate, Data) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let form = new FormData();
  form.append("RequestMethod", SecurityAdminLastLoggedInReport.RequestMethod);
  form.append("RequestData", JSON.stringify(Data));
  return async (dispatch) => {
    await dispatch(downloadLastLoggedInReport_init());
    axios({
      method: "post",
      url: downloadReportApi,
      data: form,
      headers: {
        _token: token,
        "Content-Disposition": "attachment; filename=template.xlsx",
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
      responseType: "arraybuffer",
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(downloadLastLoggedInReportApi(navigate, Data));
        } else if (response.status === 200) {
          const url = window.URL.createObjectURL(new Blob([response.data]));

          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "Access Detail Report.xlsx");
          document.body.appendChild(link);
          link.click();
          dispatch(
            downloadLastLoggedInReport_success(
              response.data.responseResult,
              "Download-successffuly"
            )
          );
        }
      })
      .catch((response) => {
        dispatch(downloadLastLoggedInReport_fail(response));
      });
  };
};

// Access Detail Report
const downloadAccessDetailReport_init = () => {
  return {
    type: actions.ACCESS_DETAIL_REPORT_INIT,
  };
};
const downloadAccessDetailReport_success = (response, message) => {
  return {
    type: actions.ACCESS_DETAIL_REPORT_SUCCESS,
    response: response,
    message: message,
  };
};
const downloadAccessDetailReport_fail = (message) => {
  return {
    type: actions.ACCESS_DETAIL_REPORT_FAIL,
    message: message,
  };
};

const downloadAccessDetailReportApi = (navigate, Data) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let form = new FormData();
  form.append("RequestMethod", SecurityAdminAccessDetailReport.RequestMethod);
  form.append("RequestData", JSON.stringify(Data));
  return async (dispatch) => {
    await dispatch(downloadAccessDetailReport_init());
    axios({
      method: "post",
      url: downloadReportApi,
      data: form,
      headers: {
        _token: token,
        "Content-Disposition": "attachment; filename=template.xlsx",
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
      responseType: "arraybuffer",
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(downloadAccessDetailReportApi(navigate, Data));
        } else if (response.status === 200) {
          const url = window.URL.createObjectURL(new Blob([response.data]));

          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "Access Detail Report.xlsx");
          document.body.appendChild(link);
          link.click();
          dispatch(
            downloadAccessDetailReport_success(
              response.data.responseResult,
              "Download-successffuly"
            )
          );
        }
      })
      .catch((response) => {
        dispatch(downloadAccessDetailReport_fail(response));
      });
  };
};

export {
  cleareMessage,
  downloadBankUserReportApi,
  downloadCorporateUserReportApi,
  downloadSystemAdminUserLoginHistoryReportApi,
  downloadAccessDetailReportApi,
  downloadLastLoggedInReportApi,
};
