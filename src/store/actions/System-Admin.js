import * as actions from "../action_types";
import axios from "axios";
import {
  getAllBankCorporate,
  searchCorporateUsersSysAdmin,
  updateCorporateApiSysAdmin,
  getCorporateNameApi,
} from "../../commen/apis/Api_config";
import { RefreshToken } from "./Auth_Actions";
import { SystemAdminApi } from "../../commen/apis/Api_ends_points";

//GET ALL BANK CORPORATE BY BANK ID
const getBankCorporateInit = () => {
  return {
    type: actions.GET_ALL_BANK_CORPORATE_INIT,
  };
};

const getBankCorporateSuccess = (response, message) => {
  return {
    type: actions.GET_ALL_BANK_CORPORATE_SUCCESS,
    response: response,
    message: message,
  };
};

const getBankCorporateFail = (message) => {
  return {
    type: actions.GET_ALL_BANK_CORPORATE_FAIL,
    message: message,
  };
};

const bankCorporateAPI = (navigate, newData) => {
  let token = JSON.parse(localStorage.getItem("token"));

  return async (dispatch) => {
    dispatch(getBankCorporateInit());
    let form = new FormData();
    form.append("RequestMethod", getAllBankCorporate.RequestMethod);
    form.append("RequestData", JSON.stringify(newData));
    await axios({
      method: "post",
      url: SystemAdminApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(bankCorporateAPI(navigate, newData));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_GetAllCorporatesByBankID_01".toLowerCase()
                )
            ) {
              dispatch(
                getBankCorporateSuccess(
                  response.data.responseResult.corporates,
                  "Record Found"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_GetAllCorporatesByBankID_02".toLowerCase()
                )
            ) {
              dispatch(getBankCorporateFail("No Record found"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_GetAllCorporatesByBankID_03".toLowerCase()
                )
            ) {
              dispatch(getBankCorporateFail("Exception Something went wrong"));
            }
          } else {
            dispatch(getBankCorporateFail("Something went wrong"));
          }
        } else {
          dispatch(getBankCorporateFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(getBankCorporateFail("Something went wrong"));
      });
  };
};

// FOR SEARCH CORPORATE USER API
const searchCorporateInit = () => {
  return {
    type: actions.SEARCH_CORPORATE_USER_INIT,
  };
};

const searchCorporateSuccess = (response, message) => {
  return {
    type: actions.SEARCH_CORPORATE_USER_SUCCESS,
    response: response,
    message: message,
  };
};

const searchCorporateFail = (message) => {
  return {
    type: actions.SEARCH_CORPORATE_USER_FAIL,
    message: message,
  };
};

const searchUserCorporateApi = (navigate, corporateSearchData) => {
  let token = JSON.parse(localStorage.getItem("token"));

  return (dispatch) => {
    dispatch(searchCorporateInit());
    let form = new FormData();
    form.append("RequestMethod", searchCorporateUsersSysAdmin.RequestMethod);
    form.append("RequestData", JSON.stringify(corporateSearchData));
    axios({
      method: "post",
      url: SystemAdminApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(searchUserCorporateApi(navigate, corporateSearchData));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_SearchCorporateUsers_01".toLowerCase()
                )
            ) {
              dispatch(
                searchCorporateSuccess(
                  response.data.responseResult.corporateUsers,
                  "Record Found"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_SearchCorporateUsers_02".toLowerCase()
                )
            ) {
              dispatch(searchCorporateFail("No Record found"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_SearchCorporateUsers_03".toLowerCase()
                )
            ) {
              dispatch(searchCorporateFail("Not a valid role."));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_SearchCorporateUsers_04".toLowerCase()
                )
            ) {
              dispatch(
                searchCorporateFail("Exception No Corporate User Found")
              );
            }
          } else {
            dispatch(searchCorporateFail("Something went wrong"));
          }
        } else {
          dispatch(searchCorporateFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(searchCorporateFail("Something went wrong"));
      });
  };
};

// For Update Corporate User Api
const updateCorporateInit = () => {
  return {
    type: actions.UPDATE_CORPORATE_USER_INIT,
  };
};

const updateCorporateSuccess = (message) => {
  return {
    type: actions.UPDATE_CORPORATE_USER_SUCCESS,
    message: message,
  };
};

const updateCorporateFail = (message) => {
  return {
    type: actions.UPDATE_CORPORATE_USER_FAIL,
    message: message,
  };
};

const updateCorporateAPI = (
  navigate,
  updateCorporateData,
  setCustomerViewModal,
  corporateSearchData
) => {
  let token = JSON.parse(localStorage.getItem("token"));
  // let data = {
  //   CorporateID: 1,
  // };

  return (dispatch) => {
    dispatch(updateCorporateInit());
    let form = new FormData();
    form.append("RequestMethod", updateCorporateApiSysAdmin.RequestMethod);
    form.append("RequestData", JSON.stringify(updateCorporateData));
    axios({
      method: "post",
      url: SystemAdminApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(
            updateCorporateAPI(
              navigate,
              updateCorporateData,
              setCustomerViewModal,
              corporateSearchData
            )
          );
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_UpdateCorporateUser_01".toLowerCase()
                )
            ) {
              dispatch(updateCorporateSuccess("Record Updated"));
              await dispatch(
                searchUserCorporateApi(navigate, corporateSearchData)
              );
              setCustomerViewModal(false);
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_UpdateCorporateUser_02".toLowerCase()
                )
            ) {
              dispatch(updateCorporateFail("No record updated"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_UpdateCorporateUser_03".toLowerCase()
                )
            ) {
              dispatch(updateCorporateFail("Not a valid role"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_UpdateCorporateUser_04".toLowerCase()
                )
            ) {
              dispatch(updateCorporateFail("Exception No Corporate Update"));
            }
          } else {
            dispatch(updateCorporateFail("Something went wrong"));
          }
        } else {
          dispatch(updateCorporateFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(updateCorporateFail("Something went wrong"));
      });
  };
};

// get all corporate Name By Bank ID
const corporateBankIdInit = () => {
  return {
    type: actions.GET_ALL_CORPORATE_NAME_BY_BANK_INIT,
  };
};

const corporateBankIdSuccess = (response, message) => {
  return {
    type: actions.GET_ALL_CORPORATE_NAME_BY_BANK_SUCCESS,
    response: response,
    message: message,
  };
};

const corporateBankIdFail = (message) => {
  return {
    type: actions.GET_ALL_CORPORATE_NAME_BY_BANK_FAIL,
    message: message,
  };
};

const corporateNameByBankId = (navigate, corporateBank) => {
  let token = JSON.parse(localStorage.getItem("token"));

  return async (dispatch) => {
    dispatch(corporateBankIdInit());
    let form = new FormData();
    form.append("RequestMethod", getCorporateNameApi.RequestMethod);
    form.append("RequestData", JSON.stringify(corporateBank));
    await axios({
      method: "post",
      url: SystemAdminApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(corporateNameByBankId(navigate, corporateBank));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_GetAllCorporateNameByBankID_01".toLowerCase()
                )
            ) {
              dispatch(
                corporateBankIdSuccess(
                  response.data.responseResult.corporateNames,
                  "Record Found"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_GetAllCorporateNameByBankID_02".toLowerCase()
                )
            ) {
              dispatch(corporateBankIdFail("No Record found"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_GetAllCorporateNameByBankID_03".toLowerCase()
                )
            ) {
              dispatch(corporateBankIdFail("Exception Something went wrong"));
            }
          } else {
            dispatch(corporateBankIdFail("Something went wrong"));
          }
        } else {
          dispatch(corporateBankIdFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(corporateBankIdFail("Something went wrong"));
      });
  };
};

export {
  bankCorporateAPI,
  searchUserCorporateApi,
  updateCorporateAPI,
  corporateNameByBankId,
};
