import * as actions from "../action_types";
import axios from "axios";
import {
  SaveBankUser,
  SaveCorporateUser,
  GetNewBankUserRequests,
  GetNewCorporateUserRequests,
  RejectUserRequest,
  getAllUsersListApi,
  SearchBankUsers,
  SearchCorporateUsersRM,
  SearchBankUsersRM,
  UpdateBankUser,
  UpdateCorporateUser,
} from "../../commen/apis/Api_config";
import {
  securityAdminApi,
  systemAdminApi,
} from "../../commen/apis/Api_ends_points";
import { RefreshToken } from "./Auth_Actions";

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

const saveBankUserApi = (navigate, Data) => {
  let token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(saveBankInit());
    let form = new FormData();
    form.append("RequestMethod", SaveBankUser.RequestMethod);
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
          dispatch(saveBankUserApi(navigate, Data));
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
                saveBankSuccess(response.data.responseResult, "user created")
              );
              dispatch(getNewBankUserRequestApi(navigate));
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

const saveCorporateUserApi = (navigate, Data) => {
  let token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(saveCorporateInit());
    let form = new FormData();
    form.append("RequestMethod", SaveCorporateUser.RequestMethod);
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
          dispatch(saveCorporateUserApi(navigate, Data));
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
                  response.data.responseResult,
                  "user created"
                )
              );
              dispatch(getNewCorporateUserRequestApi(navigate));
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
  console.log("response: " + response);
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

const getNewBankUserRequestApi = (navigate) => {
  let token = localStorage.getItem("token");
  return async (dispatch) => {
    dispatch(getNewBankUserRequestInit());
    let form = new FormData();
    form.append("RequestMethod", GetNewBankUserRequests.RequestMethod);
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
          dispatch(getNewBankUserRequestApi(navigate));
        } else if (response.data.responseCode === 200) {
          console.log("response", response);
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
                  response.data.responseResult,
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

const getNewCorporateUserRequestApi = (navigate) => {
  let token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(getNewCorporateUserRequestInit());
    let form = new FormData();
    form.append("RequestMethod", GetNewCorporateUserRequests.RequestMethod);
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
          dispatch(getNewCorporateUserRequestApi(navigate));
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
                  response.data.responseResult,
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

const rejectUserRequestApi = (navigate, Data) => {
  const token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(rejectUserRequestInit());
    let form = new FormData();
    form.append("RequestMethod", RejectUserRequest.RequestMethod);
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
          dispatch(rejectUserRequestApi(navigate, Data));
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
              dispatch(getNewBankUserRequestApi(navigate));
              dispatch(getNewCorporateUserRequestApi(navigate));
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

const getAllUsersListInit = () => {
  return {
    type: actions.GET_ALL_USERS_LIST_INIT,
  };
};

const getAllUsersListSuccess = (response, message) => {
  return {
    type: actions.GET_ALL_USERS_LIST_SUCCESS,
    response: response,
    message: message,
  };
};

const getAllUsersListFail = (message) => {
  return {
    type: actions.GET_ALL_USERS_LIST_FAIL,
    message: message,
  };
};

const getAllUsersListMainAPI = (navigate, Data) => {
  const token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(getAllUsersListInit());
    let form = new FormData();
    form.append("RequestMethod", getAllUsersListApi.RequestMethod);
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
          dispatch(getAllUsersListMainAPI(navigate, Data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_GetAllUsersList_01".toLowerCase()
                )
            ) {
              dispatch(
                getAllUsersListSuccess(
                  response.data.responseResult.responseMessage,
                  "Successful"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_GetAllUsersList_02".toLowerCase()
                )
            ) {
              dispatch(getAllUsersListFail("Data Not Found"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_GetAllUsersList_03".toLowerCase()
                )
            ) {
              dispatch(getAllUsersListFail("Invalid Role"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_GetAllUsersList_04".toLowerCase()
                )
            ) {
              dispatch(getAllUsersListFail("Exception"));
            }
          } else {
            dispatch(getAllUsersListFail("Something went wrong"));
          }
        } else {
          dispatch(getAllUsersListFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(getAllUsersListFail("Something went wrong"));
      });
  };
};

//Search Corporate Users
const SearchCorporateUsersInit = () => {
  return {
    type: actions.SEARCH_CORPORATE_USERS_INIT,
  };
};

const SearchCorporateUsersSuccess = (response, message) => {
  return {
    type: actions.SEARCH_CORPORATE_USERS_SUCCESS,
    response: response,
    message: message,
  };
};

const SearchCorporateUsersFail = (message) => {
  return {
    type: actions.SEARCH_CORPORATE_USERS_FAIL,
    message: message,
  };
};

const SearchCorporateUsersAPI = (navigate, data) => {
  let token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(SearchCorporateUsersInit());
    let form = new FormData();
    form.append("RequestMethod", SearchCorporateUsersRM.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    axios({
      method: "POST",
      url: securityAdminApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        console.log("response", response);
        if (response.data.responseCode === 417) {
          console.log("response", response);

          await dispatch(RefreshToken(navigate));
          dispatch(SearchCorporateUsersAPI(navigate, data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "SecurityAdmin_SecurityAdminManager_SearchCorporateUsers_01".toLowerCase()
            ) {
              dispatch(
                SearchCorporateUsersSuccess(
                  response.data.responseResult,
                  "Data Available"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_SearchCorporateUsers_02".toLowerCase()
                )
            ) {
              dispatch(SearchCorporateUsersFail("No Data Available"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_SearchCorporateUsers_03".toLowerCase()
                )
            ) {
              dispatch(SearchCorporateUsersFail("Exception"));
            }
          } else {
            dispatch(SearchCorporateUsersFail("Something went wrong"));
          }
        } else {
          dispatch(SearchCorporateUsersFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(SearchCorporateUsersFail("something went wrong"));
      });
  };
};

//Search Bank Users
const SearchBankUsersInit = () => {
  return {
    type: actions.SEARCH_BANK_USERS_INIT,
  };
};

const SearchBankUsersSuccess = (response, message) => {
  return {
    type: actions.SEARCH_BANK_USERS_SUCCESS,
    response: response,
    message: message,
  };
};

const SearchBankUsersFail = (message) => {
  return {
    type: actions.SEARCH_BANK_USERS_FAIL,
    message: message,
  };
};

const SearchBankUsersAPI = (navigate, data) => {
  let token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(SearchBankUsersInit());
    let form = new FormData();
    form.append("RequestMethod", SearchBankUsersRM.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    axios({
      method: "POST",
      url: securityAdminApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(SearchBankUsersAPI(navigate, data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "SecurityAdmin_SecurityAdminManager_SearchBankUsers_01".toLowerCase()
            ) {
              dispatch(
                SearchBankUsersSuccess(
                  response.data.responseResult,
                  "Data Available"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_SearchBankUsers_02".toLowerCase()
                )
            ) {
              dispatch(SearchBankUsersFail("No Data Available"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_SearchBankUsers_03".toLowerCase()
                )
            ) {
              dispatch(SearchBankUsersFail("Exception"));
            }
          } else {
            dispatch(SearchBankUsersFail("Something went wrong"));
          }
        } else {
          dispatch(SearchBankUsersFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(SearchBankUsersFail("something went wrong"));
      });
  };
};

//Update Bank Users
const UpdateBankUserInit = () => {
  return {
    type: actions.SEARCH_BANK_USERS_INIT,
  };
};

const UpdateBankUserSuccess = (response, message) => {
  return {
    type: actions.SEARCH_BANK_USERS_SUCCESS,
    response: response,
    message: message,
  };
};

const UpdateBankUserFail = (message) => {
  return {
    type: actions.SEARCH_BANK_USERS_FAIL,
    message: message,
  };
};

const UpdateBankUserAPI = (navigate, data, setUpdateModal) => {
  let token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(UpdateBankUserInit());
    let form = new FormData();
    form.append("RequestMethod", UpdateBankUser.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    axios({
      method: "POST",
      url: securityAdminApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(UpdateBankUserAPI(navigate, data, setUpdateModal));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "SecurityAdmin_SecurityAdminManager_UpdateBankUser_01".toLowerCase()
            ) {
              dispatch(
                UpdateBankUserSuccess(
                  response.data.responseResult,
                  "User Updated"
                )
              );
              setUpdateModal(false);
              let data = {
                Name: "",
                EmployeeID: "",
                Email: "",
                RoleID: 0,
                PageNumber: 1,
                StatusID: 0,
                Length: 10,
              };
              dispatch(SearchBankUsersAPI(navigate, data));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_UpdateBankUser_02".toLowerCase()
                )
            ) {
              dispatch(UpdateBankUserFail("User Not Found"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_UpdateBankUser_03".toLowerCase()
                )
            ) {
              dispatch(UpdateBankUserFail("User Status Not Updated"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_UpdateBankUser_04".toLowerCase()
                )
            ) {
              dispatch(UpdateBankUserFail("User Role Not Updated"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_UpdateBankUser_05".toLowerCase()
                )
            ) {
              dispatch(UpdateBankUserFail("Exception"));
            }
          } else {
            dispatch(UpdateBankUserFail("Something went wrong"));
          }
        } else {
          dispatch(UpdateBankUserFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(UpdateBankUserFail("something went wrong"));
      });
  };
};

//Update Corporate Users
const UpdateCorporateUserInit = () => {
  return {
    type: actions.SEARCH_BANK_USERS_INIT,
  };
};

const UpdateCorporateUserSuccess = (response, message) => {
  return {
    type: actions.SEARCH_BANK_USERS_SUCCESS,
    response: response,
    message: message,
  };
};

const UpdateCorporateUserFail = (message) => {
  return {
    type: actions.SEARCH_BANK_USERS_FAIL,
    message: message,
  };
};

const UpdateCorporateUserAPI = (navigate, data, setUpdateModal) => {
  let token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(UpdateCorporateUserInit());
    let form = new FormData();
    form.append("RequestMethod", UpdateCorporateUser.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    axios({
      method: "POST",
      url: securityAdminApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(UpdateCorporateUserAPI(navigate, data, setUpdateModal));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "SecurityAdmin_SecurityAdminManager_UpdateCorporateUser_01".toLowerCase()
            ) {
              dispatch(
                UpdateCorporateUserSuccess(
                  response.data.responseResult,
                  "User Status Updated"
                )
              );
              setUpdateModal(false);
              let Data = {
                Name: "",
                CompanyName: "",
                Email: "",
                StatusID: 0,
                PageNumber: 1,
                Length: 10,
              };

              dispatch(SearchCorporateUsersAPI(navigate, Data));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_UpdateCorporateUser_02".toLowerCase()
                )
            ) {
              dispatch(UpdateCorporateUserFail("User Not Updated"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_UpdateCorporateUser_03".toLowerCase()
                )
            ) {
              dispatch(UpdateCorporateUserFail("Exception"));
            }
          } else {
            dispatch(UpdateCorporateUserFail("Something went wrong"));
          }
        } else {
          dispatch(UpdateCorporateUserFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(UpdateCorporateUserFail("something went wrong"));
      });
  };
};

export {
  saveBankUserApi,
  saveCorporateUserApi,
  getNewBankUserRequestApi,
  getNewCorporateUserRequestApi,
  rejectUserRequestApi,
  getAllUsersListMainAPI,
  SearchBankUsersAPI,
  SearchCorporateUsersAPI,
  UpdateBankUserAPI,
  UpdateCorporateUserAPI,
};
