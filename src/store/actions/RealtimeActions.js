// actions.js
import * as types from "../action_types";

// -- Individual action dispatchers --

export const setBankUserRequest = (payload) => ({
  type: types.BANK_USER_REQUEST,
  payload,
});

export const setCorporateUserRequest = (payload) => ({
  type: types.CORPORATE_USER_REQUEST,
  payload,
});

export const setBankUserCreated = (payload) => ({
  type: types.BANK_USER_CREATED,
  payload,
});

export const setCorporateUserCreated = (payload) => ({
  type: types.CORPORATE_USER_CREATED,
  payload,
});

export const setCorpUserRequestRejected = (payload) => ({
  type: types.CORP_USER_REQUEST_REJECTED,
  payload,
});

export const setBankUserRequestRejected = (payload) => ({
  type: types.BANK_USER_REQUEST_REJECTED,
  payload,
});

export const setCorpUserRoleStatusChange = (payload) => ({
  type: types.CORP_USER_ROLE_STATUS_CHANGE,
  payload,
});

export const setBankUserRoleStatusChange = (payload) => ({
  type: types.BANK_USER_ROLE_STATUS_CHANGE,
  payload,
});

export const setBranchCreated = (payload) => ({
  type: types.BRANCH_CREATED,
  payload,
});

export const setBranchUpdated = (payload) => ({
  type: types.BRANCH_UPDATED,
  payload,
});

export const setCorporateCreated = (payload) => ({
  type: types.CORPORATE_CREATED,
  payload,
});

export const setCorporateUpdated = (payload) => ({
  type: types.CORPORATE_UPDATED,
  payload,
});

export const setBankUserUpdated = (payload) => ({
  type: types.BANK_USER_UPDATED,
  payload,
});

export const setCorporateUserUpdated = (payload) => ({
  type: types.CORPORATE_USER_UPDATED,
  payload,
});

export const setCorporateUserBulkRequest = (payload) => ({
  type: types.CORPORATE_USER_BULK_REQUEST,
  payload,
});

export const setBankUserBulkRequest = (payload) => ({
  type: types.BANK_USER_BULK_REQUEST,
  payload,
});
