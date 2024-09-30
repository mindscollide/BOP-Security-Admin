import * as actions from "../action_types";
import axios from "axios";
import {
  saveBankUserApi,
  saveCorporateUserApi,
  getNewBankUserRequestApi,
  getNewCorporateUserRequestApi,
  rejectUserRequestApi,
} from "../../commen/apis/Api_config";
import { securityAdminApi } from "../../commen/apis/Api_ends_points";

const saveBankInit = () => {
  return {
    type: actions.SAVE_BANK_USER_INIT,
  };
};

const saveBankSuccess = (response, message) => {
  return {
    type: actions.SAVE_BANK_USER_SUCCESS,
    response: response,
    message: message,
  };
};

const saveBankFail = (message) => {
  return {
    type: actions.SAVE_BANK_USER_FAIL,
    message: message,
  };
};

const saveBankUserMainApi = () => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(saveBankInit());
    let form = new FormData();
    form.append("RequestMethod", saveBankUserApi.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: securityAdminApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(saveBankUserMainApi(navigate));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_SaveBankUser_01".toLowerCase()
                )
            ) {
              dispatch(
                saveBankSuccess(
                  response.data.responseResult.responseMessage,
                  "user created"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_SaveBankUser_02".toLowerCase()
                )
            ) {
              dispatch(saveBankFail("user not created"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_SaveBankUser_03".toLowerCase()
                )
            ) {
              dispatch(saveBankFail("not a valid role"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_SaveBankUser_04".toLowerCase()
                )
            ) {
              dispatch(saveBankFail("user not created"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_SaveBankUser_05".toLowerCase()
                )
            ) {
              dispatch(saveBankFail("user not created"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_SaveBankUser_06".toLowerCase()
                )
            ) {
              dispatch(saveBankFail("user's email already exists"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_SaveBankUser_08".toLowerCase()
                )
            ) {
              dispatch(saveBankFail("request not found"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_SaveBankUser_09".toLowerCase()
                )
            ) {
              dispatch(saveBankFail("Something went wrong"));
            }
          } else {
            dispatch(saveBankFail("Something went wrong"));
          }
        } else {
          dispatch(saveBankFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(saveBankFail("Something went wrong"));
      });
  };
};

const saveCorporateInit = () => {
  return {
    type: actions.SAVE_CORPORATE_USER_INIT,
  };
};

const saveCorporateSuccess = (response, message) => {
  return {
    type: actions.SAVE_CORPORATE_USER_SUCCESS,
    response: response,
    message: message,
  };
};

const saveCorporateFail = (message) => {
  return {
    type: actions.SAVE_CORPORATE_USER_FAIL,
    message: message,
  };
};

const saveCorporateUserMainApi = () => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(saveCorporateInit());
    let form = new FormData();
    form.append("RequestMethod", saveCorporateUserApi.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: securityAdminApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(saveCorporateUserMainApi(navigate));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_SaveCorporateUser_01".toLowerCase()
                )
            ) {
              dispatch(
                saveCorporateSuccess(
                  response.data.responseResult.responseMessage,
                  "user created"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_SaveCorporateUser_02".toLowerCase()
                )
            ) {
              dispatch(saveCorporateFail("user not created"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_SaveCorporateUser_03".toLowerCase()
                )
            ) {
              dispatch(saveCorporateFail("not a valid role"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_SaveCorporateUser_04".toLowerCase()
                )
            ) {
              dispatch(saveCorporateFail("user not created"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_SaveCorporateUser_05".toLowerCase()
                )
            ) {
              dispatch(saveCorporateFail("user not created"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_SaveCorporateUser_06".toLowerCase()
                )
            ) {
              dispatch(saveCorporateFail("user's email already exists"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_SaveCorporateUser_07".toLowerCase()
                )
            ) {
              dispatch(saveCorporateFail("request not found"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_SaveCorporateUser_08".toLowerCase()
                )
            ) {
              dispatch(saveCorporateFail("exception"));
            }
          } else {
            dispatch(saveCorporateFail("Something went wrong"));
          }
        } else {
          dispatch(saveCorporateFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(saveCorporateFail("Something went wrong"));
      });
  };
};

const getNewBankUserRequestInit = () => {
  return {
    type: actions.GET_NEW_BANK_USER_REQUESTS_INIT,
  };
};

const getNewBankUserRequestSuccess = (response, message) => {
  return {
    type: actions.GET_NEW_BANK_USER_REQUESTS_SUCCESS,
    response: response,
    message: message,
  };
};

const getNewBankUserRequestFail = (message) => {
  return {
    type: actions.GET_NEW_BANK_USER_REQUESTS_FAIL,
    message: message,
  };
};

const getNewBankUserRequestMainApi = (navigate) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(getNewBankUserRequestInit());
    let form = new FormData();
    form.append("RequestMethod", getNewBankUserRequestApi.RequestMethod);
    // form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: securityAdminApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(getNewBankUserRequestMainApi(navigate));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_GetNewBankUserRequests_01".toLowerCase()
                )
            ) {
              dispatch(
                getNewBankUserRequestSuccess(
                  response.data.responseResult.responseMessage,
                  "Data Available"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_GetNewBankUserRequests_02".toLowerCase()
                )
            ) {
              dispatch(getNewBankUserRequestFail("No Data Available"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_GetNewBankUserRequests_03".toLowerCase()
                )
            ) {
              dispatch(getNewBankUserRequestFail("Exception"));
            }
          } else {
            dispatch(getNewBankUserRequestFail("Something went wrong"));
          }
        } else {
          dispatch(getNewBankUserRequestFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(getNewBankUserRequestFail("Something went wrong"));
      });
  };
};

const getNewCorporateUserRequestInit = () => {
  return {
    type: actions.GET_NEW_CORPORATE_USER_REQUESTS_INIT,
  };
};

const getNewCorporateUserRequestSuccess = (response, message) => {
  return {
    type: actions.GET_NEW_CORPORATE_USER_REQUESTS_SUCCESS,
    response: response,
    message: message,
  };
};

const getNewCorporateUserRequestFail = (message) => {
  return {
    type: actions.GET_NEW_CORPORATE_USER_REQUESTS_FAIL,
    message: message,
  };
};

const getNewCorporateUserRequestMainApi = () => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(getNewCorporateUserRequestInit());
    let form = new FormData();
    form.append("RequestMethod", getNewCorporateUserRequestApi.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: securityAdminApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(getNewCorporateUserRequestMainApi(navigate));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_GetNewCorporateUserRequests_01".toLowerCase()
                )
            ) {
              dispatch(
                getNewCorporateUserRequestSuccess(
                  response.data.responseResult.responseMessage,
                  "Data Available"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_GetNewCorporateUserRequests_02".toLowerCase()
                )
            ) {
              dispatch(getNewCorporateUserRequestFail("No Data Available"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_GetNewCorporateUserRequests_03".toLowerCase()
                )
            ) {
              dispatch(getNewCorporateUserRequestFail("Exception  "));
            }
          } else {
            dispatch(getNewCorporateUserRequestFail("Something went wrong"));
          }
        } else {
          dispatch(getNewCorporateUserRequestFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(getNewCorporateUserRequestFail("Something went wrong"));
      });
  };
};

const rejectUserRequestInit = () => {
  return {
    type: actions.REJECT_USER_REQUEST_INIT,
  };
};

const rejectUserRequestSuccess = (response, message) => {
  return {
    type: actions.REJECT_USER_REQUEST_SUCCESS,
    response: response,
    message: message,
  };
};

const rejectUserRequestFail = (message) => {
  return {
    type: actions.REJECT_USER_REQUEST_FAIL,
    message: message,
  };
};

const rejectUserRequestMainApi = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(rejectUserRequestInit());
    let form = new FormData();
    form.append("RequestMethod", rejectUserRequestApi.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: securityAdminApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(rejectUserRequestMainApi(navigate));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_RejectUserRequest_01".toLowerCase()
                )
            ) {
              dispatch(
                rejectUserRequestSuccess(
                  response.data.responseResult.responseMessage,
                  "Successful"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_RejectUserRequest_02".toLowerCase()
                )
            ) {
              dispatch(rejectUserRequestFail("Unsuccessful"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_RejectUserRequest_03".toLowerCase()
                )
            ) {
              dispatch(rejectUserRequestFail("No Request Found"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_RejectUserRequest_05".toLowerCase()
                )
            ) {
              dispatch(rejectUserRequestFail("Exception"));
            }
          } else {
            dispatch(rejectUserRequestFail("Something went wrong"));
          }
        } else {
          dispatch(rejectUserRequestFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(rejectUserRequestFail("Something went wrong"));
      });
  };
};

export {
  saveBankUserMainApi,
  saveCorporateUserMainApi,
  getNewBankUserRequestMainApi,
  getNewCorporateUserRequestMainApi,
};
