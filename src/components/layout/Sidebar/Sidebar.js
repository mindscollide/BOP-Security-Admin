import React, { useState, useEffect, Fragment } from "react";
import { Row, Col, Nav, Container, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import Users from "../../../assets/images/Assignees-Icon.png";
import Broadcast from "../../../assets/images/6.png";
import "./Sidebar.css";

const Sidebar = () => {
  const { SubMenu } = Menu;
  const { Sider } = Layout;
  const navigate = useNavigate();
  let defaultOpenKey = localStorage.getItem("defaultOpenKey ");
  let defaultSelectedKey = localStorage.getItem("defaultSelectedKey");

  console.log("defaultOpenKey", defaultOpenKey);
  console.log("defaultSelectedKey", defaultSelectedKey);

  //Create User Page Name is Pending User Requests

  const navigateToCorporateUser = () => {
    localStorage.setItem("defaultOpenKey ", "sub1");
    localStorage.setItem("defaultSelectedKey", "5");
    navigate("/Js/Admin/CorporateUser");
  };
  const navigateToBankUser = () => {
    localStorage.setItem("defaultOpenKey ", "sub1");
    localStorage.setItem("defaultSelectedKey", "6");
    navigate("/Js/Admin/BankUser");
  };

  const navigateToPendingApproval = () => {
    localStorage.setItem("defaultOpenKey ", "sub1");
    localStorage.setItem("defaultSelectedKey", "7");
    navigate("/JS/Admin/PendingApprovalBank");
  };

  const navigateToPendingApprovalCorporate = () => {
    localStorage.setItem("defaultOpenKey ", "sub1");
    localStorage.setItem("defaultSelectedKey", "8");
    navigate("/JS/Admin/PendingApprovalCorporate");
  };

  const navigateToReport = () => {
    localStorage.setItem("defaultOpenKey ", "sub3");
    localStorage.setItem("defaultSelectedKey", "8");
    navigate("/Js/Admin/userReport");
  };

  let defaultKeySidebar = localStorage.getItem("defaultSelectedKey");

  return (
    <Row>
      <Col lg={12} md={12} sm={12}>
        <Menu
          theme="light"
          defaultOpenKeys={[defaultOpenKey]}
          defaultSelectedKeys={[defaultSelectedKey]}
          mode="inline"
          className="Menu-sidebar-class"
        >
          <SubMenu
            key="sub1"
            icon={<i className="icon-user menu-icons"></i>}
            title="User Management"
            className="submenu-sidebar-icons"
          >
            <Menu.Item
              className={
                defaultKeySidebar !== "5"
                  ? "menu-items-sidebar noDefault"
                  : "menu-items-sidebar"
              }
              key="5"
              onClick={navigateToCorporateUser}
            >
              Corporate User
            </Menu.Item>
            <Menu.Item
              className={
                defaultKeySidebar !== "6"
                  ? "menu-items-sidebar noDefault"
                  : "menu-items-sidebar"
              }
              key="6"
              onClick={navigateToBankUser}
            >
              Bank User
            </Menu.Item>
            <Menu.Item
              className={
                defaultKeySidebar !== "7"
                  ? "menu-items-sidebar noDefault"
                  : "menu-items-sidebar"
              }
              key="7"
              onClick={navigateToPendingApproval}
            >
              Pending Approval Bank
            </Menu.Item>
            <Menu.Item
              className={
                defaultKeySidebar !== "8"
                  ? "menu-items-sidebar noDefault"
                  : "menu-items-sidebar"
              }
              key="8"
              onClick={navigateToPendingApprovalCorporate}
            >
              Pending Approval Corporate
            </Menu.Item>
          </SubMenu>

          <SubMenu
            key="sub3"
            icon={<i className="icon-user menu-icons"></i>}
            title="Report"
            className="submenu-sidebar-icons"
          >
            <Menu.Item
              className={
                defaultKeySidebar !== "9"
                  ? "menu-items-sidebar noDefault"
                  : "menu-items-sidebar"
              }
              key="9"
              onClick={navigateToReport}
            >
              User Report
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Col>
    </Row>
  );
};

export default Sidebar;
