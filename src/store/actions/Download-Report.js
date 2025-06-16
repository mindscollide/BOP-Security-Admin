import {
  bankUserReport,
  CorporateUserReport,
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

export {
  cleareMessage,
  downloadBankUserReportApi,
  downloadCorporateUserReportApi,
};
