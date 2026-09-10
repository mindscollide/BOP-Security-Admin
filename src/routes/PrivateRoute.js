import { Navigate, Outlet } from "react-router-dom";

// Everything in localStorage is written with JSON.stringify. A half-written or
// hand-edited entry would otherwise throw out of the guard and blank the app.
const readStored = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (error) {
    return null;
  }
};

const PrivateRoutes = () => {
  const RoleID = readStored("roleID");
  const token = readStored("token");
  const currentUser = RoleID === 5;
  return currentUser && token ? <Outlet /> : <Navigate to="/" replace />;
};
export default PrivateRoutes;
