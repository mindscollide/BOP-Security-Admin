import * as actions from "../action_types";
import axios from "axios";
import {
  GetUserSettings,
  UpdateUserSettings,
} from "../../commen/apis/Api_config";
import { settingsAPI } from "../../commen/apis/Api_ends_points";
import { RefreshToken } from "./Auth_Actions";

//Get User Settings
const GetUserSettingsInit = () => {
  return {
    type: actions.GET_USER_SETTINGS_INIT,
  };
};

const GetUserSettingsSuccess = (response, message) => {
  console.log(response);
  return {
    type: actions.GET_USER_SETTINGS_SUCCESS,
    response: response,
    message: message,
  };
};

const GetUserSettingsFail = (message) => {
  return {
    type: actions.GET_USER_SETTINGS_FAIL,
    message: message,
  };
};

const GetUserSettingsAPI = (navigate) => {
  console.log("Checkig GetUserSettings");

  let token = localStorage.getItem("token");
  return async (dispatch) => {
    dispatch(GetUserSettingsInit());

    let form = new FormData();
    form.append("RequestMethod", GetUserSettings.RequestMethod);
    axios({
      method: "POST",
      url: settingsAPI,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        console.log("Checkig GetUserSettings");
        if (response.data?.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(GetUserSettingsAPI(navigate));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "Setting_SettingServiceManager_GetUserSettings_01".toLowerCase()
                )
            ) {
              dispatch(
                GetUserSettingsSuccess(
                  response.data.responseResult,
                  "API executed successfully."
                )
              );
            } else if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "Setting_SettingServiceManager_GetUserSettings_02".toLowerCase()
            ) {
              dispatch(
                GetUserSettingsFail("No user settings found for user ID")
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "Setting_SettingServiceManager_GetUserSettings_03".toLowerCase()
                )
            ) {
              dispatch(GetUserSettingsFail("Exception has been occurred."));
            }
          } else {
            dispatch(GetUserSettingsFail("Something went wrong"));
          }
        } else {
          dispatch(GetUserSettingsFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(GetUserSettingsFail("something went wrong"));
      });
  };
};

//Update User Settings

const UpdateUserSettingsInit = () => {
  return {
    type: actions.UPDATE_USER_SETTINGS_INIT,
  };
};

const UpdateUserSettingsSuccess = (response, message) => {
  return {
    type: actions.UPDATE_USER_SETTINGS_SUCCESS,
    response: response,
    message: message,
  };
};

const UpdateUserSettingsFail = (message) => {
  return {
    type: actions.UPDATE_USER_SETTINGS_FAIL,
    message: message,
  };
};

const UpdateUserSettingsAPI = (navigate, data, setSettingModalState) => {
  let token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(UpdateUserSettingsInit());
    let form = new FormData();
    form.append("RequestMethod", UpdateUserSettings.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    axios({
      method: "POST",
      url: settingsAPI,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(UpdateUserSettingsAPI(navigate, data, setSettingModalState));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "Setting_SettingServiceManager_UpdateUserSettings_01".toLowerCase()
            ) {
              dispatch(
                UpdateUserSettingsSuccess(
                  response.data.responseResult,
                  "API executed successfully."
                )
              );
              setSettingModalState(false);
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "Setting_SettingServiceManager_UpdateUserSettings_02".toLowerCase()
                )
            ) {
              dispatch(UpdateUserSettingsFail("Data is not updated"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "Setting_SettingServiceManager_UpdateUserSettings_03".toLowerCase()
                )
            ) {
              dispatch(UpdateUserSettingsFail("Invalid Input"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "Setting_SettingServiceManager_UpdateUserSettings_04".toLowerCase()
                )
            ) {
              dispatch(UpdateUserSettingsFail("Exception has been occurred."));
            }
          } else {
            dispatch(UpdateUserSettingsFail("Something went wrong"));
          }
        } else {
          dispatch(UpdateUserSettingsFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(UpdateUserSettingsFail("something went wrong"));
      });
  };
};

export { GetUserSettingsAPI, UpdateUserSettingsAPI };
