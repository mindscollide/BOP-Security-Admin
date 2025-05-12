import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../../components/layout/Header/Header";
import Sidebar from "../../../components/layout/Sidebar/Sidebar";
import { Layout } from "antd";
import ResponseMessage from "../../../utils/ResponseMessage";

const MainPage = () => {
  const { Sider, Content } = Layout;
  return (
    <>
      <Layout>
        <Header />
        <Layout>
          <Sider width={250}>
            <Sidebar />
          </Sider>

          <Content className="px-3">
            <Outlet />
          </Content>
        </Layout>
        <ResponseMessage />
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
