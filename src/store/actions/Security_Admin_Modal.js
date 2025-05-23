import * as actions from "../action_types";

const ConfirmationModalSecurityAdmin = (response, message) => {
  return {
    type: actions.CONFIRMATION_MODAL,
    response: response,
    message: message,
  };
};
export { ConfirmationModalSecurityAdmin };
