import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../../../components/layout/Header/Header";
import Sidebar from "../../../components/layout/Sidebar/Sidebar";
import { Layout } from "antd";
import "./MainPage.css";
import { useMqttClient } from "../../../commen/functions/MqttConnection";
import { useDispatch } from "react-redux";
import {
  setBankUserBulkRequest,
  setBankUserCreated,
  setBankUserRequest,
  setBankUserRequestRejected,
  setBankUserRoleStatusChange,
  setBankUserUpdated,
  setBranchCreated,
  setBranchUpdated,
  setCorpUserRequestRejected,
  setCorpUserRoleStatusChange,
  setCorporateCreated,
  setCorporateUpdated,
  setCorporateUserBulkRequest,
  setCorporateUserCreated,
  setCorporateUserRequest,
  setCorporateUserUpdated,
} from "../../../store/actions/RealtimeActions";
import { LogOutAPI } from "../../../store/actions/Auth_Actions";

const MainPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const subscribeID = "BOP_SECURITYADMIN";
  let userID = localStorage.getItem("userID");

  const { Sider, Content } = Layout;
  const { connectToMqtt, isConnected } = useMqttClient({
    onMessageArrivedCallback: (data) => {
      console.log(data, "onMessageArrivedCallbackonMessageArrivedCallback");
      switch (data.payload.message) {
        case "BANK_USER_REQUEST":
          console.log("Message arrived:", data);
          // When System Admin create a bank user
          dispatch(setBankUserRequest(data.payload));
          break;
        case "CORPORATE_USER_REQUEST":
          console.log("Message arrived:", data);
          // When System Admin create a corporate user
          dispatch(setCorporateUserRequest(data.payload));
          break;
        case "BANK_USER_CREATED":
          console.log("Message arrived:", data);
          // When Security Admin Accepted a Bank User Request
          dispatch(setBankUserCreated(data.payload));
          break;
        case "CORPORATE_USER_CREATED":
          console.log("Message arrived:", data);
          // When Security Admin Accepted a Corporate User Request
          dispatch(setCorporateUserCreated(data.payload));
          break;
        case "CORP_USER_REQUEST_REJECTED":
          console.log("Message arrived:", data);
          // When Security Admin Rejected a Corporate User Request
          dispatch(setCorpUserRequestRejected(data.payload));
          break;
        case "BANK_USER_REQUEST_REJECTED":
          console.log("Message arrived:", data);
          // When Security Admin Rejected a Bank User Request
          dispatch(setBankUserRequestRejected(data.payload));
          break;
        case "CORP_USER_ROLE_STATUS_CHANGE":
          console.log("Message arrived:", data);
          // When Security Admin Change a Corporate User Role
          dispatch(setCorpUserRoleStatusChange(data.payload));
          break;
        case "BANK_USER_ROLE_STATUS_CHANGE":
          console.log("Message arrived:", data);
          let userID = localStorage.getItem("userID");
          // When Security Admin Change a Bank User Role
          dispatch(setBankUserRoleStatusChange(data.payload));
          if (Number(data.payload.updatedUser.userID) === Number(userID)) {
            dispatch(LogOutAPI(navigate));
          }
          break;
        case "BRANCH_CREATED":
          console.log("Message arrived:", data);
          // When System  Admin Created a Branch
          dispatch(setBranchCreated(data.payload));
          break;
        case "BRANCH_UPDATED":
          console.log("Message arrived:", data);
          // When System  Admin Updated a Branch
          dispatch(setBranchUpdated(data.payload));
          break;
        case "CORPORATE_CREATED":
          console.log("Message arrived:", data);
          // When System  Admin Created a Corporate
          dispatch(setCorporateCreated(data.payload));
          break;
        case "CORPORATE_UPDATED":
          console.log("Message arrived:", data);
          // When System  Admin Updated a Corporate
          dispatch(setCorporateUpdated(data.payload));
          break;
        case "BANK_USER_UPDATED":
          console.log("Message arrived:", data);
          // When System  Admin Updated a Bank User
          dispatch(setBankUserUpdated(data.payload));
          break;
        case "CORPORATE_USER_UPDATED":
          console.log("Message arrived:", data);
          // When System  Admin Updated a Corporate User
          dispatch(setCorporateUserUpdated(data.payload));
          break;
        case "CORPORATE_USER_BULK_REQUEST":
          dispatch(setCorporateUserBulkRequest(data.payload));
          break;
        case "BANK_USER_BULK_REQUEST":
          dispatch(setBankUserBulkRequest(data.payload));
          break;

        case "LOGIN":
          console.log("LOGIN event received", data.payload);
          // Handle login event if necessary
          let token = localStorage.getItem("token");
          let userId = localStorage.getItem("userID");
          console.log(
            "LOGIN event received",
            token,
            userId,
            data.payload.loginDetials.token,
            data.payload.loginDetials.userID,
            token !== data.payload.loginDetials.token &&
              Number(userId) === Number(data.payload.loginDetials.userID)
          );

          if (
            token !== data.payload.loginDetials.token &&
            Number(userId) === Number(data.payload.loginDetials.userID)
          ) {
            console.log("LOGIN event received", data.payload);

            // localStorage.clear();
            dispatch(LogOutAPI(navigate));
          }
          break;
        default:
      }
    },
  });
  console.log(isConnected, "isConnectedisConnected");
  useEffect(() => {
    connectToMqtt({ subscribeID, userID });
  }, []);

  return (
    <>
      <Layout>
        <Header />
        <Layout>
          <Sider collapsed={false} className="siderClass" width={250}>
            <Sidebar />
          </Sider>

          <Content className="px-2 mainContent">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
    // <Fragment>
    //   <Row>
    //     <Col sm={12} md={12} lg={12}>
    //       <Header />
    //     </Col>
    //   </Row>
    //   <Row>
    //     <Col lg={12} md={12} sm={12}>
    //       <Row>
    //         <Col
    //           sm={12}
    //           md={12}
    //           lg={12}
    //           style={{
    //             width: "100%",
    //           }}
    //           className="d-flex gap-4"
    //         >
    //           <Sidebar />
    //           <Outlet />
    //         </Col>
    //       </Row>
    //     </Col>
    //   </Row>
    // </Fragment>
  );
};

export default MainPage;
