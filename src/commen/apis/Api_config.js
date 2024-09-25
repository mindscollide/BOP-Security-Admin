const authenticationLogIn = {
  RequestMethod: "ServiceManager.Login",
};

const emailSentResetPassword = {
  RequestMethod: "ServiceManager.SendEmailForResetPasword",
};

const saveBankUserApi = {
  RequestMethod: "ServiceManager.SaveBankUser",
};

const saveCorporateUserApi = {
  RequestMethod: "ServiceManager.SaveCorporateUser",
};

const getNewBankUserRequestApi = {
  RequestMethod: "ServiceManager.GetNewBankUserRequests",
};

const getNewCorporateUserRequestApi = {
  RequestMethod: "ServiceManager.GetNewCorporateUserRequest",
};

const rejectUserRequestApi = {
  RequestMethod: "ServiceManager.RejectUserRequest",
};

export {
  authenticationLogIn,
  emailSentResetPassword,
  saveBankUserApi,
  saveCorporateUserApi,
  getNewBankUserRequestApi,
  getNewCorporateUserRequestApi,
  rejectUserRequestApi,
};
