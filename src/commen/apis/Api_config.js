const authenticationLogIn = {
  RequestMethod: "ServiceManager.Login",
};

const authenticationSignUp = {
  RequestMethod: "ServiceManager.SignUp",
};

const authenticationRefreshToken = {
  RequestMethod: "ServiceManager.RefreshToken",
};

const getNewUserRequestsCounts = {
  RequestMethod: "ServiceManager.GetNewUserRequestsCount",
};

const getNewUserRequests = {
  RequestMethod: "ServiceManager.GetNewUserRequests",
};

const saveUserSecurityAdmin = {
  RequestMethod: "ServiceManager.SaveUser",
};

const editUserSecurityAdmin = {
  RequestMethod: "ServiceManager.EditUser",
};

const getAllUserList = {
  RequestMethod: "ServiceManager.GetAllUsersList",
};

const allUserRolesList = {
  RequestMethod: "ServiceManager.RoleList",
};

const getAllUserStatus = {
  RequestMethod: "ServiceManager.GetAllUserStatus",
};

const rejectUserRequestSecurityAdmin = {
  RequestMethod: "ServiceManager.RejectUserRequest",
};

const createAddBankUser = {
  RequestMethod: "ServiceManager.CreateBankUser",
};

//get all corporate in company dropdown
const getAllCorporates = {
  RequestMethod: "ServiceManager.GetAllCorporates",
};

// create Corporate User in securityAdmin
const createCorporateUserSecurityAdmin = {
  RequestMethod: "ServiceManager.CreateCorporateUser",
};

// create New Corporate in Security Admin
const createNewCorporateSecurityAdmin = {
  RequestMethod: "ServiceManager.CreateNewCorporate",
};

// get allCorporate Categories in ERM Auth
const getAllCorporateCategoriesERM = {
  RequestMethod: "ServiceManager.GetAllCorporateCategories",
};

// get All Nature of business API in ERM Auth
const getAllNatureBusinessERM = {
  RequestMethod: "ServiceManager.GetAllNatureOfBussiness",
};

// get All Asset Type API in ERM Auth
const getAllAssetsTypeERM = {
  RequestMethod: "ServiceManager.GetAllAssetTypes",
};

//BankUsersBulkList

const BankBulkUserList = {
  RequestMethod: "ServiceManager.BankUsersBulkList",
};

//GetAllCorporateUserList

const CorporateUserList = {
  RequestMethod: "ServiceManager.GetAllCorporateUsers",
};

// get All Bank Corporate By Bank ID Api
const getAllBankCorporate = {
  RequestMethod: "ServiceManager.GetAllCorporatesByBankID",
};

// for search coporate User API in system Admin
const searchCorporateUsersSysAdmin = {
  RequestMethod: "ServiceManager.SearchCorporateUsers",
};

// update corporate User Api
const updateCorporateApiSysAdmin = {
  RequestMethod: "ServiceManager.UpdateCorporateUser",
};

// get all Corporate Name By Bank ID
const getCorporateNameApi = {
  RequestMethod: "ServiceManager.GetAllCorporateNameByBankID",
};

// Add Nature of Business Api In Nature Business API
const addNatureBusiness = {
  RequestMethod: "ServiceManager.AddNatureOfBussiness",
};

//Update Nature of Business Api
const updateNatureOfBusiness = {
  RequestMethod: "ServiceManager.UpdateNatureOfBussiness",
};

//view Nature of businness pagination API
const viewNatureOfBusiness = {
  RequestMethod: "ServiceManager.ViewAllNatureOfBussiness",
};

//delete Nature of Business in Nature Business Page
const deleteNatureOfBusines = {
  RequestMethod: "ServiceManager.DeleteNatureOfBussiness",
};

// download report api for security admin
const downloadReportSecurityApi = {
  RequestMethod: "DownloadFile",
};

//download report api for security user Report access details Report
const downloadAccessReportApi = {
  RequestMethod: "DownloadAccessDetailsReport",
};

// downlaod statuswise report for security user report status wise
const downlaodStatusWiseReportApi = {
  RequestMethod: "DownloadStatusWiseReport",
};

// downlaod lastlogin report for security user report last Login
const downlaodLastLoginReportApi = {
  RequestMethod: "DownloadLastLoginReport",
};

//DOWNLOAD REPORTS FOR BANK USER LOGIN HISTORY REPORT
const downloadBankUserLoginHistory = {
  RequestMethod: "BankUsersLoginHistoryReportExcel",
};

export {
  authenticationLogIn,
  authenticationSignUp,
  authenticationRefreshToken,
  getNewUserRequestsCounts,
  getNewUserRequests,
  saveUserSecurityAdmin,
  editUserSecurityAdmin,
  getAllUserList,
  allUserRolesList,
  getAllUserStatus,
  createAddBankUser,
  rejectUserRequestSecurityAdmin,
  getAllCorporates,
  createCorporateUserSecurityAdmin,
  createNewCorporateSecurityAdmin,
  getAllCorporateCategoriesERM,
  getAllNatureBusinessERM,
  getAllAssetsTypeERM,
  BankBulkUserList,
  CorporateUserList,
  getAllBankCorporate,
  searchCorporateUsersSysAdmin,
  updateCorporateApiSysAdmin,
  getCorporateNameApi,
  addNatureBusiness,
  updateNatureOfBusiness,
  viewNatureOfBusiness,
  deleteNatureOfBusines,
  downloadReportSecurityApi,
  downloadAccessReportApi,
  downlaodStatusWiseReportApi,
  downlaodLastLoginReportApi,
  downloadBankUserLoginHistory,
};
