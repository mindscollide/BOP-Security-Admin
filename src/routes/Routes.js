import {
  Route,
  createRoutesFromElements,
  createHashRouter,
} from "react-router-dom";

import Userreport from "../container/Pages/Reports/Userreport";
import SecurityLogin from "../container/SecurityLogin/Login/SecurityLogin";
import MainPage from "../container/Pages/MainPage/MainPage";
import PrivateRoutes from "./PrivateRoute";
import ChangePassword from "../container/SecurityLogin/ChangePassword/ChangePassword";
import CreatePassword from "../container/SecurityLogin/CreatePassword/CreatePassword";
import ResetPassword from "../container/SecurityLogin/ResetPassword/ResetPassword";
import TwoFaVerification from "../container/SecurityLogin/2faVerificationScreen/TwoFaVerification";
import PendingApprovalBank from "../container/Pages/UserManagement/PendingApprovalBank/PendingApprovalBank";
import PendingApprovalCorporate from "../container/Pages/UserManagement/PendingApprovalCorporate/PendingApprovalCorporate";
import ForgotPassword from "../container/SecurityLogin/forgetPassword/ForgotPassword";
import EmailSentPage from "../container/SecurityLogin/PasswordEmailSent/EmailSentPage";
import EditBankUser from "../container/Pages/UserManagement/BankUser/EditBankUser";
import EditCorporateUser from "../container/Pages/UserManagement/CorporateUser/EditCorporateUser";

export const router = createHashRouter(
  createRoutesFromElements(
    <>
      <Route exact path="/" element={<SecurityLogin />} />
      <Route exact path="/ChangePassword" element={<ChangePassword />} />
      <Route exact path="/CreatePassword" element={<CreatePassword />} />
      <Route exact path="/ResetPassword" element={<ResetPassword />} />
      <Route exact path="/TwoFaVerification" element={<TwoFaVerification />} />
      <Route exact path="/ForgotPassword" element={<ForgotPassword />} />
      <Route exact path="/EmailSent" element={<EmailSentPage />} />

      {/* <Route element={<PrivateRoutes />}> */}
      <Route exact path="/BOP/Admin/" element={<MainPage />}>
        <Route index path="" element={<EditBankUser />} />
        <Route path="BankUser" element={<EditBankUser />} />
        <Route path="CorporateUser" element={<EditCorporateUser />} />
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
