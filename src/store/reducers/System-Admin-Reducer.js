import * as actions from "../action_types";

const initialState = {
  Loading: false,
  Spinner: false,
  ResponseMessage: "",
  bankCorporates: [],
  searchCorporate: [],
  updateCorporateResponse: [],
  corporateNameByBankId: [],
};

const systemReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_ALL_BANK_CORPORATE_INIT:
      return {
        ...state,
        Loading: true,
        Spinner: true,
      };

    case actions.GET_ALL_BANK_CORPORATE_SUCCESS:
      return {
        ...state,
        Loading: false,
        Spinner: false,
        bankCorporates: action.response,
        ResponseMessage: action.message,
      };

    case actions.GET_ALL_BANK_CORPORATE_FAIL:
      return {
        ...state,
        Loading: false,
        Spinner: false,
        bankCorporates: [],
        ResponseMessage: action.message,
      };

    case actions.SEARCH_CORPORATE_USER_INIT:
      return {
        ...state,
        Loading: true,
        Spinner: true,
      };

    case actions.SEARCH_CORPORATE_USER_SUCCESS:
      return {
        ...state,
        Loading: false,
        Spinner: false,
        searchCorporate: action.response,
        ResponseMessage: action.message,
      };

    case actions.SEARCH_CORPORATE_USER_FAIL:
      return {
        ...state,
        Loading: false,
        Spinner: false,
        searchCorporate: [],
        ResponseMessage: action.message,
      };

    case actions.UPDATE_CORPORATE_USER_INIT:
      return {
        ...state,
        Loading: true,
      };

    case actions.UPDATE_CORPORATE_USER_SUCCESS:
      return {
        ...state,
        Loading: false,
        updateCorporateResponse: action.response,
        ResponseMessage: action.message,
      };

    case actions.UPDATE_CORPORATE_USER_FAIL:
      return {
        ...state,
        Loading: false,
        updateCorporateResponse: "",
        ResponseMessage: action.message,
      };

    case actions.GET_ALL_CORPORATE_NAME_BY_BANK_INIT:
      return {
        ...state,
        Loading: true,
        Spinner: true,
      };

    case actions.GET_ALL_CORPORATE_NAME_BY_BANK_SUCCESS:
      return {
        ...state,
        Loading: false,
        Spinner: false,
        corporateNameByBankId: action.response,
        ResponseMessage: action.message,
      };

    case actions.GET_ALL_CORPORATE_NAME_BY_BANK_FAIL:
      return {
        ...state,
        Loading: false,
        Spinner: false,
        corporateNameByBankId: [],
        ResponseMessage: action.message,
      };

    default:
      return { ...state };
  }
};

export default systemReducer;
