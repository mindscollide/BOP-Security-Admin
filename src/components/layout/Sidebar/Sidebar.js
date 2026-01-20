import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";
// import { PersonFill, FileEarmarkTextFill } from "react-bootstrap-icons";
import "./Sidebar.css";

const Sidebar = () => {
  const [expandedKey, setExpandedKey] = useState(
    sessionStorage.getItem("defaultOpenKey") || null
  );
  const location = useLocation();

  const selectedKey = sessionStorage.getItem("defaultSelectedKey");

  const handleToggle = (eventKey) => {
    if (eventKey === "sub1" || eventKey === "sub2") {
      setExpandedKey(expandedKey === eventKey ? null : eventKey);
      sessionStorage.setItem(
        "defaultOpenKey",
        expandedKey === eventKey ? null : eventKey
      );
    }
  };

  console.log(expandedKey, "expandedKeyexpandedKey");

  const handleItemClick = (selectedKey) => {
    sessionStorage.setItem("defaultSelectedKey", selectedKey);
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
                  location.pathname.includes("BankUser")
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
                  location.pathname.includes("CorporateUser")
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
                  location.pathname.includes("PendingApprovalBank")
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
                  location.pathname.includes("PendingApprovalCorporate")
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
