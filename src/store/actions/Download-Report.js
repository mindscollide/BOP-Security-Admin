import {
  bankUserReport,
  CorporateUserReport,
  PDFDownloadBankUserListSecurityAdminReport,
  PDFDownloadCorporateUserListSecurityAdminReport,
  SecurityAdminAccessDetailReport,
  SecurityAdminLastLoggedInReport,
  SecurityAdminUserLoginHistoryReport,
  SecurityAdminUserStatusWiseReport,
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
        const contentType = response.headers["content-type"];

        // 🟡 Handle JSON error response
        if (contentType && contentType.includes("application/json")) {
          const decodedString = new TextDecoder().decode(
            new Uint8Array(response.data)
          );
          const parsedData = JSON.parse(decodedString);

          console.log(parsedData.responseCode, "parsed responseCode");

          if (parsedData.responseCode === 417) {
            await dispatch(RefreshToken(navigate));
            dispatch(downloadBankUserReportApi(navigate, Data));
          } else {
            dispatch(downloadBankUserReport_fail(parsedData));
          }
        }

        // 🟢 Handle successful Excel download
        else if (response.status === 200) {
          const url = window.URL.createObjectURL(new Blob([response.data]));

          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "Bank User Report.xlsx");
          document.body.appendChild(link);
          link.click();
          link.remove();

          dispatch(
            downloadBankUserReport_success(null, "Download successfully")
          );
        }
      })
      .catch((error) => {
        dispatch(downloadBankUserReport_fail(error.message));
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
        const contentType = response.headers["content-type"];

        // 🟡 If response is JSON (error like token expired)
        if (contentType && contentType.includes("application/json")) {
          const decodedString = new TextDecoder().decode(
            new Uint8Array(response.data)
          );
          const parsedData = JSON.parse(decodedString);

          console.log(parsedData.responseCode, "parsed responseCode");

          if (parsedData.responseCode === 417) {
            await dispatch(RefreshToken(navigate));
            dispatch(downloadCorporateUserReportApi(navigate, Data));
          } else {
            dispatch(downloadCorporateUserReport_fail(parsedData));
          }
        }

        // 🟢 If response is a valid Excel file
        else if (response.status === 200) {
          const url = window.URL.createObjectURL(new Blob([response.data]));

          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "Corporate User Report.xlsx");
          document.body.appendChild(link);
          link.click();
          link.remove();

          dispatch(
            downloadCorporateUserReport_success(null, "Download successfully")
          );
        }
      })
      .catch((error) => {
        dispatch(downloadCorporateUserReport_fail(error.message));
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
        const contentType = response.headers["content-type"];

        // 🟡 Handle JSON error response inside arraybuffer
        if (contentType && contentType.includes("application/json")) {
          const decodedString = new TextDecoder().decode(
            new Uint8Array(response.data)
          );
          const parsedData = JSON.parse(decodedString);

          console.log(parsedData.responseCode, "parsed responseCode");

          if (parsedData.responseCode === 417) {
            await dispatch(RefreshToken(navigate));
            dispatch(
              downloadSystemAdminUserLoginHistoryReportApi(navigate, Data)
            );
          } else {
            dispatch(
              downloadSystemAdminUserLoginHistoryReport_fail(parsedData)
            );
          }
        }

        // 🟢 Handle valid Excel file download
        else if (response.status === 200) {
          const url = window.URL.createObjectURL(new Blob([response.data]));

          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "User login History Report.xlsx");
          document.body.appendChild(link);
          link.click();
          link.remove();

          dispatch(
            downloadSystemAdminUserLoginHistoryReport_success(
              null,
              "Download successfully"
            )
          );
        }
      })
      .catch((error) => {
        dispatch(downloadSystemAdminUserLoginHistoryReport_fail(error.message));
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
        const contentType = response.headers["content-type"];

        // 🟡 Check for JSON error in arraybuffer
        if (contentType && contentType.includes("application/json")) {
          const decodedString = new TextDecoder().decode(
            new Uint8Array(response.data)
          );
          const parsedData = JSON.parse(decodedString);

          console.log(parsedData.responseCode, "parsed responseCode");

          if (parsedData.responseCode === 417) {
            await dispatch(RefreshToken(navigate));
            dispatch(downloadLastLoggedInReportApi(navigate, Data));
          } else {
            dispatch(downloadLastLoggedInReport_fail(parsedData));
          }
        }

        // 🟢 Handle Excel file download
        else if (response.status === 200) {
          const url = window.URL.createObjectURL(new Blob([response.data]));

          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "Last LoggedIn Report.xlsx");
          document.body.appendChild(link);
          link.click();
          link.remove();

          dispatch(
            downloadLastLoggedInReport_success(null, "Download successfully")
          );
        }
      })
      .catch((error) => {
        dispatch(downloadLastLoggedInReport_fail(error.message));
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
        const contentType = response.headers["content-type"];

        // 🟡 Handle if backend returns JSON in arraybuffer (e.g., token expired)
        if (contentType && contentType.includes("application/json")) {
          const decodedString = new TextDecoder().decode(
            new Uint8Array(response.data)
          );
          const parsedData = JSON.parse(decodedString);

          console.log(parsedData.responseCode, "parsed responseCode");

          if (parsedData.responseCode === 417) {
            await dispatch(RefreshToken(navigate));
            dispatch(downloadAccessDetailReportApi(navigate, Data));
          } else {
            dispatch(downloadAccessDetailReport_fail(parsedData));
          }
        }

        // 🟢 Valid Excel file download
        else if (response.status === 200) {
          const url = window.URL.createObjectURL(new Blob([response.data]));

          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "Access Detail Report.xlsx");
          document.body.appendChild(link);
          link.click();
          link.remove();

          dispatch(
            downloadAccessDetailReport_success(null, "Download successfully")
          );
        }
      })
      .catch((error) => {
        dispatch(downloadAccessDetailReport_fail(error.message));
      });
  };
};

// Access Detail Report
const downloadUserStatusWiseReport_init = () => {
  return {
    type: actions.USER_STATUS_WISE_REPORT_INIT,
  };
};
const downloadUserStatusWiseReport_success = (response, message) => {
  return {
    type: actions.USER_STATUS_WISE_REPORT_SUCCESS,
    response: response,
    message: message,
  };
};
const downloadUserStatusWiseReport_fail = (message) => {
  return {
    type: actions.USER_STATUS_WISE_REPORT_FAIL,
    message: message,
  };
};
const downloadUserStatusWiseReportApi = (navigate, Data) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let form = new FormData();
  form.append("RequestMethod", SecurityAdminUserStatusWiseReport.RequestMethod);
  form.append("RequestData", JSON.stringify(Data));

  return async (dispatch) => {
    await dispatch(downloadUserStatusWiseReport_init());

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
        const contentType = response.headers["content-type"];

        // 🟡 If response is JSON (i.e. error like token expired)
        if (contentType && contentType.includes("application/json")) {
          const decodedString = new TextDecoder().decode(
            new Uint8Array(response.data)
          );
          const parsedData = JSON.parse(decodedString);

          console.log(parsedData.responseCode, "parsed responseCode");

          if (parsedData.responseCode === 417) {
            await dispatch(RefreshToken(navigate));
            dispatch(downloadUserStatusWiseReportApi(navigate, Data));
          } else {
            dispatch(downloadUserStatusWiseReport_fail(parsedData));
          }
        }

        // 🟢 If valid Excel file is received
        else if (response.status === 200) {
          const url = window.URL.createObjectURL(new Blob([response.data]));

          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "User Status Wise Report.xlsx");
          document.body.appendChild(link);
          link.click();
          link.remove();

          dispatch(
            downloadUserStatusWiseReport_success(null, "Download successfully")
          );
        }
      })
      .catch((error) => {
        dispatch(downloadUserStatusWiseReport_fail(error.message));
      });
  };
};

// PDF Version Report Download Bank User List
const downloadPDFBankUserSecurityAdminReport_init = () => {
  return {
    type: actions.PDF_BANK_USER_REPORT_INIT,
  };
};
const downloadPDFBankUserSecurityAdminReport_success = (response, message) => {
  return {
    type: actions.PDF_BANK_USER_REPORT_SUCCESS,
    response: response,
    message: message,
  };
};
const downloadPDFBankUserSecurityAdminyReport_fail = (message) => {
  return {
    type: actions.PDF_BANK_USER_REPORT_FAIL,
    message: message,
  };
};
const downloadPDFBankUserSecurityAdminReportApi = (navigate, Data) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let form = new FormData();
  form.append(
    "RequestMethod",
    PDFDownloadBankUserListSecurityAdminReport.RequestMethod
  );
  form.append("RequestData", JSON.stringify(Data));

  return async (dispatch) => {
    await dispatch(downloadPDFBankUserSecurityAdminReport_init());

    axios({
      method: "post",
      url: downloadReportApi,
      data: form,
      headers: {
        _token: token,
        "Content-Type": "application/pdf",
      },
      responseType: "arraybuffer",
    })
      .then(async (response) => {
        const contentType = response.headers["content-type"];

        // 🟡 If response is JSON (likely error like token expiration)
        if (contentType && contentType.includes("application/json")) {
          const decodedString = new TextDecoder().decode(
            new Uint8Array(response.data)
          );
          const parsedData = JSON.parse(decodedString);

          console.log(parsedData.responseCode, "parsed responseCode");

          if (parsedData.responseCode === 417) {
            await dispatch(RefreshToken(navigate));
            dispatch(downloadPDFBankUserSecurityAdminReportApi(navigate, Data));
          } else {
            dispatch(downloadPDFBankUserSecurityAdminyReport_fail(parsedData));
          }
        }

        // 🟢 If response is a valid PDF file
        else if (response.status === 200) {
          const blob = new Blob([response.data], { type: "application/pdf" });
          const url = window.URL.createObjectURL(blob);

          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "BankUserReport.pdf");
          document.body.appendChild(link);
          link.click();
          link.remove();

          dispatch(
            downloadPDFBankUserSecurityAdminReport_success(
              null,
              "Download successfully"
            )
          );
        }
      })
      .catch((error) => {
        dispatch(downloadPDFBankUserSecurityAdminyReport_fail(error.message));
      });
  };
};

// PDF Version Report Download Bank User List
const downloadPDFCorporateUserSecurityAdminReport_init = () => {
  return {
    type: actions.PDF_CORPORATE_USER_REPORT_INIT,
  };
};
const downloadPDFCorporateUserSecurityAdminReport_success = (
  response,
  message
) => {
  return {
    type: actions.PDF_CORPORATE_USER_REPORT_SUCCESS,
    response: response,
    message: message,
  };
};
const downloadPDFCorporateUserSecurityAdminyReport_fail = (message) => {
  return {
    type: actions.PDF_CORPORATE_USER_REPORT_FAIL,
    message: message,
  };
};
const downloadPDFCorporateUserSecurityAdminReportApi = (navigate, Data) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let form = new FormData();
  form.append(
    "RequestMethod",
    PDFDownloadCorporateUserListSecurityAdminReport.RequestMethod
  );
  form.append("RequestData", JSON.stringify(Data));

  return async (dispatch) => {
    await dispatch(downloadPDFCorporateUserSecurityAdminReport_init());

    axios({
      method: "post",
      url: downloadReportApi,
      data: form,
      headers: {
        _token: token,
        "Content-Type": "application/pdf",
      },
      responseType: "arraybuffer",
    })
      .then(async (response) => {
        const contentType = response.headers["content-type"];

        // 🟡 If the response is JSON (likely token expired)
        if (contentType && contentType.includes("application/json")) {
          const decodedString = new TextDecoder().decode(
            new Uint8Array(response.data)
          );
          const parsedData = JSON.parse(decodedString);

          console.log(parsedData.responseCode, "parsed responseCode");

          if (parsedData.responseCode === 417) {
            await dispatch(RefreshToken(navigate));
            dispatch(
              downloadPDFCorporateUserSecurityAdminReportApi(navigate, Data)
            );
          } else {
            dispatch(
              downloadPDFCorporateUserSecurityAdminyReport_fail(parsedData)
            );
          }
        }

        // 🟢 If the response is a valid PDF file
        else if (response.status === 200) {
          const blob = new Blob([response.data], { type: "application/pdf" });
          const url = window.URL.createObjectURL(blob);

          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "CorporateUserReport.pdf");
          document.body.appendChild(link);
          link.click();
          link.remove();

          dispatch(
            downloadPDFCorporateUserSecurityAdminReport_success(
              null,
              "Download successfully"
            )
          );
        }
      })
      .catch((error) => {
        dispatch(
          downloadPDFCorporateUserSecurityAdminyReport_fail(error.message)
        );
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
  downloadUserStatusWiseReportApi,
  downloadPDFBankUserSecurityAdminReportApi,
  downloadPDFCorporateUserSecurityAdminReportApi,
};
