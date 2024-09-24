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
import CorporateUser from "../container/Usermanagement/CorporateUser/CorporateUser";
import PendingApprovalBank from "../container/Usermanagement/PendingApprovalBank/PendingApprovalBank";
import BankUser from "../container/Usermanagement/BankUser/BankUser";
import PendingApprovalCorporate from "../container/Usermanagement/PendingApprovalCorporate/PendingApprovalCorporate";
import ForgotPassword from "../container/SecurityLogin/forgetPassword/ForgotPassword";
import EmailSentPage from "../container/SecurityLogin/PasswordEmailSent/EmailSentPage";

export const router = createHashRouter(
  createRoutesFromElements(
    <>
      <Route exact path="/" element={<SecurityLogin />} />
      {/* <Route exact path="/ChangePassword" element={<ChangePassword />} /> */}
      {/* <Route exact path="/CreatePassword" element={<CreatePassword />} /> */}
      {/* <Route exact path="/ResetPassword" element={<ResetPassword />} /> */}
      <Route exact path="/TwoFaVerification" element={<TwoFaVerification />} />
      <Route exact path="/ForgotPassword" element={<ForgotPassword />} />
      {/* <Route exact path="/EmailSent" element={<EmailSentPage />} /> */}

      {/* <Route element={<PrivateRoutes />}> */}
      <Route exact path="/BOP/Admin/" element={<MainPage />}>
        <Route path="Home" element={<CorporateUser />} />
        <Route path="" element={<CorporateUser />} />
        <Route path="CorporateUser" element={<CorporateUser />} />
        <Route path="BankUser" element={<BankUser />} />
        <Route path="userReport" element={<Userreport />} />
        <Route path="PendingApprovalBank" element={<PendingApprovalBank />} />
        <Route
          path="PendingApprovalCorporate"
          element={<PendingApprovalCorporate />}
        />
      </Route>
      {/* </Route> */}
    </>
  )
);
