import * as actions from "../action_types";
import axios from "axios";
import {
  downloadReportSecurityApi,
  downloadAccessReportApi,
  downlaodStatusWiseReportApi,
  downlaodLastLoginReportApi,
  downloadBankUserLoginHistory,
} from "../../commen/apis/Api_config";
import { RefreshToken } from "./Auth_Actions";
import { downloadReportApi } from "../../commen/apis/Api_ends_points";

const downloadAddBankUserInit = () => {
  return {
    type: actions.DOWNLOAD_ADD_BANK_EXCEL_INIT,
  };
};

// for Download Report Loader
const loaderReport = (response) => {
  return {
    type: actions.DOWNLOAD_REPORT_INIT,
    action: response,
  };
};

// For Download Report Something Went wrong
const SomeThingWentWrong = (response) => {
  return {
    type: actions.SOME_THING_WENT_WRONG,
    action: response,
  };
};

const downloadAddBankorCustomerReport = (data) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let form = new FormData();
  form.append("RequestMethod", downloadReportSecurityApi.RequestMethod);
  form.append("RequestData", JSON.stringify(data));
  return (dispatch) => {
    console.log("downloadCorporateLoginReports");
    dispatch(downloadAddBankUserInit());
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
        console.log("ReportApiReportApi", response);

        if (response.status === 417) {
          await dispatch(RefreshToken());
          dispatch(downloadAddBankorCustomerReport(data));
        } else if (response.status === 200) {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          console.log("downloadAddBankorCustomerReport", url);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "download-security-reports.xlsx");
          document.body.appendChild(link);
          link.click();

          dispatch(loaderReport(false));
        }
      })
      .catch((response) => {
        console.log("downloadAddBankorCustomerReport", response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};

// DOWNLAOD ACCESS REPORT API
const downloadAccessReportInit = () => {
  return {
    type: actions.DOWNLOAD_ACCESS_REPORT_INIT,
  };
};

const reportDownloadAccessApi = (accessData) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let form = new FormData();
  form.append("RequestMethod", downloadAccessReportApi.RequestMethod);
  form.append("RequestData", JSON.stringify(accessData));
  return (dispatch) => {
    console.log("downloadAccessReportInit");
    dispatch(downloadAccessReportInit());
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
        console.log("ReportApiReportApi", response);

        if (response.status === 417) {
          await dispatch(RefreshToken());
          dispatch(reportDownloadAccessApi(accessData));
        } else if (response.status === 200) {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          console.log("reportDownloadAccessApi", url);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "download-security-reports.xlsx");
          document.body.appendChild(link);
          link.click();

          dispatch(loaderReport(false));
        }
      })
      .catch((response) => {
        console.log("downloadAddBankorCustomerReport", response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};

//DOWNLOAD STATUS WISE REPORT API
const downloadStatusReportInit = () => {
  return {
    type: actions.DOWNLOAD_STATUSWISE_REPORT_INIT,
  };
};

const reportDownloadStatusWiseApi = (statusWiseData) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let form = new FormData();
  form.append("RequestMethod", downlaodStatusWiseReportApi.RequestMethod);
  form.append("RequestData", JSON.stringify(statusWiseData));
  return (dispatch) => {
    console.log("reportDownloadStatusWiseApi");
    dispatch(downloadStatusReportInit());
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
        console.log("reportDownloadStatusWiseApi", response);

        if (response.status === 417) {
          await dispatch(RefreshToken());
          dispatch(reportDownloadStatusWiseApi(statusWiseData));
        } else if (response.status === 200) {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          console.log("reportDownloadStatusWiseApi", url);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "download-security-reports.xlsx");
          document.body.appendChild(link);
          link.click();

          dispatch(loaderReport(false));
        }
      })
      .catch((response) => {
        console.log("downloadAddBankorCustomerReport", response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};

// DOWNLOAD LAST LOGIN REPORT API

const downloadLastLoginReportInit = () => {
  return {
    type: actions.DOWNLOAD_LASTLOGIN_REPORT_INIT,
  };
};

const reportDownloadLastLoginApi = (lastLoginData) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let form = new FormData();
  form.append("RequestMethod", downlaodLastLoginReportApi.RequestMethod);
  form.append("RequestData", JSON.stringify(lastLoginData));
  return (dispatch) => {
    console.log("reportDownloadStatusWiseApi");
    dispatch(downloadLastLoginReportInit());
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
        console.log("reportDownloadLastLoginApi", response);

        if (response.status === 417) {
          await dispatch(RefreshToken());
          dispatch(reportDownloadLastLoginApi(lastLoginData));
        } else if (response.status === 200) {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          console.log("reportDownloadLastLoginApi", url);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "download-security-reports.xlsx");
          document.body.appendChild(link);
          link.click();

          dispatch(loaderReport(false));
        }
      })
      .catch((response) => {
        console.log("reportDownloadLastLoginApi", response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};

// Download Bank user login History API
const downlaodBankUserLoginInit = () => {
  return {
    type: actions.DOWNLOAD_EXCEL_BANK_FILE_INIT,
  };
};

const reportDownloadBankLoginApi = (bankUserData) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let form = new FormData();
  form.append("RequestMethod", downloadBankUserLoginHistory.RequestMethod);
  form.append("RequestData", JSON.stringify(bankUserData));
  return (dispatch) => {
    console.log("reportDownloadStatusWiseApi");
    dispatch(downlaodBankUserLoginInit());
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
        console.log("reportDownloadBankLoginApi", response);

        if (response.status === 417) {
          await dispatch(RefreshToken());
          dispatch(reportDownloadBankLoginApi(bankUserData));
        } else if (response.status === 200) {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          console.log("reportDownloadBankLoginApi", url);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "download-security-reports.xlsx");
          document.body.appendChild(link);
          link.click();

          dispatch(loaderReport(false));
        }
      })
      .catch((response) => {
        console.log("reportDownloadLastLoginApi", response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};

export {
  downloadAddBankorCustomerReport,
  reportDownloadAccessApi,
  reportDownloadStatusWiseApi,
  reportDownloadLastLoginApi,
  reportDownloadBankLoginApi,
};
