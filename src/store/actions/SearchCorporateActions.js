import * as actions from "../action_types";
import axios from "axios";
import { RefreshToken } from "./Auth_Actions";
import { SearchApiCorporate } from "../../commen/apis/Api_config";
import { SystemAdminApi } from "../../commen/apis/Api_ends_points";
import { getAllCorporateApi } from "./CorporateActions";

const searchcorporateuserinit = () => {
  return {
    type: actions.SEARCH_CORPORATE_USER_INIT,
  };
};

const searchcorporateusersuccess = (response, message) => {
  return {
    type: actions.SEARCH_CORPORATE_USER_SUCCESS,
    response: response,
    message: message,
  };
};

const searchcorporatefailed = (message) => {
  return {
    type: actions.SEARCH_CORPORATE_USER_FAIL,
    message: message,
  };
};

// const searchCorporateUsers = (navigate, searchData) => {
//   let token = JSON.parse(localStorage.getItem("token"));

//   return async (dispatch) => {
//     dispatch(searchcorporateuserinit());
//     let form = new FormData();
//     form.append("RequestMethod", SearchApiCorporate.RequestMethod);
//     form.append("RequestData", JSON.stringify(searchData));
//     await axios({
//       method: "post",
//       url: SystemAdminApi,
//       data: form,
//       headers: {
//         _token: token,
//       },
//     })
//       .then(async (response) => {
//         if (response.data.responseCode === 417) {
//           await dispatch(RefreshToken(navigate));
//           dispatch(searchCorporateUsers(navigate, searchData));
//         } else if (response.data.responseCode === 200) {
//           if (response.data.responseResult.isExecuted === true) {
//             if (
//               response.data.responseResult.responseMessage
//                 .toLowerCase()
//                 .includes(
//                   "SystemAdmin_SystemAdminManager_SearchCorporateUsers_01".toLowerCase()
//                 )
//             ) {
//               dispatch(
//                 searchcorporateusersuccess(
//                   response.data.responseResult.corporateUsers,
//                   "Record Found"
//                 )
//               );
//             } else if (
//               response.data.responseResult.responseMessage
//                 .toLowerCase()
//                 .includes(
//                   "SystemAdmin_SystemAdminManager_SearchCorporateUsers_02".toLowerCase()
//                 )
//             ) {
//               dispatch(searchcorporatefailed("No Record found"));
//             } else if (
//               response.data.responseResult.responseMessage
//                 .toLowerCase()
//                 .includes(
//                   "SystemAdmin_SystemAdminManager_SearchCorporateUsers_03".toLowerCase()
//                 )
//             ) {
//               dispatch(searchcorporatefailed("Invalid Role"));
//             } else if (
//               response.data.responseResult.responseMessage
//                 .toLowerCase()
//                 .includes(
//                   "SystemAdmin_SystemAdminManager_SearchCorporateUsers_04".toLowerCase()
//                 )
//             ) {
//               dispatch(
//                 searchcorporatefailed("Exception No Corporate Customer Found")
//               );
//             }
//           } else {
//             dispatch(searchcorporatefailed("Something went wrong"));
//           }
//         } else {
//           dispatch(searchcorporatefailed("Something went wrong"));
//         }
//       })
//       .catch((response) => {
//         dispatch(searchcorporatefailed("Something went wrong"));
//       });
//   };
// };

// export { searchCorporateUsers };
