import * as actions from "../action_types";
import axios from "axios";
import { RefreshToken } from "./Auth_Actions";
import { CorporateUserList } from "../../commen/apis/Api_config";
import { SystemAdminApi } from "../../commen/apis/Api_ends_points";

const corporateuserinit = () => {
  return {
    type: actions.GET_ALL_CORPORATE_USERS_INIT,
  };
};

const corporateusersuccess = (response, message) => {
  return {
    type: actions.GET_ALL_CORPORATE_USERS_SUCCESS,
    response: response,
    message: message,
  };
};

const corporateuserfailed = (message) => {
  return {
    type: actions.GET_ALL_CORPORATE_USERS_FAIL,
    message: message,
  };
};

const getAllCorporateApi = (navigate, newCorporateData) => {
  let token = JSON.parse(localStorage.getItem("token"));

  return async (dispatch) => {
    dispatch(corporateuserinit());
    let form = new FormData();
    form.append("RequestMethod", CorporateUserList.RequestMethod);
    form.append("RequestData", JSON.stringify(newCorporateData));
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
          dispatch(getAllCorporateApi(navigate, newCorporateData));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_GetAllCorporateUsers_01".toLowerCase()
                )
            ) {
              dispatch(
                corporateusersuccess(
                  response.data.responseResult.corporateUsers,
                  "Record Found"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_GetAllCorporateUsers_02".toLowerCase()
                )
            ) {
              dispatch(corporateuserfailed("No Record found"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_GetAllCorporateUsers_03".toLowerCase()
                )
            ) {
              dispatch(corporateuserfailed("Invalid Role"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_GetAllCorporateUsers_04".toLowerCase()
                )
            ) {
              dispatch(
                corporateuserfailed("Exception No Corporate Customer Found")
              );
            }
          } else {
            dispatch(corporateuserfailed("Something went wrong"));
          }
        } else {
          dispatch(corporateuserfailed("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(corporateuserfailed("Something went wrong"));
      });
  };
};

export { getAllCorporateApi };
