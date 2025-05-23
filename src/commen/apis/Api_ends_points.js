// our base url or machine api
const baseURL = "http://192.168.18.241";

// our service URLs
const authenticationPort = ":13000/ERM_Auth";
const securityAdmintPort = ":13007/SecurityAdmin";
const systemAdminPort = ":12003/SystemAdmin";
const downloadReportPort = ":12004/ExcelReport";
const settingsPort = ":13008/Setting";

//our Final Api
const authenticationAPI = baseURL + authenticationPort;
const securityAdminApi = baseURL + securityAdmintPort;
const systemAdminApi = baseURL + systemAdminPort;
const downloadReportApi = baseURL + downloadReportPort;
const settingsAPI = baseURL + settingsPort;

export {
  authenticationAPI,
  securityAdminApi,
  systemAdminApi,
  downloadReportApi,
  settingsAPI,
};
