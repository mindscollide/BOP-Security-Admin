import * as actions from "../action_types";
import axios from "axios";
import {
  authenticationLogIn,
  authenticationRefreshToken,
  authenticationSignUp,
  allUserRolesList,
  getAllUserStatus,
  getAllCorporates,
  getAllCorporateCategoriesERM,
  getAllNatureBusinessERM,
  getAllAssetsTypeERM,
  addNatureBusiness,
  updateNatureOfBusiness,
  viewNatureOfBusiness,
  deleteNatureOfBusines,
} from "../../commen/apis/Api_config";
import { authenticationAPI } from "../../commen/apis/Api_ends_points";
import { getNewUserRequestsCount, allUserList } from "./Security_Admin";

const logininit = () => {
  return {
    type: actions.LOG_IN_INIT,
  };
};

const loginsuccess = (response, message) => {
  return {
    type: actions.LOG_IN_SUCCESS,
    response: response,
    message: message,
  };
};

const loginfail = (message) => {
  return {
    type: actions.LOG_IN_FAIL,
    message: message,
  };
};

const signupInit = () => {
  return {
    type: actions.SIGN_UP_INIT,
  };
};

const signupSuccess = (response, message) => {
  return {
    type: actions.SIGN_UP_SUCCESS,
    response: response,
    message: message,
  };
};

const signupFail = (response, message) => {
  return {
    type: actions.SIGN_UP_FAIL,
    response: response,
    message: message,
  };
};

const signOut = (navigate, message) => {
  localStorage.clear();
  navigate("/");
  if (message !== "") {
    return {
      type: actions.SIGN_OUT,
      message: message,
    };
  } else {
    return {
      type: actions.SIGN_OUT,
    };
  }
};

//signIn API Function
const logIn = (navigate, UserData) => {
  console.log("logincredentials", UserData);
  var min = 10000;
  var max = 90000;
  var id = min + Math.random() * (max - min);
  let Data = {
    UserName: UserData.UserName,
    Password: UserData.Password,
    DeviceID: id.toString(),
    Device: "browser",
  };
  let dataForEditUser = {
    FirstName: "",
    LastName: "",
    UserLDAPAccount: "",
    Email: "",
    UserRoleID: 0,
    UserStatusID: 0,
    RequestingUserID: 0,
  };
  console.log("logincredentials", Data);
  return (dispatch) => {
    dispatch(logininit());
    let form = new FormData();
    form.append("RequestMethod", authenticationLogIn.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: authenticationAPI,
      data: form,
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage ===
              "ERM_AuthService_AuthManager_Login_01"
            ) {
              dispatch(loginfail("Device does not exists"));
            } else if (
              response.data.responseResult.responseMessage ===
              "ERM_AuthService_AuthManager_Login_02"
            ) {
              dispatch(loginfail("Device ID does not exists"));
            } else if (
              response.data.responseResult.responseMessage ===
              "ERM_AuthService_AuthManager_Login_03"
            ) {
              if (response.data.responseResult.roleID === 5) {
                localStorage.setItem(
                  "userID",
                  response.data.responseResult.userID
                );
                localStorage.setItem(
                  "bankID",
                  response.data.responseResult.bankID
                );
                localStorage.setItem("defaultOpenKey ", "sub1");
                localStorage.setItem("defaultSelectedKey", "3");
                localStorage.setItem(
                  "firstName",
                  response.data.responseResult.firstName
                );
                localStorage.setItem(
                  "lastName",
                  response.data.responseResult.lastName
                );
                localStorage.setItem(
                  "userName",
                  response.data.responseResult.userName
                );
                localStorage.setItem(
                  "roleID",
                  response.data.responseResult.roleID
                );
                localStorage.setItem(
                  "token",
                  JSON.stringify(response.data.responseResult.token)
                );
                localStorage.setItem(
                  "refreshToken",
                  JSON.stringify(response.data.responseResult.refreshToken)
                );
                dispatch(
                  getNewUserRequestsCount(
                    navigate,
                    response.data.responseResult.roleID
                  )
                );
                navigate("/JS/Admin");
                dispatch(
                  loginsuccess(
                    response.data.responseResult,
                    "Successfully Logged In"
                  )
                );
                dispatch(allUserList(navigate, dataForEditUser));
              } else if (response.data.responseResult.roleID === 5) {
                localStorage.setItem(
                  "userID",
                  response.data.responseResult.userID
                );
                localStorage.setItem(
                  "bankID",
                  response.data.responseResult.bankID
                );
                localStorage.setItem(
                  "firstName",
                  response.data.responseResult.firstName
                );
                localStorage.setItem(
                  "lastName",
                  response.data.responseResult.lastName
                );
                localStorage.setItem(
                  "userName",
                  response.data.responseResult.userName
                );
                localStorage.setItem(
                  "roleID",
                  response.data.responseResult.roleID
                );
                localStorage.setItem(
                  "token",
                  response.data.responseResult.token
                );
                localStorage.setItem(
                  "refreshToken",
                  response.data.responseResult.refreshToken
                );
                navigate("/JS/Admin");
                dispatch(loginsuccess("Successfully Logged In"));
              } else {
                dispatch(
                  loginfail("This user is not authorise for this domain")
                );
              }
            } else if (
              response.data.responseResult.responseMessage ===
              "ERM_AuthService_AuthManager_Login_04"
            ) {
              dispatch(
                loginfail("Invalid Credentials. Please enter correct password")
              );
            } else if (
              response.data.responseResult.responseMessage ===
              "ERM_AuthService_AuthManager_Login_05"
            ) {
              dispatch(
                loginfail(
                  "Your account has been Locked. Please contact Data Strategy - BST"
                )
              );
            } else if (
              response.data.responseResult.responseMessage ===
              "ERM_AuthService_AuthManager_Login_06"
            ) {
              dispatch(
                loginfail(
                  "Your account has been Disabled. Please contact Data Strategy - BST"
                )
              );
            } else if (
              response.data.responseResult.responseMessage ===
              "ERM_AuthService_AuthManager_Login_07"
            ) {
              dispatch(
                loginfail(
                  "Your account has been Closed. Please contact Data Strategy - BST"
                )
              );
            } else if (
              response.data.responseResult.responseMessage ===
              "ERM_AuthService_AuthManager_Login_08"
            ) {
              dispatch(
                loginfail(
                  "Account set to Dormant due to InActivity. Please contact Data Strategy - BST"
                )
              );
            } else if (
              response.data.responseResult.responseMessage ===
              "ERM_AuthService_AuthManager_Login_09"
            ) {
              dispatch(loginfail("User could not be Verified"));
            } else if (
              response.data.responseResult.responseMessage ===
              "ERM_AuthService_AuthManager_Login_10"
            ) {
              dispatch(
                loginfail("Not a valid user. Please login with valid user")
              );
            } else if (
              response.data.responseResult.responseMessage ===
              "ERM_AuthService_AuthManager_Login_011"
            ) {
              dispatch(loginfail("something went wrong"));
            }
          } else {
            dispatch(loginfail("something went wrong"));
            console.log("something went wrong");
          }
        } else {
          dispatch(loginfail("something went wrong"));
          console.log("something went wrong");
        }
      })
      .catch((response) => {
        dispatch(loginfail("something went wrong"));
      });
  };
};

// signUp API Function

const signUp = (UserData, navigate) => {
  let Data = {
    LoginID: UserData.LoginID,
    FirstName: UserData.FirstName,
    LastName: UserData.LastName,
    Email: UserData.Email,
    PersonalNumber: UserData.PersonalNumber,
    RoleID: UserData.RoleID,
  };

  return (dispatch) => {
    dispatch(signupInit());
    let form = new FormData();
    form.append("RequestMethod", authenticationSignUp.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "POST",
      url: authenticationAPI,
      data: form,
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_SignUpManager_SignUp_01".toLowerCase()
                )
            ) {
              dispatch(
                signupFail(
                  "Invalid Role for Signup. Please select a role from the given options"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_SignUpManager_SignUp_02".toLowerCase()
                )
            ) {
              dispatch(
                signupFail(
                  "Signup request for the Login ID is in pending state. Please use a different ID"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_SignUpManager_SignUp_03".toLowerCase()
                )
            ) {
              if (response.data.responseResult.roleID === 1) {
                localStorage.setItem(
                  "userID",
                  response.data.responseResult.userID
                );
                localStorage.setItem(
                  "firstName",
                  response.data.responseResult.firstName
                );
                localStorage.setItem(
                  "lastName",
                  response.data.responseResult.lastName
                );
                localStorage.setItem(
                  "userName",
                  response.data.responseResult.userName
                );
                localStorage.setItem(
                  "roleID",
                  response.data.responseResult.roleID
                );
                localStorage.setItem(
                  "token",
                  response.data.responseResult.token
                );
                localStorage.setItem(
                  "refreshToken",
                  response.data.responseResult.refreshToken
                );
                navigate("/");
                dispatch(signupSuccess("Successfully signup In"));
              } else if (response.data.responseResult.roleID === 5) {
                localStorage.setItem(
                  "userID",
                  response.data.responseResult.userID
                );
                localStorage.setItem(
                  "firstName",
                  response.data.responseResult.firstName
                );
                localStorage.setItem(
                  "lastName",
                  response.data.responseResult.lastName
                );
                localStorage.setItem(
                  "userName",
                  response.data.responseResult.userName
                );
                localStorage.setItem(
                  "roleID",
                  response.data.responseResult.roleID
                );
                localStorage.setItem(
                  "token",
                  response.data.responseResult.token
                );
                localStorage.setItem(
                  "refreshToken",
                  response.data.responseResult.refreshToken
                );
                navigate("/");
                dispatch(signupSuccess("Successfully Signup In"));
              } else {
                dispatch(
                  loginfail("This user is not authorise for this domain")
                );
              }
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_SignUpManager_SignUp_04".toLowerCase()
                )
            ) {
              dispatch(
                signupFail(
                  "Unable to submit signup request. Please try after some time"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_SignUpManager_SignUp_05".toLowerCase()
                )
            ) {
              dispatch(signupFail("Something went wrong"));
            }
          } else {
            dispatch(signupFail("Something went wrong"));
            console.log("Something went wrong in signup");
          }
        } else {
          dispatch(signupFail("Something went wrong"));
          console.log("Something went wrong in signup");
        }
      })

      .catch((response) => {
        dispatch(signupFail("Something went wrong"));
      });
  };
};

// REFRESH TOKEN
// FAIL
const refreshtokenFail = (response, message) => {
  return {
    type: actions.REFRESH_TOKEN_FAIL,
    response: response,
    message: message,
  };
};
// SUCCESS
const refreshtokenSuccess = (response, message) => {
  return {
    type: actions.REFRESH_TOKEN_SUCCESS,
    response: response,
    message: message,
  };
};
// API
const RefreshToken = (navigate) => {
  let Token = JSON.parse(localStorage.getItem("token"));
  let RefreshToken = JSON.parse(localStorage.getItem("refreshToken"));
  console.log("RefreshToken", Token, RefreshToken);
  let Data = {
    Token: Token,
    RefreshToken: RefreshToken,
  };
  console.log("RefreshToken", Data);
  return async (dispatch) => {
    let form = new FormData();
    form.append("RequestMethod", authenticationRefreshToken.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    await axios({
      method: "post",
      url: authenticationAPI,
      data: form,
    })
      .then(async (response) => {
        console.log("RefreshToken", response);
        if (response.data.responseCode === 200) {
          await dispatch(
            refreshtokenSuccess(
              response.data.responseResult,
              "Refresh Token Update Successfully"
            )
          );
        } else {
          console.log("RefreshToken", response);
          let message2 = "Your Session has expired. Please login again";
          dispatch(signOut(navigate, message2));
          await dispatch(
            refreshtokenFail("Your Session has expired. Please login again.")
          );
        }
      })
      .catch((response) => {
        dispatch(
          refreshtokenFail("Your Session has expired. Please login again.")
        );
      });
  };
};

// FOR GET ALL USER ROLE LIST API

const userRoleInit = () => {
  return {
    type: actions.GET_ALL_USER_ROLE_LIST_INIT,
  };
};

const userRoleSuccess = (response, message) => {
  return {
    type: actions.GET_ALL_USER_ROLE_LIST_SUCCESS,
    response: response,
    message: message,
  };
};

const userRoleFail = (message) => {
  return {
    type: actions.GET_ALL_USER_ROLE_LIST_FAIL,
    message: message,
  };
};

const allUserRole = () => {
  return (dispatch) => {
    dispatch(userRoleInit());
    let form = new FormData();
    form.append("RequestMethod", allUserRolesList.RequestMethod);
    axios({
      method: "POST",
      url: authenticationAPI,
      data: form,
    })
      .then(async (response) => {
        console.log("UserRoleListUserRoleList", response);
        if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "ERM_AuthService_CommonManager_RoleList_01".toLowerCase()
            ) {
              console.log("UserRoleListUserRoleList", response);
              dispatch(
                userRoleSuccess(
                  response.data.responseResult.roles,
                  "Record found"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_RoleList_02".toLowerCase()
                )
            ) {
              dispatch(userRoleFail("No Record Found"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_RoleList_03".toLowerCase()
                )
            ) {
              dispatch(userRoleFail("Exception No roles available"));
            }
          } else {
            dispatch(userRoleFail("Something went wrong"));
            console.log("There's no User Role");
          }
        } else {
          dispatch(userRoleFail("Something went wrong"));
          console.log("There's no User Role");
        }
      })
      .catch((response) => {
        dispatch(userRoleFail("something went wrong"));
      });
  };
};

// FOR USER STATUS API
const userStatusInit = () => {
  return {
    type: actions.GET_ALL_USER_STATUS_INIT,
  };
};

const userStatusSuccess = (response, message) => {
  return {
    type: actions.GET_ALL_USER_STATUS_SUCCESS,
    response: response,
    message: message,
  };
};

const userStatusFail = (message) => {
  return {
    type: actions.GET_ALL_USER_STATUS_FAIL,
    message: message,
  };
};

const allUserStatus = (navigate) => {
  return (dispatch) => {
    dispatch(userStatusInit());
    let form = new FormData();
    form.append("RequestMethod", getAllUserStatus.RequestMethod);
    axios({
      method: "POST",
      url: authenticationAPI,
      data: form,
    })
      .then(async (response) => {
        console.log("UserStatusUserStatus", response);
        if (response.data.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(allUserStatus(navigate));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "ERM_AuthService_CommonManager_GetAllUserStatus_01".toLowerCase()
            ) {
              console.log("UserRoleListUserRoleList", response);
              dispatch(
                userStatusSuccess(
                  response.data.responseResult.status,
                  "Record found"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_GetAllUserStatus_02".toLowerCase()
                )
            ) {
              dispatch(userStatusFail("No Record Found"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_GetAllUserStatus_03".toLowerCase()
                )
            ) {
              dispatch(userStatusFail("Exception No roles available"));
            }
          } else {
            dispatch(userStatusFail("Something went wrong"));
            console.log("There's no User Role");
          }
        } else {
          dispatch(userStatusFail("Something went wrong"));
          console.log("There's no User Role");
        }
      })
      .catch((response) => {
        dispatch(userStatusFail("something went wrong"));
      });
  };
};

// For Get All Corporate Api
const categoryInit = () => {
  return {
    type: actions.GET_ALL_CORPORATES_INIT,
  };
};

const categorySuccess = (response, message) => {
  return {
    type: actions.GET_ALL_CORPORATES_SUCCESS,
    response: response,
    message: message,
  };
};

const categoryFail = (message) => {
  return {
    type: actions.GET_ALL_CORPORATES_FAIL,
    message: message,
  };
};

const getAllCorporate = (navigate) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(categoryInit());
    let form = new FormData();
    form.append("RequestMethod", getAllCorporates.RequestMethod);
    axios({
      method: "POST",
      url: authenticationAPI,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        console.log("CorporateCategoryCorporateCategory", response);
        if (response.data.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(getAllCorporate(navigate));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "ERM_AuthService_CommonManager_GetAllCorporates_01".toLowerCase()
            ) {
              console.log("UserRoleListUserRoleList", response);
              dispatch(
                categorySuccess(
                  response.data.responseResult.corporates,
                  "Record found"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_GetAllCorporates_02".toLowerCase()
                )
            ) {
              dispatch(categoryFail("No Record Found"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_GetAllCorporates_03".toLowerCase()
                )
            ) {
              dispatch(categoryFail("Exception Something went wrong"));
            }
          } else {
            dispatch(categoryFail("Something went wrong"));
            console.log("There's no corporates category");
          }
        } else {
          dispatch(categoryFail("Something went wrong"));
          console.log("There's no corporates category");
        }
      })
      .catch((response) => {
        dispatch(categoryFail("something went wrong"));
      });
  };
};

// for get All Corporate Categories Api
const getAllCategoryInit = () => {
  return {
    type: actions.GET_ALL_CORPORATES_CATEGORY_INIT,
  };
};

const getAllCategorySuccess = (response, message) => {
  console.log(
    response,
    message,
    "getAllCategorySuccessgetAllCategorySuccessgetAllCategorySuccess"
  );
  return {
    type: actions.GET_ALL_CORPORATES_CATEGORY_SUCCESS,
    response: response,
    message: message,
  };
};

const getAllCategoryFail = (message) => {
  return {
    type: actions.GET_ALL_CORPORATES_CATEGORY_FAIL,
    message: message,
  };
};

const getAllCorporateCategoryApi = (navigate) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(getAllCategoryInit());
    let form = new FormData();
    form.append("RequestMethod", getAllCorporateCategoriesERM.RequestMethod);
    axios({
      method: "POST",
      url: authenticationAPI,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        console.log("CorporateCategoryCorporateCategory", response);
        if (response.data.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(getAllCorporateCategoryApi(navigate));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "ERM_AuthService_CommonManager_GetAllCorporateCategories_01".toLowerCase()
            ) {
              console.log(
                "UserRoleListUserRoleList",
                response.data.responseResult.corporateCategories
              );
              dispatch(
                getAllCategorySuccess(
                  response.data.responseResult.corporateCategories,
                  "Record found"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_GetAllCorporateCategories_02".toLowerCase()
                )
            ) {
              dispatch(getAllCategoryFail("No Record Found"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_GetAllCorporateCategories_03".toLowerCase()
                )
            ) {
              dispatch(getAllCategoryFail("Exception Something went wrong"));
            }
          } else {
            dispatch(getAllCategoryFail("Something went wrong"));
            console.log("There's no corporates category");
          }
        } else {
          dispatch(getAllCategoryFail("Something went wrong"));
          console.log("There's no corporates category");
        }
      })
      .catch((response) => {
        dispatch(getAllCategoryFail("something went wrong"));
      });
  };
};

// for get All nature of business API
const natureBusinessInit = () => {
  return {
    type: actions.GET_ALL_NATURE_BUSINESS_INIT,
  };
};

const natureBusinessSuccess = (response, message) => {
  return {
    type: actions.GET_ALL_NATURE_BUSINESS_SUCCESS,
    response: response,
    message: message,
  };
};

const natureBusinessFail = (message) => {
  return {
    type: actions.GET_ALL_NATURE_BUSINESS_FAIL,
    message: message,
  };
};

const getAllNature = (navigate) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(natureBusinessInit());
    let form = new FormData();
    form.append("RequestMethod", getAllNatureBusinessERM.RequestMethod);
    axios({
      method: "POST",
      url: authenticationAPI,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        console.log("getAllNaturegetAllNaturegetAllNature", response);
        if (response.data.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(getAllNature(navigate));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "ERM_AuthService_CommonManager_GetAllNatureOfBussiness_01".toLowerCase()
            ) {
              console.log(
                "UserRoleListUserRoleList",
                response.data.responseResult.natureofBusinesses
              );
              dispatch(
                natureBusinessSuccess(
                  response.data.responseResult.natureofBusinesses,
                  "Record found"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_GetAllNatureOfBussiness_02".toLowerCase()
                )
            ) {
              dispatch(natureBusinessFail("No Record Found"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_GetAllNatureOfBussiness_03".toLowerCase()
                )
            ) {
              dispatch(natureBusinessFail("Exception Something went wrong"));
            }
          } else {
            dispatch(natureBusinessFail("Something went wrong"));
            console.log("There's no corporates category");
          }
        } else {
          dispatch(natureBusinessFail("Something went wrong"));
          console.log("There's no corporates category");
        }
      })
      .catch((response) => {
        dispatch(natureBusinessFail("something went wrong"));
      });
  };
};

// For get All assets type API

const assetTypeInit = () => {
  return {
    type: actions.GET_ALL_ASSETS_TYPE_INIT,
  };
};

const assetTypeSuccess = (response, message) => {
  return {
    type: actions.GET_ALL_ASSETS_TYPE_SUCCESS,
    response: response,
    message: message,
  };
};

const assetTypeFail = (message) => {
  return {
    type: actions.GET_ALL_ASSETS_TYPE_SUCCESS,
    message: message,
  };
};

const getAssetType = (navigate) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(assetTypeInit());
    let form = new FormData();
    form.append("RequestMethod", getAllAssetsTypeERM.RequestMethod);
    axios({
      method: "POST",
      url: authenticationAPI,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        console.log("getAllAssetsTypeERMgetAllAssetsTypeERM", response);
        if (response.data.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(getAssetType(navigate));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "ERM_AuthService_CommonManager_GetAllAssetTypes_01".toLowerCase()
            ) {
              console.log(
                "assetTypesassetTypes",
                response.data.responseResult.assetTypes
              );
              dispatch(
                assetTypeSuccess(
                  response.data.responseResult.assetTypes,
                  "Record found"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_GetAllAssetTypes_02".toLowerCase()
                )
            ) {
              dispatch(assetTypeFail("No Record Found"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_GetAllAssetTypes_03".toLowerCase()
                )
            ) {
              dispatch(assetTypeFail("Exception Something went wrong"));
            }
          } else {
            dispatch(assetTypeFail("Something went wrong"));
            console.log("There's no corporates category");
          }
        } else {
          dispatch(assetTypeFail("Something went wrong"));
          console.log("There's no corporates category");
        }
      })
      .catch((response) => {
        dispatch(assetTypeFail("something went wrong"));
      });
  };
};

//FOR ADD NATURE OF BUSINESS
const addNatureInit = () => {
  return {
    type: actions.ADD_NATURE_OF_BUSINESS_INIT,
  };
};

const addNatureSuccess = (response, message) => {
  return {
    type: actions.ADD_NATURE_OF_BUSINESS_SUCCESS,
    response: response,
    message: message,
  };
};

const addNatureFail = (message) => {
  return {
    type: actions.ADD_NATURE_OF_BUSINESS_FAIL,
    message: message,
  };
};

const addNatureApi = (navigate, newNatureData, newNatureTable) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(addNatureInit());
    let form = new FormData();
    form.append("RequestMethod", addNatureBusiness.RequestMethod);
    form.append("RequestData", JSON.stringify(newNatureData));
    axios({
      method: "POST",
      url: authenticationAPI,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        console.log("getAllNaturegetAllNaturegetAllNature", response);
        if (response.data.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(addNatureApi(navigate, newNatureData, newNatureTable));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "ERM_AuthService_CommonManager_AddNatureOfBussiness_01".toLowerCase()
            ) {
              console.log(
                "UserRoleListUserRoleList",
                response.data.responseResult.responseMessage
              );
              dispatch(
                addNatureSuccess(
                  response.data.responseResult.responseMessage,
                  "Record Saved"
                )
              );
              await dispatch(viewNatureApi(navigate, newNatureTable));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_AddNatureOfBussiness_02".toLowerCase()
                )
            ) {
              dispatch(addNatureFail("No Record Saved"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_AddNatureOfBussiness_03".toLowerCase()
                )
            ) {
              dispatch(addNatureFail("Record Already Exists"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_AddNatureOfBussiness_04".toLowerCase()
                )
            ) {
              dispatch(addNatureFail("Exception Something went wrong"));
            }
          } else {
            dispatch(addNatureFail("Something went wrong"));
            console.log("There's no corporates category");
          }
        } else {
          dispatch(addNatureFail("Something went wrong"));
          console.log("There's no corporates category");
        }
      })
      .catch((response) => {
        dispatch(addNatureFail("something went wrong"));
      });
  };
};

// FOR UPDATE NATURE OF BUSINESS IN NATURE BUSINESS PAGE
const updateNatureInit = () => {
  return {
    type: actions.UPDATE_NATURE_OF_BUSINESS_INIT,
  };
};

const updateNatureSuccess = (response, message) => {
  return {
    type: actions.UPDATE_NATURE_OF_BUSINESS_SUCCESS,
    response: response,
    message: message,
  };
};

const updateNatureFail = (message) => {
  return {
    type: actions.UPDATE_NATURE_OF_BUSINESS_FAIL,
    message: message,
  };
};

const updateNatureApi = (navigate, updateNatureData, newNatureUpdateTable) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(updateNatureInit());
    let form = new FormData();
    form.append("RequestMethod", updateNatureOfBusiness.RequestMethod);
    form.append("RequestData", JSON.stringify(updateNatureData));
    axios({
      method: "POST",
      url: authenticationAPI,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        console.log("getAllNaturegetAllNaturegetAllNature", response);
        if (response.data.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(
            updateNatureApi(navigate, updateNatureData, newNatureUpdateTable)
          );
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "ERM_AuthService_CommonManager_UpdateNatureOfBussiness_01".toLowerCase()
            ) {
              console.log(
                "UpdateNatureOfBussinessUpdateNatureOfBussiness",
                response.data.responseResult.responseMessage
              );
              dispatch(
                updateNatureSuccess(
                  response.data.responseResult.responseMessage,
                  "Record Updated"
                )
              );
              dispatch(viewNatureApi(navigate, newNatureUpdateTable));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_UpdateNatureOfBussiness_02".toLowerCase()
                )
            ) {
              dispatch(updateNatureFail("No Record Updated"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_UpdateNatureOfBussiness_03".toLowerCase()
                )
            ) {
              dispatch(updateNatureFail("Record Already Exists"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_UpdateNatureOfBussiness_04".toLowerCase()
                )
            ) {
              dispatch(updateNatureFail("Exception Something went wrong"));
            }
          } else {
            dispatch(updateNatureFail("Something went wrong"));
            console.log("There's no corporates category");
          }
        } else {
          dispatch(updateNatureFail("Something went wrong"));
          console.log("There's no corporates category");
        }
      })
      .catch((response) => {
        dispatch(updateNatureFail("something went wrong"));
      });
  };
};

// FOR VIEW NATURE OF BUSINESS API FOR PAGINATION

const viewNatureInit = () => {
  return {
    type: actions.VIEW_NATURE_BUSINESS_INIT,
  };
};

const viewNatureSuccess = (response, message) => {
  return {
    type: actions.VIEW_NATURE_BUSINESS_SUCCESS,
    response: response,
    message: message,
  };
};

const viewNatureFail = (message) => {
  return {
    type: actions.VIEW_NATURE_BUSINESS_FAIL,
    message: message,
  };
};

const viewNatureApi = (navigate, newDataRender) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(viewNatureInit());
    let form = new FormData();
    form.append("RequestMethod", viewNatureOfBusiness.RequestMethod);
    form.append("RequestData", JSON.stringify(newDataRender));
    axios({
      method: "POST",
      url: authenticationAPI,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        console.log("viewNatureApiviewNatureApi", response);
        if (response.data.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(viewNatureApi(navigate, newDataRender));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "ERM_AuthService_CommonManager_ViewAllNatureOfBussiness_01".toLowerCase()
            ) {
              console.log(
                "viewNatureApiviewNatureApiviewNatureApiviewNatureApi",
                response.data.responseResult.natureofBusinesses
              );
              dispatch(
                viewNatureSuccess(
                  response.data.responseResult.natureofBusinesses,
                  "Record Updated"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_ViewAllNatureOfBussiness_02".toLowerCase()
                )
            ) {
              dispatch(viewNatureFail("No Record Updated"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_ViewAllNatureOfBussiness_03".toLowerCase()
                )
            ) {
              dispatch(viewNatureFail("Exception Something went wrong"));
            }
          } else {
            dispatch(viewNatureFail("Something went wrong"));
            console.log("There's no corporates category");
          }
        } else {
          dispatch(viewNatureFail("Something went wrong"));
          console.log("There's no corporates category");
        }
      })
      .catch((response) => {
        dispatch(viewNatureFail("something went wrong"));
      });
  };
};

//FOR DELETE NATURE OF BUSINESS API
const deleteNatureInit = () => {
  return {
    type: actions.DELETE_NATURE_BUSINESS_INIT,
  };
};

const deleteNatureSuccess = (response, message) => {
  return {
    type: actions.DELETE_NATURE_BUSINESS_SUCCESS,
    response: response,
    message: message,
  };
};

const deleteNatureFail = (message) => {
  return {
    type: actions.DELETE_NATURE_BUSINESS_SUCCESS,
    message: message,
  };
};

const deleteNatureApi = (navigate, newDeleteData, newNatureDeleteTable) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(deleteNatureInit());
    let form = new FormData();
    form.append("RequestMethod", deleteNatureOfBusines.RequestMethod);
    form.append("RequestData", JSON.stringify(newDeleteData));
    axios({
      method: "POST",
      url: authenticationAPI,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        console.log("deleteNatureApideleteNatureApi", response);
        if (response.data.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(
            deleteNatureApi(navigate, newDeleteData, newNatureDeleteTable)
          );
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "ERM_AuthService_CommonManager_DeleteNatureOfBussiness_01".toLowerCase()
            ) {
              console.log(
                "deleteNatureApideleteNatureApideleteNatureApideleteNatureApi",
                response.data.responseResult.responseMessage
              );
              dispatch(
                deleteNatureSuccess(
                  response.data.responseResult.responseMessage,
                  "Record Delete"
                )
              );
              await dispatch(viewNatureApi(navigate, newNatureDeleteTable));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_DeleteNatureOfBussiness_02".toLowerCase()
                )
            ) {
              dispatch(deleteNatureFail("No Record Deleted"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_DeleteNatureOfBussiness_03".toLowerCase()
                )
            ) {
              dispatch(
                deleteNatureFail(
                  "Nature Of Business Is Mapped With A Corporate"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_DeleteNatureOfBussiness_04".toLowerCase()
                )
            ) {
              dispatch(deleteNatureFail("Exception Something went wrong"));
            }
          } else {
            dispatch(deleteNatureFail("Something went wrong"));
          }
        } else {
          dispatch(deleteNatureFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(deleteNatureFail("something went wrong"));
      });
  };
};

export {
  logIn,
  signUp,
  signOut,
  RefreshToken,
  allUserRole,
  allUserStatus,
  getAllCorporate,
  getAllCorporateCategoryApi,
  getAllNature,
  getAssetType,
  addNatureApi,
  updateNatureApi,
  viewNatureApi,
  deleteNatureApi,
};
