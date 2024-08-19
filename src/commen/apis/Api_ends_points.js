// our base url or machine api
const baseURL = "http://192.168.18.241";

// our service URLs
const authenticationPort = ":12000/ERM_Auth";
const securityAdmintPort = ":12001/SecurityAdmin";
const SystemAdminPort = ":12003/SystemAdmin";
const downloadReportPort = ":12004/ExcelReport";

//our Final Api
const authenticationAPI = baseURL + authenticationPort;
const securityAdminApi = baseURL + securityAdmintPort;
const SystemAdminApi = baseURL + SystemAdminPort;
const downloadReportApi = baseURL + downloadReportPort;

export {
  authenticationAPI,
  securityAdminApi,
  SystemAdminApi,
  downloadReportApi,
};
