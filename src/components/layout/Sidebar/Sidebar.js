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
  const navigate = useNavigate();
  let defaultOpenKey = localStorage.getItem("defaultOpenKey");

  console.log("defaultOpenKey", defaultOpenKey);

  //Create User Page Name is Pending User Requests

  const navigateToBankUser = () => {
    localStorage.setItem("defaultOpenKey", "editBankUser");
    navigate("/BOP/Admin/BankUser");
  };

  const navigateToCorporateUser = () => {
    localStorage.setItem("defaultOpenKey", "editCorporateUser");
    navigate("/BOP/Admin/CorporateUser");
  };

  const navigateToPendingApproval = () => {
    localStorage.setItem("defaultOpenKey", "pendingApprovalBank");
    navigate("/BOP/Admin/PendingApprovalBank");
  };

  const navigateToPendingApprovalCorporate = () => {
    localStorage.setItem("defaultOpenKey", "pendingApprovalCorporate");
    navigate("/BOP/Admin/PendingApprovalCorporate");
  };

  const navigateToReport = () => {
    localStorage.setItem("defaultOpenKey", "userReport");
    navigate("/BOP/Admin/userReport");
  };


  return (
    <Row>
      <Col lg={12} md={12} sm={12}>
        <Menu
          theme='light'
          defaultOpenKeys={[defaultOpenKey]}
          mode='inline'
          className='Menu-sidebar-class'>
          <SubMenu
            key='userManagement'
            icon={<i className='icon-user menu-icons'></i>}
            title='User Management'
            className='submenu-sidebar-icons'>
            <Menu.Item
              className={
                defaultOpenKey === "editBankUser"
                  ? "menu-items-sidebar_active  noDefault"
                  : "menu-items-sidebar"
              }
              key='editBankUser'
              onClick={navigateToBankUser}>
              Edit Bank User
            </Menu.Item>
            <Menu.Item
              className={
                defaultOpenKey === "editCorporateUser"
                  ? "menu-items-sidebar noDefault"
                  : "menu-items-sidebar"
              }
              key='editCorporateUser'
              onClick={navigateToCorporateUser}>
              Edit Corporate User
            </Menu.Item>
            <Menu.Item
              className={
                defaultOpenKey === "pendingApprovalBank"
                  ? "menu-items-sidebar_active noDefault"
                  : "menu-items-sidebar"
              }
              key='pendingApprovalBank'
              onClick={navigateToPendingApproval}>
              Pending Approval Bank
            </Menu.Item>
            <Menu.Item
              className={
                defaultOpenKey === "pendingApprovalCorporate"
                  ? "menu-items-sidebar_active noDefault"
                  : "menu-items-sidebar"
              }
              key='pendingApprovalCorporate'
              onClick={navigateToPendingApprovalCorporate}>
              Pending Approval Corporate
            </Menu.Item>
          </SubMenu>

          <SubMenu
            key='sub3'
            icon={<i className='icon-user menu-icons'></i>}
            title='Report'
            className='submenu-sidebar-icons'>
            <Menu.Item
              className={
                defaultOpenKey === "userReport"
                  ? "menu-items-sidebar_active noDefault"
                  : "menu-items-sidebar"
              }
              key='userReport'
              onClick={navigateToReport}>
              User Report
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Col>
    </Row>
  );
};

export default Sidebar;
