const authenticationRefreshToken = {
  RequestMethod: "ServiceManager.RefreshToken",
};
const authenticationLogIn = {
  RequestMethod: "ServiceManager.Login",
};

const emailSentResetPassword = {
  RequestMethod: "ServiceManager.SendEmailForResetPasword",
};

const SaveBankUser = {
  RequestMethod: "ServiceManager.SaveBankUser",
};

const SaveCorporateUser = {
  RequestMethod: "ServiceManager.SaveCorporateUser",
};

const GetNewBankUserRequests = {
  RequestMethod: "ServiceManager.GetNewBankUserRequests",
};

const GetNewCorporateUserRequests = {
  RequestMethod: "ServiceManager.GetNewCorporateUserRequests",
};

const RejectUserRequest = {
  RequestMethod: "ServiceManager.RejectUserRequest",
};

const getAllUsersListApi = {
  RequestMethod: "ServiceManager.GetAllUsersList",
};

//Search Corporate Users
const SearchCorporateUsers = {
  RequestMethod: "ServiceManager.SearchCorporateUsers",
};
//Search Bank Users
const SearchBankUsers = {
  RequestMethod: "ServiceManager.SearchBankUsers",
};

//Get All User Status
const GetAllUserStatus = {
  RequestMethod: "ServiceManager.GetAllUserStatus",
};

const RoleList = {
  RequestMethod: "ServiceManager.RoleList",
};

export {
  authenticationRefreshToken,
  authenticationLogIn,
  emailSentResetPassword,
  SaveBankUser,
  SaveCorporateUser,
  GetNewBankUserRequests,
  GetNewCorporateUserRequests,
  RejectUserRequest,
  getAllUsersListApi,
  SearchCorporateUsers,
  SearchBankUsers,
  GetAllUserStatus,
  RoleList,
};
