import * as actions from "../action_types";
import axios from "axios";
import {
  GetMarketTimeSettings,
  GetUserSettings,
  SaveMarketTimeSettings,
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

//Get Market Time Settings
const GetMarketTimeSettingsInit = () => {
  return {
    type: actions.GET_MARKET_TIME_SETTINGS_INIT,
  };
};

const GetMarketTimeSettingsSuccess = (response, message) => {
  console.log(response);
  return {
    type: actions.GET_MARKET_TIME_SETTINGS_SUCCESS,
    response: response,
    message: message,
  };
};

const GetMarketTimeSettingsFail = (message) => {
  return {
    type: actions.GET_MARKET_TIME_SETTINGS_FAIL,
    message: message,
  };
};

const GetMarketTimeSettingsAPI = (navigate) => {
  let token = localStorage.getItem("token");
  return async (dispatch) => {
    dispatch(GetMarketTimeSettingsInit());

    let form = new FormData();
    form.append("RequestMethod", GetMarketTimeSettings.RequestMethod);
    axios({
      method: "POST",
      url: settingsAPI,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data?.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(GetMarketTimeSettingsAPI(navigate));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "Setting_SettingServiceManager_GetMarketTimerSettings_01".toLowerCase()
                )
            ) {
              dispatch(
                GetMarketTimeSettingsSuccess(
                  response.data.responseResult,
                  "API executed successfully."
                )
              );
            } else if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "Setting_SettingServiceManager_GetMarketTimerSettings_02".toLowerCase()
            ) {
              dispatch(GetMarketTimeSettingsFail("No Settings Found."));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "Setting_SettingServiceManager_GetMarketTimeSettings_03".toLowerCase()
                )
            ) {
              dispatch(
                GetMarketTimeSettingsFail("RequestingRoleID Not Matched.")
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "Setting_SettingServiceManager_GetMarketTimerSettings_04".toLowerCase()
                )
            ) {
              dispatch(
                GetMarketTimeSettingsFail("Exception has been occurred.")
              );
            }
          } else {
            dispatch(GetMarketTimeSettingsFail("Something went wrong"));
          }
        } else {
          dispatch(GetMarketTimeSettingsFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(GetMarketTimeSettingsFail("Something went wrong"));
      });
  };
};

//Save Market Time Settings
const SaveMarketTimeSettingsInit = () => {
  return {
    type: actions.SAVE_MARKET_TIME_SETTINGS_INIT,
  };
};

const SaveMarketTimeSettingsSuccess = (response, message) => {
  return {
    type: actions.SAVE_MARKET_TIME_SETTINGS_SECCESS,
    response: response,
    message: message,
  };
};

const SaveMarketTimeSettingsFail = (message) => {
  return {
    type: actions.SAVE_MARKET_TIME_SETTINGS_FAIL,
    message: message,
  };
};

const SaveMarketTimeSettingsAPI = (navigate, data, setSettingModalState) => {
  let token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(SaveMarketTimeSettingsInit());
    let form = new FormData();
    form.append("RequestMethod", SaveMarketTimeSettings.RequestMethod);
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
          dispatch(
            SaveMarketTimeSettingsAPI(navigate, data, setSettingModalState)
          );
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "Setting_SettingServiceManager_SaveMarketTimeSettings_01".toLowerCase()
            ) {
              dispatch(
                SaveMarketTimeSettingsSuccess(
                  response.data.responseResult,
                  "API executed successfully."
                )
              );
              setSettingModalState(false);
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "Setting_SettingServiceManager_SaveMarketTimeSettings_02".toLowerCase()
                )
            ) {
              dispatch(SaveMarketTimeSettingsFail("Data is not updated"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "Setting_SettingServiceManager_SaveMarketTimeSettings_03".toLowerCase()
                )
            ) {
              dispatch(SaveMarketTimeSettingsFail("Invalid Input"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "Setting_SettingServiceManager_SaveMarketTimeSettings_04".toLowerCase()
                )
            ) {
              dispatch(
                SaveMarketTimeSettingsFail("RequestingRoleID Not Matched.")
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "Setting_SettingServiceManager_SaveMarketTimeSettings_05".toLowerCase()
                )
            ) {
              dispatch(
                SaveMarketTimeSettingsFail("Exception has been occurred.")
              );
            }
          } else {
            dispatch(SaveMarketTimeSettingsFail("Something went wrong"));
          }
        } else {
          dispatch(SaveMarketTimeSettingsFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(SaveMarketTimeSettingsFail("something went wrong"));
      });
  };
};
export {
  GetUserSettingsAPI,
  UpdateUserSettingsAPI,
  GetMarketTimeSettingsAPI,
  SaveMarketTimeSettingsAPI,
};
