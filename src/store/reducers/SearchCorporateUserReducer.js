import * as actions from "../action_types";

const initialState = {
  Loading: false,
  ResponseMessage: "",
  SearchCorporateUser: [],
};

const SearchReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SEARCH_CORPORATE_USER_INIT:
      return { ...state, Loading: true };

    case actions.SEARCH_CORPORATE_USER_FAIL:
      console.log("action", action);
      return {
        ...state,
        ResponseMessage: action.message,
        Loading: false,
      };

    case actions.SEARCH_CORPORATE_USER_SUCCESS:
      console.log(action, "actionasad");
      return {
        ...state,
        Loading: false,
        SearchCorporateUser: action.response,
        ResponseMessage: action.message,
      };

    default:
      return { ...state };
  }
};

export default SearchReducer;
