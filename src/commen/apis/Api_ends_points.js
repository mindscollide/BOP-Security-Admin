// Base URL from env
const baseURL = process.env.REACT_APP_API_BASE_URL;

// API endpoints from env
const authenticationAPI = `${baseURL}${process.env.REACT_APP_AUTH_PORT}`;
const securityAdminApi = `${baseURL}${process.env.REACT_APP_SECURITY_ADMIN_PORT}`;
const systemAdminApi = `${baseURL}${process.env.REACT_APP_SYSTEM_ADMIN_PORT}`;
const downloadReportApi = `${baseURL}${process.env.REACT_APP_DOWNLOAD_REPORT_PORT}`;
const settingsAPI = `${baseURL}${process.env.REACT_APP_SETTINGS_PORT}`;

// Export all
export {
  authenticationAPI,
  securityAdminApi,
  systemAdminApi,
  downloadReportApi,
  settingsAPI,
};
