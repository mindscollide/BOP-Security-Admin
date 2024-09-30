import * as actions from "../action_types";
import axios from "axios";
import {
  authenticationLogIn,
  emailSentResetPassword,
} from "../../commen/apis/Api_config";
import { authenticationAPI } from "../../commen/apis/Api_ends_points";

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

const loginSecurityAdminFailed = (message) => {
  return {
    type: actions.LOG_IN_FAIL,
    message: message,
  };
};

const loginSecurityAdminAPI = (navigate) => {
  let data = {
    Device: "iPhone 13 Pro",
    DeviceID: "ABCD1234-5678-90EF-GHIJ-KLMNOPQRSTUV",
    Password: "0",
    UserName: "mehdi.branchuser",
  };
  return (dispatch) => {
    dispatch(loginSecurityAdmininit());
    let form = new FormData();
    form.append("RequestMethod", authenticationLogIn.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    axios({
      method: "POST",
      url: authenticationAPI,
      data: form,
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(loginSystemAdminAPI(navigate, data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "ERM_AuthService_AuthManager_Login_01".toLowerCase()
            ) {
              dispatch(
                loginSecurityAdminFailed(
                  response.data.responseResult,
                  "Device is Empty"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes("ERM_AuthService_AuthManager_Login_02".toLowerCase())
            ) {
              dispatch(loginSecurityAdminFailed("Device ID is Empty"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes("ERM_AuthService_AuthManager_Login_03".toLowerCase())
            ) {
              localStorage.setItem(
                "token",
                JSON.stringify(response.data.responseResult.token)
              );
              localStorage.setItem(
                "loginTime",
                response.data.responseResult.loginTime
              );
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
                "bankID",
                response.data.responseResult.bankID
              );
              localStorage.setItem(
                "refreshToken",
                JSON.stringify(response.data.responseResult.refreshToken)
              );
              navigate("/BOP/Admin/BankUser");
              dispatch(loginSecurityAdminSuccess("LDAP auth Successful"));
            }
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes("ERM_AuthService_AuthManager_Login_04".toLowerCase())
          ) {
            dispatch(loginSecurityAdminFailed("LDAP Auth Failed"));
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes("ERM_AuthService_AuthManager_Login_05".toLowerCase())
          ) {
            dispatch(loginSecurityAdminFailed("User is Locked"));
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes("ERM_AuthService_AuthManager_Login_06".toLowerCase())
          ) {
            dispatch(loginSecurityAdminFailed("User is Disabled"));
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes("ERM_AuthService_AuthManager_Login_07".toLowerCase())
          ) {
            dispatch(loginSecurityAdminFailed("User is Closed"));
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes("ERM_AuthService_AuthManager_Login_08".toLowerCase())
          ) {
            dispatch(loginSecurityAdminFailed("User is Dormant"));
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes("ERM_AuthService_AuthManager_Login_09".toLowerCase())
          ) {
            dispatch(loginSecurityAdminFailed("Login Failed"));
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes("ERM_AuthService_AuthManager_Login_12".toLowerCase())
          ) {
            dispatch(loginSecurityAdminFailed("Not A valid role to login"));
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes("ERM_AuthService_AuthManager_Login_10".toLowerCase())
          ) {
            dispatch(loginSecurityAdminFailed("Login Failed"));
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes("ERM_AuthService_AuthManager_Login_11".toLowerCase())
          ) {
            dispatch(loginSecurityAdminFailed("Something went wrong"));
          } else {
            dispatch(loginSecurityAdminFailed("Something went wrong"));
          }
        } else {
          dispatch(loginSecurityAdminFailed("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(loginSecurityAdminFailed("something went wrong"));
      });
  };
};

//Send Email Reset Password
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
                  "Email for Reset Password Sent Successfully"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_AuthManager_SendEmailForResetPasword_02".toLowerCase()
                )
            ) {
              dispatch(
                SendEmailResetPasswordFail("No Email sent for Reset Password")
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_AuthManager_SendEmailForResetPasword_03".toLowerCase()
                )
            ) {
              dispatch(SendEmailResetPasswordFail("Invalid Corporate User"));
            }
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_SendEmailForResetPasword_04".toLowerCase()
              )
          ) {
            dispatch(SendEmailResetPasswordFail("Please Enter A valid Email"));
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_SendEmailForResetPasword_05".toLowerCase()
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
      .catch((response) => {
        dispatch(SendEmailResetPasswordFail("something went wrong"));
      });
  };
};

export { loginSecurityAdminAPI, SendEmailResetPasswordAPI };
