import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";
// import { PersonFill, FileEarmarkTextFill } from "react-bootstrap-icons";
import "./Sidebar.css";

const Sidebar = () => {
  const [expandedKey, setExpandedKey] = useState(
    localStorage.getItem("defaultOpenKey") || null
  );

  const selectedKey = localStorage.getItem("defaultSelectedKey");

  const handleToggle = (eventKey) => {
    if (eventKey === "sub1" || eventKey === "sub2") {
      setExpandedKey(expandedKey === eventKey ? null : eventKey);
      localStorage.setItem(
        "defaultOpenKey",
        expandedKey === eventKey ? null : eventKey
      );
    }
  };

  const handleItemClick = (selectedKey) => {
    localStorage.setItem("defaultSelectedKey", selectedKey);
  };

  return (
    <Navbar expand={false} className="sidebar-navbar">
      <Nav className="w-100">
        {/* User Management Section */}
        <Nav.Item className="sidebar-menu-group">
          <Nav.Link
            onClick={() => handleToggle("sub1")}
            className="sidebar-menu-header"
          >
            <span>
              <i className={"sidebar-icon icon-user"} />{" "}
              <span>User Management</span>
            </span>
            <i
              className={`sidebarExpendIcon ${
                expandedKey === "sub1" ? "icon-arrow-down" : "icon-arrow-right"
              }`}
            ></i>
          </Nav.Link>
          {expandedKey === "sub1" && (
            <div className="sidebar-submenu">
              <Link
                to="/BOP/Admin/BankUser"
                className={
                  selectedKey === "editBankUser"
                    ? "sidebar-menu-item_Active"
                    : "sidebar-menu-item"
                }
                onClick={() => handleItemClick("editBankUser")}
              >
                Edit Bank User
              </Link>
              <Link
                to="/BOP/Admin/CorporateUser"
                className={
                  selectedKey === "editCorporateUser"
                    ? "sidebar-menu-item_Active"
                    : "sidebar-menu-item"
                }
                onClick={() => handleItemClick("editCorporateUser")}
              >
                Edit Corporate User
              </Link>
              <Link
                to="/BOP/Admin/PendingApprovalBank"
                className={
                  selectedKey === "pendingApprovalBank"
                    ? "sidebar-menu-item_Active"
                    : "sidebar-menu-item"
                }
                onClick={() => handleItemClick("pendingApprovalBank")}
              >
                Pending Approval Bank
              </Link>
              <Link
                to="/BOP/Admin/PendingApprovalCorporate"
                className={
                  selectedKey === "pendingApprovalCorporate"
                    ? "sidebar-menu-item_Active"
                    : "sidebar-menu-item"
                }
                onClick={() => handleItemClick("pendingApprovalCorporate")}
              >
                Pending Approval Corporate
              </Link>
            </div>
          )}
        </Nav.Item>

        {/* Reports Section */}
        <Nav.Item className="sidebar-menu-group">
          <Nav.Link
            onClick={() => handleToggle("sub2")}
            className="sidebar-menu-header"
          >
            <span>
              <i className={"sidebar-icon icon-user"} /> <span>Reports</span>
            </span>
            <i
              className={`sidebarExpendIcon ${
                expandedKey === "sub2" ? "icon-arrow-down" : "icon-arrow-right"
              }`}
            ></i>
          </Nav.Link>
          {expandedKey === "sub2" && (
            <div className="sidebar-submenu">
              <Link
                to="/BOP/Admin/userReport"
                className={
                  selectedKey === "userReport"
                    ? "sidebar-menu-item_Active"
                    : "sidebar-menu-item"
                }
                onClick={() => handleItemClick("userReport")}
              >
                User Reports
              </Link>
            </div>
          )}
        </Nav.Item>
      </Nav>
    </Navbar>
  );
};

export default Sidebar;
