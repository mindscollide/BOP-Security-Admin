import * as actions from "../action_types";
import axios from "axios";
import {
  authenticationLogIn,
  authenticationRefreshToken,
  emailSentResetPassword,
  GetAllUserStatus,
  RoleList,
  GetBankUserRoles,
  GetAllBranches,
  LogOut,
  EmailTokenVerify,
  ForgetPassword,
  BankResetPassword,
} from "../../commen/apis/Api_config";
import { authenticationAPI } from "../../commen/apis/Api_ends_points";
import { encryptField } from "../../commen/functions/utils";

const cleareMessage = (response) => {
  return {
    type: actions.CLEARE_MESSAGE,
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

//REFRESH TOKEN
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
  let RefreshToken = localStorage.getItem("refreshToken");
  console.log("RefreshToken", Token, RefreshToken);
  let Data = {
    Token: Token,
    RefreshToken: JSON.parse(RefreshToken),
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
        if (response.data.responseCode === 205) {
          let message2 = "Your Session has expired. Please login again";
          signOut(navigate, message2);
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "ERM_AuthService_AuthManager_RefreshToken_01".toLowerCase()
            ) {
              await dispatch(
                refreshtokenSuccess(
                  response.data.responseResult,
                  "Refresh Token Update Successfully",
                ),
              );
            } else if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "ERM_AuthService_AuthManager_RefreshToken_02".toLowerCase()
            ) {
              let message2 = "Your Session has expired. Please login again";
              dispatch(signOut(navigate, message2));
            }
          } else {
            dispatch(signOut(navigate, ""));
            await dispatch(refreshtokenFail("Something went wrong"));
          }
        } else {
          dispatch(signOut(navigate, ""));
          await dispatch(refreshtokenFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(
          refreshtokenFail("Your Session has expired. Please login again."),
        );
      });
  };
};

//Login API System Admin
const loginSecurityAdmininit = () => {
  return {
    type: actions.LOG_IN_INIT,
  };
};

const loginSecurityAdminSuccess = (response, message) => {
  return {
    type: actions.LOG_IN_SUCCESS,
    response: response,
    message: message,
  };
};

const loginSecurityAdminFailed = (message, response) => {
  console.log("loginSecurityAdminFailed", response, message);

  return {
    type: actions.LOG_IN_FAIL,
    message: message,
  };
};

const loginSecurityAdminAPI = (navigate, data) => {
  // let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(loginSecurityAdmininit());
    let form = new FormData();
    form.append("RequestMethod", authenticationLogIn.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    axios({
      method: "POST",
      url: authenticationAPI,
      data: form,
      // headers: {
      //   _token: token,
      // },
    })
      .then(async (response) => {
        const {
          isExecuted,
          responseMessage,
          token,
          refreshToken,
          isPasswordReset,
          user = {},
        } = response.data.responseResult;

        const {
          branch,
          employeeID,
          ldapAccount,
          userID,
          firstName,
          email,
          contactNumber,
          userRoleID,
          userStatusID,
        } = user || {};

        if (response.data?.responseCode === 401) {
          navigate("/");
          localStorage.clear();
        }

        if (response.data.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(loginSecurityAdminAPI(navigate, data));
        } else if (response.data.responseCode === 200) {
          console.log("loginSecurityAdmin", response);

          if (isExecuted === true) {
            if (
              responseMessage?.toLowerCase() ===
              "ERM_AuthService_AuthManager_Login_01".toLowerCase()
            ) {
              dispatch(
                loginSecurityAdminFailed(
                  response.data.responseResult,
                  "Device is Empty",
                ),
              );
            } else if (
              responseMessage
                ?.toLowerCase()
                .includes("ERM_AuthService_AuthManager_Login_02".toLowerCase())
            ) {
              dispatch(loginSecurityAdminFailed("Device ID is Empty"));
            } else if (
              responseMessage
                ?.toLowerCase()
                .includes("ERM_AuthService_AuthManager_Login_03".toLowerCase())
            ) {
              // Login success
              dispatch(loginSecurityAdminSuccess(""));

              try {
                if (!isPasswordReset) {
                  const encryptedName = await encryptField(firstName);
                  const encryptedUserID = await encryptField(String(userID));

                  navigate("/ResetPassword", {
                    state: {
                      isResetPassword: false,
                      firstName: encryptedName,
                      email: email,
                      userID: encryptedUserID,
                    },
                  });

                  return;
                }

                localStorage.setItem("token", JSON.stringify(token));

                localStorage.setItem(
                  "refreshToken",
                  JSON.stringify(refreshToken),
                );

                localStorage.setItem("roleID", JSON.stringify(data.RoleID));

                localStorage.setItem("userID", userID);
                localStorage.setItem("userName", firstName);
                localStorage.setItem("defaultOpenKey", "editBankUser");

                navigate("/BOP/Admin/BankUser");
              } catch (error) {
                console.log(error);
              }
            } else if (
              responseMessage
                ?.toLowerCase()
                .includes("ERM_AuthService_AuthManager_Login_04".toLowerCase())
            ) {
              dispatch(loginSecurityAdminFailed("Wrong Password"));
            } else if (
              responseMessage
                ?.toLowerCase()
                .includes("ERM_AuthService_AuthManager_Login_05".toLowerCase())
            ) {
              dispatch(loginSecurityAdminFailed("User is Locked"));
            } else if (
              responseMessage
                ?.toLowerCase()
                .includes("ERM_AuthService_AuthManager_Login_06".toLowerCase())
            ) {
              dispatch(loginSecurityAdminFailed("User is Disabled"));
            } else if (
              responseMessage
                ?.toLowerCase()
                .includes("ERM_AuthService_AuthManager_Login_07".toLowerCase())
            ) {
              dispatch(loginSecurityAdminFailed("User is Closed"));
            } else if (
              responseMessage
                ?.toLowerCase()
                .includes("ERM_AuthService_AuthManager_Login_08".toLowerCase())
            ) {
              dispatch(loginSecurityAdminFailed("User is Dormant"));
            } else if (
              responseMessage
                ?.toLowerCase()
                .includes("ERM_AuthService_AuthManager_Login_09".toLowerCase())
            ) {
              dispatch(loginSecurityAdminFailed("Login Failed"));
            } else if (
              responseMessage
                ?.toLowerCase()
                .includes("ERM_AuthService_AuthManager_Login_12".toLowerCase())
            ) {
              dispatch(loginSecurityAdminFailed("Not A valid role to login"));
            } else if (
              responseMessage
                ?.toLowerCase()
                .includes("ERM_AuthService_AuthManager_Login_10".toLowerCase())
            ) {
              dispatch(
                loginSecurityAdminFailed(
                  "Not a valid user. Please login with valid ID",
                ),
              );
            } else if (
              responseMessage
                ?.toLowerCase()
                .includes("ERM_AuthService_AuthManager_Login_11".toLowerCase())
            ) {
              dispatch(loginSecurityAdminFailed("Something went wrong"));
            } else if (
              responseMessage
                ?.toLowerCase()
                .includes("ERM_AuthService_AuthManager_Login_14".toLowerCase())
            ) {
              dispatch(loginSecurityAdminFailed("Role Invalid"));
            } else {
              dispatch(loginSecurityAdminFailed("Something went wrong"));
            }
          } else {
            dispatch(loginSecurityAdminFailed("Something went wrong"));
          }
        } else {
          console.log("loginSecurityAdmin", response);
          dispatch(loginSecurityAdminFailed("Something went wrong"));
        }
      })
      .catch((response) => {
        console.log("loginSecurityAdmin", response);
        dispatch(loginSecurityAdminFailed("something went wrong"));
      });
  };
};

const SendEmailResetPasswordInit = () => {
  return {
    type: actions.SEND_EMAIL_RESET_PASSWORD_INIT,
  };
};

const SendEmailResetPasswordSuccess = (response, message) => {
  return {
    type: actions.SEND_EMAIL_RESET_PASSWORD_SUCCESS,
    response: response,
    message: message,
  };
};

const SendEmailResetPasswordFail = (message) => {
  return {
    type: actions.SEND_EMAIL_RESET_PASSWORD_FAIL,
    message: message,
  };
};

const SendEmailResetPasswordAPI = (navigate, data) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(SendEmailResetPasswordInit());
    let form = new FormData();
    form.append("RequestMethod", emailSentResetPassword.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    axios({
      method: "POST",
      url: authenticationAPI,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data?.responseCode === 401) {
          navigate("/");
          localStorage.clear();
        }
        if (response.data.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(SendEmailResetPasswordAPI(navigate, data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "ERM_AuthService_AuthManager_SendEmailForResetPasword_01".toLowerCase()
            ) {
              dispatch(
                SendEmailResetPasswordSuccess(
                  response.data.responseResult,
                  "Email for Reset Password Sent Successfully",
                ),
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_AuthManager_SendEmailForResetPasword_02".toLowerCase(),
                )
            ) {
              dispatch(
                SendEmailResetPasswordFail("No Email sent for Reset Password"),
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_AuthManager_SendEmailForResetPasword_03".toLowerCase(),
                )
            ) {
              dispatch(SendEmailResetPasswordFail("Invalid Corporate User"));
            }
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_SendEmailForResetPasword_04".toLowerCase(),
              )
          ) {
            dispatch(SendEmailResetPasswordFail("Please Enter A valid Email"));
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_SendEmailForResetPasword_05".toLowerCase(),
              )
          ) {
            dispatch(SendEmailResetPasswordFail("Something went wrong"));
          } else {
            dispatch(SendEmailResetPasswordFail("Something went wrong"));
          }
        } else {
          dispatch(SendEmailResetPasswordFail("Something went wrong"));
        }
      })
      .catch((errior) => {
        console.log(errior, "erriorerrior");
        dispatch(SendEmailResetPasswordFail("something went wrong"));
      });
  };
};
//GetAllUserStatus
const GetAllUserStatusInit = () => {
  return {
    type: actions.GET_ALL_USER_STATUS_INIT,
  };
};

const GetAllUserStatusSuccess = (response, message) => {
  console.log(response);
  return {
    type: actions.GET_ALL_USER_STATUS_SUCCESS,
    response: response,
    message: message,
  };
};

const GetAllUserStatusFail = (message) => {
  return {
    type: actions.GET_ALL_USER_STATUS_FAIL,
    message: message,
  };
};

const GetAllUserStatusAPI = (navigate) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return async (dispatch) => {
    dispatch(GetAllUserStatusInit());
    let form = new FormData();
    form.append("RequestMethod", GetAllUserStatus.RequestMethod);
    axios({
      method: "POST",
      url: authenticationAPI,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        // console.log(
        //   response,
        //   response.data,
        //   response.data.responseResult.responseMessage,
        //   response.data.responseCode
        // );
        if (response.data?.responseCode === 401) {
          navigate("/");
          localStorage.clear();
        }
        if (response.data?.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(GetAllUserStatusAPI(navigate));
        } else if (response.data.responseCode === 200) {
          // console.log(
          //   response,
          //   response.data,
          //   response.data.responseResult.responseMessage,
          //   response.data.responseCode,
          //   response.data.responseResult.isExecuted
          // );
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_GetAllUserStatus_01".toLowerCase(),
                )
            ) {
              dispatch(
                GetAllUserStatusSuccess(response.data.responseResult, ""),
              );
            } else if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "ERM_AuthService_CommonManager_GetAllUserStatus_02".toLowerCase()
            ) {
              dispatch(GetAllUserStatusFail(""));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_GetAllUserStatus_03".toLowerCase(),
                )
            ) {
              dispatch(GetAllUserStatusFail("Exception"));
            }
          } else {
            dispatch(GetAllUserStatusFail("Something went wrong"));
          }
        } else {
          dispatch(GetAllUserStatusFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(GetAllUserStatusFail("something went wrong"));
      });
  };
};
const RoleListInit = () => {
  console.log("here now");
  return {
    type: actions.ROLE_LIST_INIT,
  };
};

const RoleListSuccess = (response, message) => {
  console.log(response);
  return {
    type: actions.ROLE_LIST_SUCCESS,
    response: response,
    message: message,
  };
};

const RoleListFail = (message) => {
  return {
    type: actions.ROLE_LIST_FAIL,
    message: message,
  };
};

const RoleListAPI = (navigate) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return async (dispatch) => {
    dispatch(RoleListInit());
    let form = new FormData();
    form.append("RequestMethod", RoleList.RequestMethod);
    axios({
      method: "POST",
      url: authenticationAPI,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data?.responseCode === 401) {
          navigate("/");
          localStorage.clear();
        }
        if (response.data?.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(RoleListAPI(navigate));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_RoleList_01".toLowerCase(),
                )
            ) {
              // console.log(response);

              dispatch(RoleListSuccess(response.data.responseResult, ""));
            } else if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "ERM_AuthService_CommonManager_RoleList_02".toLowerCase()
            ) {
              dispatch(RoleListFail(""));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_RoleList_03".toLowerCase(),
                )
            ) {
              dispatch(RoleListFail("Exception"));
            }
          } else {
            dispatch(RoleListFail("Something went wrong"));
          }
        } else {
          dispatch(RoleListFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(RoleListFail("something went wrong"));
      });
  };
};

const GetBankUserRolesInit = () => {
  return {
    type: actions.GET_BANK_USER_ROLES_INIT,
  };
};

const GetBankUserRolesSuccess = (response, message) => {
  return {
    type: actions.GET_BANK_USER_ROLES_SUCCESS,
    response: response,
    message: message,
  };
};

const GetBankUserRolesFail = (message) => {
  return {
    type: actions.GET_BANK_USER_ROLES_FAIL,
    message: message,
  };
};

const GetBankUserRolesAPI = (navigate) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return async (dispatch) => {
    dispatch(GetBankUserRolesInit());
    let form = new FormData();
    form.append("RequestMethod", GetBankUserRoles.RequestMethod);
    axios({
      method: "POST",
      url: authenticationAPI,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data?.responseCode === 401) {
          navigate("/");
          localStorage.clear();
        }
        if (response.data?.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(GetBankUserRolesAPI(navigate));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_GetBankUserRoles_01".toLowerCase(),
                )
            ) {
              dispatch(
                GetBankUserRolesSuccess(response.data.responseResult, ""),
              );
            } else if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "ERM_AuthService_CommonManager_GetBankUserRoles_02".toLowerCase()
            ) {
              dispatch(GetBankUserRolesFail("Data UnAvailable"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_GetBankUserRoles_03".toLowerCase(),
                )
            ) {
              dispatch(GetBankUserRolesFail("Exception"));
            }
          } else {
            dispatch(GetBankUserRolesFail("Something went wrong"));
          }
        } else {
          dispatch(GetBankUserRolesFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(GetBankUserRolesFail("something went wrong"));
      });
  };
};

//Get all branches action
const GetAllBranchesInit = () => {
  return {
    type: actions.GET_ALL_BRANCHES_INIT,
  };
};

const GetAllBranchesSuccess = (response, message) => {
  return {
    type: actions.GET_ALL_BRANCHES_SUCCESS,
    response: response,
    message: message,
  };
};

const GetAllBranchesFail = (message) => {
  return {
    type: actions.GET_ALL_BRANCHES_FAIL,
    message: message,
  };
};

const GetAllBranchesAPI = (navigate) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return async (dispatch) => {
    dispatch(GetAllBranchesInit());
    let form = new FormData();
    form.append("RequestMethod", GetAllBranches.RequestMethod);
    axios({
      method: "POST",
      url: authenticationAPI,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data?.responseCode === 401) {
          navigate("/");
          localStorage.clear();
        }
        if (response.data?.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(GetAllBranchesAPI(navigate));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_GetAllBranches_01".toLowerCase(),
                )
            ) {
              dispatch(GetAllBranchesSuccess(response.data.responseResult, ""));
            } else if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "ERM_AuthService_CommonManager_GetAllBranches_02".toLowerCase()
            ) {
              dispatch(GetAllBranchesFail("Data UnAvailable"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_GetAllBranches_03".toLowerCase(),
                )
            ) {
              dispatch(GetAllBranchesFail("Exception"));
            }
          } else {
            dispatch(GetAllBranchesFail("Something went wrong"));
          }
        } else {
          dispatch(GetAllBranchesFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(GetAllBranchesFail("something went wrong"));
      });
  };
};

//Get all branches action
const LogOutInit = () => {
  return {
    type: actions.LOGOUT_INIT,
  };
};

const LogOutSuccess = (response, message) => {
  return {
    type: actions.LOGOUT_SUCCESS,
    response: response,
    message: message,
  };
};

const LogOutFail = (message) => {
  return {
    type: actions.LOGOUT_FAIL,
    message: message,
  };
};

const LogOutAPI = (navigate) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return async (dispatch) => {
    dispatch(LogOutInit());
    let form = new FormData();
    form.append("RequestMethod", LogOut.RequestMethod);
    axios({
      method: "POST",
      url: authenticationAPI,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data?.responseCode === 401) {
          navigate("/");
          localStorage.clear();
        }
        if (response.data?.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(LogOutAPI(navigate));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes("ERM_AuthService_AuthManager_LogOut_01".toLowerCase())
            ) {
              dispatch(LogOutSuccess(response.data.responseResult, ""));
              dispatch(signOut(navigate, ""));
            } else if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "ERM_AuthService_AuthManager_LogOut_02".toLowerCase()
            ) {
              dispatch(LogOutFail("Data UnAvailable"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes("ERM_AuthService_AuthManager_LogOut_03".toLowerCase())
            ) {
              dispatch(LogOutFail("Exception"));
            }
          } else {
            dispatch(LogOutFail("Something went wrong"));
          }
        } else {
          dispatch(LogOutFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(LogOutFail("something went wrong"));
      });
  };
};

const resetPassword_init = () => {
  return {
    type: actions.RESET_PASSWORD_INIT,
  };
};
const resetPassword_success = (response, message) => {
  return {
    type: actions.RESET_PASSWORD_SUCCESS,
    response,
    message,
  };
};
const resetPassword_fail = (message) => {
  return {
    type: actions.RESET_PASSWORD_FAIL,
  };
};

const resetPasswordApi = (navigate, Data) => {
  let token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(resetPassword_init());
    let form = new FormData();
    form.append("RequestMethod", BankResetPassword.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "POST",
      url: authenticationAPI,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data?.responseCode === 401) {
          navigate("/");
          localStorage.clear();
        }
        if (response.data.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(resetPasswordApi(navigate, Data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "ERM_AuthService_AuthManager_ResetPassword_01".toLowerCase()
            ) {
              localStorage.setItem("defaultOpenKey", "sub1");
              localStorage.setItem("defaultSelectedKey", "1");
              localStorage.setItem(
                "token",
                JSON.stringify(response.data.responseResult.token),
              );
              localStorage.setItem(
                "refreshToken",
                JSON.stringify(response.data.responseResult.refreshToken),
              );
              localStorage.setItem("roleID", JSON.stringify(Data.RoleID));

              localStorage.setItem(
                "userID",
                response.data.responseResult.user.userID,
              );
              localStorage.setItem(
                "userName",
                response.data.responseResult.user.firstName,
              );
              navigate("/BOP/Admin/BankUser");
              dispatch(resetPassword_success(response.data.responseResult, ""));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_AuthManager_ResetPassword_02".toLowerCase(),
                )
            ) {
              dispatch(resetPassword_fail("No Record Updated"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_AuthManager_ResetPassword_03".toLowerCase(),
                )
            ) {
              dispatch(resetPassword_fail("Something went wrong"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_AuthManager_ResetPassword_04".toLowerCase(),
                )
            ) {
              dispatch(resetPassword_fail("Something went wrong"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_AuthManager_ResetPassword_05".toLowerCase(),
                )
            ) {
              dispatch(resetPassword_fail("Something went wrong"));
            } else {
              dispatch(resetPassword_fail("Something went wrong"));
            }
          } else {
            dispatch(resetPassword_fail("Something went wrong"));
          }
        } else {
          dispatch(resetPassword_fail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(resetPassword_fail("something went wrong"));
      });
  };
};

const forgotPassword_init = () => {
  return {
    type: actions.FORGOT_PASSWORD_INIT,
  };
};
const forgotPassword_success = (response, message) => {
  return {
    type: actions.FORGOT_PASSWORD_SUCCESS,
    response,
    message,
  };
};
const forgotPassword_fail = (message) => {
  return {
    type: actions.FORGOT_PASSWORD_FAIL,
    message,
  };
};

const forgotPasswordApi = (navigate, Data) => {
  let token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(forgotPassword_init());
    let form = new FormData();
    form.append("RequestMethod", ForgetPassword.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "POST",
      url: authenticationAPI,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data?.responseCode === 401) {
          navigate("/");
          localStorage.clear();
        }
        if (response.data.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(forgotPasswordApi(navigate, Data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "ERM_AuthService_AuthManager_SendEmailForForgetPasword_01".toLowerCase()
            ) {
              navigate("/EmailSent", {
                replace: true,
                state: "EmailSentSuccessfully",
              });

              dispatch(
                forgotPassword_success(response.data.responseResult, ""),
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_AuthManager_SendEmailForForgetPasword_02".toLowerCase(),
                )
            ) {
              dispatch(forgotPassword_fail(""));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_AuthManager_SendEmailForForgetPasword_03".toLowerCase(),
                )
            ) {
              dispatch(forgotPassword_fail("User Inactive"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_AuthManager_SendEmailForForgetPasword_04".toLowerCase(),
                )
            ) {
              dispatch(forgotPassword_fail("Something went wrong"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_AuthManager_SendEmailForForgetPasword_05".toLowerCase(),
                )
            ) {
              dispatch(forgotPassword_fail("Something went wrong"));
            } else {
              dispatch(forgotPassword_fail("Something went wrong"));
            }
          } else {
            dispatch(forgotPassword_fail("Something went wrong"));
          }
        } else {
          dispatch(forgotPassword_fail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(forgotPassword_fail("something went wrong"));
      });
  };
};

const resetPasswordEmailVerification_init = () => {
  return {
    type: actions.RESETPASSWORDEMAILVERIFICATION_INIT,
  };
};
const resetPasswordEmailVerification_success = (response, message) => {
  return {
    type: actions.RESETPASSWORDEMAILVERIFICATION_SUCCESS,
    response,
    message,
  };
};
const resetPasswordEmailVerification_fail = (message) => {
  return {
    type: actions.RESETPASSWORDEMAILVERIFICATION_FAIL,
    message,
  };
};

const resetPasswordEmailVerificationApi = (navigate, Data) => {
  let token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(resetPasswordEmailVerification_init());
    let form = new FormData();
    form.append("RequestMethod", EmailTokenVerify.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "POST",
      url: authenticationAPI,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data?.responseCode === 401) {
          navigate("/");
          localStorage.clear();
        }
        if (response.data.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(resetPasswordEmailVerificationApi(navigate, Data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "ERM_AuthService_AuthManager_EmailToken_01".toLowerCase()
            ) {
              navigate("/resetPassword", {
                replace: true,
                state: {
                  email: response.data.responseResult.email,
                  requestToken: Data.EncryptedString,
                },
              });

              dispatch(
                resetPasswordEmailVerification_success(
                  response.data.responseResult,
                  "",
                ),
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_AuthManager_EmailToken_02".toLowerCase(),
                )
            ) {
              navigate("/resetPasswordLinkExpired", {
                replace: true,
                state: {
                  email: response.data.responseResult.email,
                  requestToken: Data.EncryptedString,
                },
              });
              dispatch(resetPasswordEmailVerification_fail("Invalid Email"));
            } else {
              dispatch(
                resetPasswordEmailVerification_fail("Something went wrong"),
              );
            }
          } else {
            dispatch(
              resetPasswordEmailVerification_fail("Something went wrong"),
            );
          }
        } else {
          dispatch(resetPasswordEmailVerification_fail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(resetPasswordEmailVerification_fail("something went wrong"));
      });
  };
};

export {
  resetPasswordApi,
  resetPasswordEmailVerificationApi,
  forgotPasswordApi,
  RefreshToken,
  loginSecurityAdminAPI,
  SendEmailResetPasswordAPI,
  cleareMessage,
  signOut,
  GetAllUserStatusAPI,
  RoleListAPI,
  GetBankUserRolesAPI,
  GetAllBranchesAPI,
  LogOutAPI,
};
