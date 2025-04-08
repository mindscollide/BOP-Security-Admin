import * as actions from "../action_types";

const initialState = {
  confirmationModal: false,
};
const BOPSecurityAdminModal = (state = initialState, action) => {
  switch (action.type) {
    case actions.CONFIRMATION_MODAL: {
      return {
        ...state,
        confirmationModal: action.response,
      };
    }
    default:
      return { ...state };
  }
};

export default BOPSecurityAdminModal;
