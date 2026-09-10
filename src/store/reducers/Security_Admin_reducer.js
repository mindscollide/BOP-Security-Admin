import * as actions from "../action_types";

const initialState = {
  Spinner: false,
  ResponseMessage: "",
  GetNewBankUserRequestsData: null,
  GetNewCorporateUserRequestsData: null,
  rejectUserRequest: "",
  getAllUsersList: null,
  SearchCorporateUsersData: null,
  SearchBankUsersData: null,
  SaveBankUserData: null,
  SaveCorporateUserData: null,
  UpdateBankUser: null,
  UpdateCorporateUser: null,
  Loading: false,
};

const securityReducer = (state = initialState, action) => {
  switch (action.type) {
    // User Count State
    case actions.SAVE_BANK_USER_INIT:
      return { ...state, Loading: true };

    case actions.SAVE_BANK_USER_SUCCESS:
      return {
        ...state,
        Loading: false,
        SaveBankUserData: action.response,
        ResponseMessage: action.message,
      };
    case actions.SAVE_BANK_USER_FAIL:
      return {
        ...state,
        Loading: false,
        SaveBankUserData: null,
        ResponseMessage: action.message,
      };

    case actions.GET_NEW_BANK_USER_REQUESTS_INIT:
      return { ...state, Loading: true };

    case actions.GET_NEW_BANK_USER_REQUESTS_SUCCESS:
      return {
        ...state,
        Loading: false,
        GetNewBankUserRequestsData: action.response,
        ResponseMessage: action.message,
      };
    case actions.GET_NEW_BANK_USER_REQUESTS_FAIL:
      return {
        ...state,
        Loading: false,
        GetNewBankUserRequestsData: null,
        ResponseMessage: action.message,
      };
    case actions.GET_NEW_CORPORATE_USER_REQUESTS_INIT:
      return { ...state, Loading: true };

    case actions.GET_NEW_CORPORATE_USER_REQUESTS_SUCCESS:
      return {
        ...state,
        Loading: false,
        GetNewCorporateUserRequestsData: action.response,
        ResponseMessage: action.message,
      };
    case actions.GET_NEW_CORPORATE_USER_REQUESTS_FAIL:
      return {
        ...state,
        Loading: false,
        GetNewCorporateUserRequestsData: null,
        ResponseMessage: action.message,
      };
    case actions.SAVE_CORPORATE_USER_INIT:
      return { ...state, Loading: true };
    case actions.SAVE_CORPORATE_USER_SUCCESS:
      return {
        ...state,
        Loading: false,
        saveCorporateUserData: action.response,
        ResponseMessage: action.message,
      };
    case actions.SAVE_CORPORATE_USER_FAIL:
      return {
        ...state,
        Loading: false,
        saveCorporateUserData: null,
        ResponseMessage: action.message,
      };

    case actions.REJECT_USER_REQUEST_INIT:
      return { ...state, Loading: true };

    case actions.REJECT_USER_REQUEST_SUCCESS:
      return {
        ...state,
        Loading: false,
        rejectUserRequest: action.response,
        ResponseMessage: action.message,
      };

    case actions.REJECT_USER_REQUEST_FAIL:
      return {
        ...state,
        Loading: false,
        rejectUserRequest: null,
        ResponseMessage: action.message,
      };

    case actions.GET_ALL_USERS_LIST_INIT:
      return {
        ...state,
        Loading: true,
      };

    case actions.GET_ALL_USERS_LIST_SUCCESS:
      return {
        ...state,
        Loading: false,
        getAllUsersList: action.response,
        ResponseMessage: action.message,
      };

    case actions.GET_ALL_USERS_LIST_FAIL:
      return {
        ...state,
        Loading: false,
        getAllUsersList: null,
        ResponseMessage: action.message,
      };
    //Search Corporate Users
    case actions.SEARCH_CORPORATE_USERS_INIT:
      return {
        ...state,
        Loading: true,
      };
    case actions.SEARCH_CORPORATE_USERS_SUCCESS:
      return {
        ...state,
        Loading: false,
        SearchCorporateUsersData: action.response,
        ResponseMessage: action.message,
      };
    case actions.SEARCH_CORPORATE_USERS_FAIL:
      return {
        ...state,
        Loading: false,
        SearchCorporateUsersData: null,
        ResponseMessage: action.message,
      };
    //Search Bank Users
    case actions.SEARCH_BANK_USERS_INIT:
      return {
        ...state,
        Loading: true,
      };
    case actions.SEARCH_BANK_USERS_SUCCESS:
      return {
        ...state,
        Loading: false,
        SearchBankUsersData: action.response,
        ResponseMessage: action.message,
      };
    case actions.SEARCH_BANK_USERS_FAIL:
      return {
        ...state,
        Loading: false,
        SearchBankUsersData: null,
        ResponseMessage: action.message,
      };

    //Update Bank User Reducer
    case actions.UPDATE_BANK_USER_INIT:
      return {
        ...state,
        Loading: true,
      };
    case actions.UPDATE_BANK_USER_SUCCESS:
      return {
        ...state,
        Loading: false,
        UpdateBankUser: action.response,
        ResponseMessage: action.message,
      };
    case actions.UPDATE_BANK_USER_FAIL:
      return {
        ...state,
        Loading: false,
        UpdateBankUser: null,
        ResponseMessage: action.message,
      };

    //Update Corporate User Reducer
    case actions.UPDATE_CORPORATE_USER_INIT:
      return {
        ...state,
        Loading: true,
      };
    case actions.UPDATE_CORPORATE_USER_SUCCESS:
      return {
        ...state,
        Loading: false,
        UpdateCorporateUser: action.response,
        ResponseMessage: action.message,
      };
    case actions.UPDATE_CORPORATE_USER_FAIL:
      return {
        ...state,
        Loading: false,
        UpdateCorporateUser: null,
        ResponseMessage: action.message,
      };
    case actions.CLEARE_MESSAGE:
      return {
        ...state,
        ResponseMessage: "",
      };
    default:
      return { ...state };
  }
};

export default securityReducer;
