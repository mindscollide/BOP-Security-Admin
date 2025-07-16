// reducer.js
import * as types from "../action_types";

const initialState = {
  bankUserRequest: null,
  corporateUserRequest: null,
  bankUserCreated: null,
  corporateUserCreated: null,
  corpUserRejected: null,
  bankUserRejected: null,
  corpUserRoleStatusChange: null,
  bankUserRoleStatusChange: null,
  branchCreated: null,
  branchUpdated: null,
  corporateCreated: null,
  corporateUpdated: null,
  bankUserUpdated: null,
  corporateUserUpdated: null,
  corporateUserBulkUpload: null,
  bankUserBulkUpload: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.BANK_USER_REQUEST:
      return { ...state, bankUserRequest: action.payload };
    case types.CORPORATE_USER_REQUEST:
      return { ...state, corporateUserRequest: action.payload };
    case types.BANK_USER_CREATED:
      return { ...state, bankUserCreated: action.payload };
    case types.CORPORATE_USER_CREATED:
      return { ...state, corporateUserCreated: action.payload };
    case types.CORP_USER_REQUEST_REJECTED:
      return { ...state, corpUserRejected: action.payload };
    case types.BANK_USER_REQUEST_REJECTED:
      return { ...state, bankUserRejected: action.payload };
    case types.CORP_USER_ROLE_STATUS_CHANGE:
      return { ...state, corpUserRoleStatusChange: action.payload };
    case types.BANK_USER_ROLE_STATUS_CHANGE:
      return { ...state, bankUserRoleStatusChange: action.payload };
    case types.BRANCH_CREATED:
      return { ...state, branchCreated: action.payload };
    case types.BRANCH_UPDATED:
      return { ...state, branchUpdated: action.payload };
    case types.CORPORATE_CREATED:
      return { ...state, corporateCreated: action.payload };
    case types.CORPORATE_UPDATED:
      return { ...state, corporateUpdated: action.payload };
    case types.BANK_USER_UPDATED:
      return { ...state, bankUserUpdated: action.payload };
    case types.CORPORATE_USER_UPDATED:
      return { ...state, corporateUserUpdated: action.payload };
    case types.CORPORATE_USER_BULK_REQUEST:
      return { ...state, corporateUserBulkUpload: action.payload };
    case types.BANK_USER_BULK_REQUEST:
      return { ...state, bankUserBulkUpload: action.payload };
    default:
      return state;
  }
};

export default userReducer;
