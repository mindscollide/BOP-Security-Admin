import * as actions from "../action_types";

const initialState = {
  Loading: false,
  ResponseMessage: "",
  GetAllCorporateUser: [],
};

const CorporateReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_ALL_CORPORATE_USERS_INIT:
      return { ...state, Loading: true };

    case actions.GET_ALL_CORPORATE_USERS_FAIL:
      console.log("action", action);
      return {
        ...state,
        ResponseMessage: action.message,
        Loading: false,
      };

    case actions.GET_ALL_CORPORATE_USERS_SUCCESS:
      console.log(action, "actionasad");
      return {
        ...state,
        Loading: false,
        GetAllCorporateUser: action.response,
        ResponseMessage: action.message,
      };

    default:
      return { ...state };
  }
};

export default CorporateReducer;
