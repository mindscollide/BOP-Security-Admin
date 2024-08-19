import * as actions from "../action_types";

const initialState = {
  UserDetails: null,
  isLoggedIn: false,
  Loading: false,
  ResponseMessage: "",
  isSignUp: false,
  UserRoleList: [],
  UserStatus: [],
  allCorporates: [],
  getAllCategoryCorporate: [],
  natureOfBusiness: [],
  allAssetType: [],
  addNatureBusiness: "",
  updateNatureBusiness: "",
  viewNatureBusiness: [],
  deleteNatureBusiness: "",
  SessionExpeireResponseMessage: "",
  roles: [],
  Token: "",
  Refresh: "",
};

const authReducer = (state = initialState, action) => {
  console.log(action, "GET_ALL_CORPORATES_CATEGORY_SUCCESS");
  switch (action.type) {
    case actions.LOG_IN_INIT:
      return { ...state, Loading: true };

    case actions.LOG_IN_SUCCESS:
      console.log(action, "LOG_IN_SUCCESSLOG_IN_SUCCESS");
      return {
        ...state,
        UserDetails: action.response,
        ResponseMessage: action.message,
        Loading: false,
        Token: action.response.token,
        Refresh: action.response.refreshToken,
      };

    case actions.LOG_IN_FAIL:
      return {
        ...state,
        UserDetails: action.response,
        ResponseMessage: action.message,
        Loading: false,
        Token: "",
        Refresh: "",
      };

    case actions.SIGN_UP_INIT:
      return { ...state, Loading: true };

    case actions.SIGN_UP_SUCCESS:
      return {
        ...state,
        Loading: false,
        isLoggedIn: true,
        ResponseMessage: action.message,
      };

    case actions.SIGN_UP_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        Loading: false,
        ResponseMessage: action.message,
      };

    case actions.GET_ALL_USER_ROLE_LIST_INIT:
      return { ...state, Loading: true };

    case actions.GET_ALL_USER_ROLE_LIST_SUCCESS:
      return {
        ...state,
        Loading: false,
        UserRoleList: action.response,
        ResponseMessage: action.message,
      };

    case actions.GET_ALL_USER_ROLE_LIST_FAIL:
      return {
        ...state,
        Loading: false,
        UserRoleList: [],
        ResponseMessage: action.message,
      };

    case actions.GET_ALL_USER_STATUS_INIT:
      return {
        ...state,
        Loading: true,
      };

    case actions.GET_ALL_USER_STATUS_SUCCESS:
      return {
        ...state,
        Loading: false,
        UserStatus: action.response,
        ResponseMessage: action.message,
      };

    case actions.GET_ALL_USER_STATUS_FAIL:
      return {
        ...state,
        Loading: false,
        UserStatus: [],
        ResponseMessage: action.message,
      };

    case actions.GET_ALL_CORPORATES_INIT:
      return {
        ...state,
        Loading: true,
      };

    case actions.GET_ALL_CORPORATES_SUCCESS:
      return {
        ...state,
        Loading: false,
        allCorporates: action.response,
        ResponseMessage: action.message,
      };

    case actions.GET_ALL_CORPORATES_FAIL:
      return {
        ...state,
        Loading: false,
        allCorporates: [],
        ResponseMessage: action.message,
      };

    case actions.GET_ALL_CORPORATES_CATEGORY_INIT:
      return {
        ...state,
        Loading: true,
      };

    case actions.GET_ALL_CORPORATES_CATEGORY_SUCCESS:
      console.log(action, "GET_ALL_CORPORATES_CATEGORY_SUCCESS");
      return {
        ...state,
        Loading: false,
        getAllCategoryCorporate: action.response,
        ResponseMessage: action.message,
      };

    case actions.GET_ALL_CORPORATES_CATEGORY_FAIL:
      return {
        ...state,
        Loading: false,
        getAllCategoryCorporate: [],
        ResponseMessage: action.message,
      };

    case actions.GET_ALL_NATURE_BUSINESS_INIT:
      return {
        ...state,
        Loading: true,
      };

    case actions.GET_ALL_NATURE_BUSINESS_SUCCESS:
      console.log(action, "GET_ALL_NATURE_BUSINESS_SUCCESS");
      return {
        ...state,
        Loading: false,
        natureOfBusiness: action.response,
        ResponseMessage: action.message,
      };

    case actions.GET_ALL_NATURE_BUSINESS_FAIL:
      return {
        ...state,
        Loading: false,
        natureOfBusiness: [],
        ResponseMessage: action.message,
      };

    case actions.GET_ALL_ASSETS_TYPE_INIT:
      return {
        ...state,
        Loading: true,
      };

    case actions.GET_ALL_ASSETS_TYPE_SUCCESS:
      console.log(action, "GET_ALL_NATURE_BUSINESS_SUCCESS");
      return {
        ...state,
        Loading: false,
        allAssetType: action.response,
        ResponseMessage: action.message,
      };

    case actions.GET_ALL_ASSETS_TYPE_FAIL:
      return {
        ...state,
        Loading: false,
        allAssetType: [],
        ResponseMessage: action.message,
      };

    case actions.ADD_NATURE_OF_BUSINESS_INIT:
      return {
        ...state,
        Loading: true,
      };

    case actions.ADD_NATURE_OF_BUSINESS_SUCCESS:
      return {
        ...state,
        Loading: false,
        addNatureBusiness: action.response,
        ResponseMessage: action.message,
      };

    case actions.ADD_NATURE_OF_BUSINESS_FAIL:
      return {
        ...state,
        Loading: false,
        addNatureBusiness: "",
        ResponseMessage: action.message,
      };

    case actions.UPDATE_NATURE_OF_BUSINESS_INIT:
      return {
        ...state,
        Loading: true,
      };

    case actions.UPDATE_NATURE_OF_BUSINESS_SUCCESS:
      return {
        ...state,
        Loading: false,
        updateNatureBusiness: action.response,
        ResponseMessage: action.message,
      };

    case actions.UPDATE_NATURE_OF_BUSINESS_FAIL:
      return {
        ...state,
        Loading: false,
        updateNatureBusiness: "",
        ResponseMessage: action.message,
      };

    case actions.VIEW_NATURE_BUSINESS_INIT:
      return {
        ...state,
        Loading: true,
        Spinner: true,
      };

    case actions.VIEW_NATURE_BUSINESS_SUCCESS:
      return {
        ...state,
        Loading: false,
        Spinner: false,
        viewNatureBusiness: action.response,
        ResponseMessage: action.message,
      };

    case actions.VIEW_NATURE_BUSINESS_FAIL:
      return {
        ...state,
        Loading: false,
        Spinner: false,
        viewNatureBusiness: [],
        ResponseMessage: action.message,
      };

    case actions.DELETE_NATURE_BUSINESS_INIT:
      return {
        ...state,
        Loading: true,
      };

    case actions.DELETE_NATURE_BUSINESS_SUCCESS:
      return {
        ...state,
        Loading: false,
        deleteNatureBusiness: action.response,
        ResponseMessage: action.message,
      };

    case actions.DELETE_NATURE_BUSINESS_FAIL:
      return {
        ...state,
        Loading: false,
        deleteNatureBusiness: "",
        ResponseMessage: action.message,
      };

    case actions.SIGN_OUT:
      localStorage.clear();
      return {
        ...state,
        UserDetails: null,
        isLoggedIn: false,
        Loading: false,
        Token: "",
        Refresh: "",
        SessionExpeireResponseMessage: action.message,
      };
    default:
      return { ...state };
  }
};

export default authReducer;
