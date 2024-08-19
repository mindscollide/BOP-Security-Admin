import {
  Route,
  createRoutesFromElements,
  createHashRouter,
} from "react-router-dom";

import Userreport from "../container/Reports/Userreport";
import SecurityLogin from "../container/SecurityLogin/Login/SecurityLogin";
import MainPage from "../container/Pages/MainPage/MainPage";
import PrivateRoutes from "./PrivateRoute";
import ChangePassword from "../container/SecurityLogin/ChangePassword/ChangePassword";
import CreatePassword from "../container/SecurityLogin/CreatePassword/CreatePassword";
import ResetPassword from "../container/SecurityLogin/ResetPassword/ResetPassword";
import TwoFaVerification from "../container/SecurityLogin/2faVerificationScreen/TwoFaVerification";
import EditUser from "../container/Usermanagement/EditUser/EditUser";
import PendingApproval from "../container/Usermanagement/PendingApproval/PendingApproval";

export const router = createHashRouter(
  createRoutesFromElements(
    <>
      <Route exact path="/" element={<SecurityLogin />} />
      <Route exact path="/ChangePassword" element={<ChangePassword />} />
      <Route exact path="/CreatePassword" element={<CreatePassword />} />
      <Route exact path="/ResetPassword" element={<ResetPassword />} />
      <Route exact path="/TwoFaVerification" element={<TwoFaVerification />} />

      {/* <Route element={<PrivateRoutes />}> */}
      <Route exact path="/JS/Admin/" element={<MainPage />}>
        <Route path="Home" element={<EditUser />} />
        <Route path="" element={<EditUser />} />
        <Route path="EditUser" element={<EditUser />} />
        <Route path="userReport" element={<Userreport />} />
        <Route path="PendingApproval" element={<PendingApproval />} />
      </Route>
      {/* </Route> */}
    </>
  )
);
