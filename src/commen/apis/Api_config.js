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
const SearchCorporateUsersRM = {
  RequestMethod: "ServiceManager.SearchCorporateUsers",
};
//Search Bank Users
const SearchBankUsersRM = {
  RequestMethod: "ServiceManager.SearchBankUsers",
};

//Get All User Status
const GetAllUserStatus = {
  RequestMethod: "ServiceManager.GetAllUserStatus",
};

const RoleList = {
  RequestMethod: "ServiceManager.RoleList",
};

const GetBankUserRoles = {
  RequestMethod: "ServiceManager.GetBankUserRoles",
};

//Get all Branches
const GetAllBranches = {
  RequestMethod: "ServiceManager.GetAllBranches",
};

//Update Bank User
const UpdateBankUser = {
  RequestMethod: "ServiceManager.UpdateBankUser",
};

//Update Corporate User
const UpdateCorporateUser = {
  RequestMethod: "ServiceManager.UpdateCorporateUser",
};
const GetUserSettings = {
  RequestMethod: "ServiceManager.GetUserSettings",
};

const UpdateUserSettings = {
  RequestMethod: "ServiceManager.UpdateUserSettings",
};

const LogOut = {
  RequestMethod: "ServiceManager.LogOut",
};

// Bank User Report
const bankUserReport = {
  RequestMethod: "ServiceManager.DownloadBankUserReport",
};

const CorporateUserReport = {
  RequestMethod: "ServiceManager.DownloadCorporateUserReport",
};

const SecurityAdminUserLoginHistoryReport = {
  RequestMethod: "ServiceManager.DownloadUserLoginHistorySecurityAdminReport",
};

const SecurityAdminAccessDetailReport = {
  RequestMethod: "ServiceManager.DownloadUserAccessDetailSecurityAdminReport",
};

const SecurityAdminLastLoggedInReport = {
  RequestMethod: "ServiceManager.DownloadUserLastloggedInSecurityAdminReport",
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
  SearchCorporateUsersRM,
  SearchBankUsersRM,
  GetAllUserStatus,
  RoleList,
  GetBankUserRoles,
  GetAllBranches,
  UpdateBankUser,
  UpdateCorporateUser,
  GetUserSettings,
  UpdateUserSettings,
  LogOut,
  bankUserReport,
  CorporateUserReport,
  SecurityAdminUserLoginHistoryReport,
  SecurityAdminAccessDetailReport,
  SecurityAdminLastLoggedInReport,
};
