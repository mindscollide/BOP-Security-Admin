import * as actions from "../action_types";
import axios from "axios";
import { securityAdminApi } from "../../commen/apis/Api_ends_points";
import { RefreshToken } from "./Auth_Actions";
import { BankBulkUserList } from "../../commen/apis/Api_config";

const bulkFileUpload = () => {
  return {
    type: actions.Get_ALL_BULK_USER_INIT,
  };
};

const bulFileUploadSuccess = (response, message) => {
  return {
    type: actions.GET_AL_BULK_USER_SUCCESS,
    response: response,
    message: message,
  };
};

const bulkFileUploadFail = (message) => {
  return {
    type: actions.GET_ALL_BULK_USER_FAIL,
    message: message,
  };
};

const ResetAllFileBulkUpload = () => {
  return {
    type: actions.RESET_ALL_FILES_UPLOAD,
    response: [],
  };
};

const FileBulkUpload = (navigate, data, setUploadModal, setCustomerUpload) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let form = new FormData();
  form.append("RequestMethod", BankBulkUserList.RequestMethod);
  form.append("RequestData", JSON.stringify(data));
  form.append("File", data);

  return async (dispatch) => {
    dispatch(bulkFileUpload());
    await axios({
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
          dispatch(FileBulkUpload(navigate, data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_BankUsersBulkList_01".toLowerCase()
                )
            ) {
              dispatch(
                bulkFileUploadFail(response.data.responseResult, "Invalid File")
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_BankUsersBulkList_02".toLowerCase()
                )
            ) {
              await dispatch(
                bulFileUploadSuccess(
                  response.data.responseResult,
                  "File Uploaded Successfully"
                )
              );
              setUploadModal(true);
              setCustomerUpload(true);
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_BankUsersBulkList_03".toLowerCase()
                )
            ) {
              await dispatch(bulkFileUploadFail("Invalid Request Data"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_BankUsersBulkList_04".toLowerCase()
                )
            ) {
              await dispatch(bulkFileUploadFail("not a valid role"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_BankUsersBulkList_05".toLowerCase()
                )
            ) {
              await dispatch(bulkFileUploadFail("Something went wrong"));
            } else {
              await dispatch(bulkFileUploadFail("Something went wrong"));
            }
          } else {
            await dispatch(bulkFileUploadFail("Something went wrong"));
          }
        } else {
          await dispatch(bulkFileUploadFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(bulkFileUploadFail("Something went wrong"));
      });
  };
};

export { FileBulkUpload };
