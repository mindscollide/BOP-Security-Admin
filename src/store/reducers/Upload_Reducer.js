import * as actions from "../action_types";

const initialState = {
  Loading: false,
  ResponseMessage: "",
  uploadBulkDocumentList: null,
};

const uploadReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.Get_ALL_BULK_USER_INIT:
      return { ...state, Loading: true };

    case actions.GET_ALL_BULK_USER_FAIL:
      console.log("action", action);
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.message,
      };

    case actions.GET_AL_BULK_USER_SUCCESS:
      console.log(action, "actionasad");
      return {
        ...state,
        Loading: false,
        uploadDocumentsList: action.response,
        ResponseMessage: action.message,
      };

    case actions.RESET_ALL_FILES_UPLOAD:
      console.log("uploadedFile", action);
      return {
        ...state,
        Loading: false,
        ResponseMessage: "",
        uploadDocumentsList: [],
      };

    default:
      return { ...state };
  }
};
export default uploadReducer;
