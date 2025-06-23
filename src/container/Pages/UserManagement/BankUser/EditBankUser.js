import React, { useCallback, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import "./EditBankUser.css";

import {
  TextField,
  Button,
  Table,
  Paper,
  Loader,
  Modal,
} from "../../../../components/elements";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import EditBankUserModal from "../../Modals/Edit-Bank-User-Modal/EditBankUserModal";
import { searchEditBankUserSchema } from "../../../../utils/schemas";
import { ConfirmationModalSecurityAdmin } from "../../../../store/actions/Security_Admin_Modal";
import {
  GetAllBranchesAPI,
  GetAllUserStatusAPI,
  GetBankUserRolesAPI,
} from "../../../../store/actions/Auth_Actions";
import {
  SearchBankUsersAPI,
  UpdateBankUserAPI,
} from "../../../../store/actions/Security_Admin";
import { useTableScrollBottom } from "../../../../helpers/useTableScrollBottom";
import ActivateConfirmationModal from "../../Modals/ActivateConfirmationModal/ActivateConfirmationModal";
import { useMqtt } from "../../../../context/MQTTContext";
import { IndexCell } from "../../../../helpers/ReusableMethods";
import {
  downloadBankUserReportApi,
  downloadPDFBankUserSecurityAdminReportApi,
} from "../../../../store/actions/Download-Report";
import { Popover } from "antd";
import pdfIcon from "../../../../assets/images/pdf.png";
import excelIcon from "../../../../assets/images/excel.png";

const EditBankUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [sRow, setSRow] = useState(0);
  const [recordsLength, setRecordLength] = useState(0);
  const {
    bankUserRoleStatusChange,
    bankUserUpdated,
    branchCreated,
    branchUpdated,
    bankBulkUpload,
    bankUserCreated,
    setBankBulkUpload,
  } = useMqtt();
  const { securityReducer } = useSelector((state) => state);
  //Search all corporate Users
  const SearchBankUsers = useSelector(
    (state) => state.securityReducer.SearchBankUsersData
  );

  const [editBankUserUpdate, setBankUserUpdate] = useState(null);

  const [editBankUserRole, setEditBankUserRole] = useState({
    value: 0,
    label: "",
  });

  const [editBankUserStatus, setEditBankUserStatus] = useState({
    value: 0,
    label: "",
  });

  const [editBankUserBranch, setEditBankUserBranch] = useState({
    value: 0,
    label: "",
  });
  console.log(editBankUserBranch, "editBankUserBrancheditBankUserBranch");
  // Get all user status selector
  const GetAllUserStatus = useSelector((state) => state.auth.allUserStatusData);

  //Role List
  const RoleList = useSelector((state) => state.auth.GetBankUserRoles);

  // Branch List
  const BranchList = useSelector((state) => state.auth.GetAllBranches);

  // state for edit bank user
  const [BankEditUser, setBankEditUser] = useState({
    ...searchEditBankUserSchema,
  });
  const [open, setOpen] = useState(false);

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };
  //edit modal on js-security-admin
  const [editModalSecurity, setEditModalSecurity] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);

  // state for select Status
  const [roleOptions, setRoleOptions] = useState([]);
  const [roleID, setRoleID] = useState({
    value: 0,
    label: "",
  });

  //state for storing user Status
  const [statusOptions, setStatusOptions] = useState([]);
  const [statusID, setStatusID] = useState({
    value: 0,
    label: "",
  });

  // state for select Status
  const [branchOptions, setBranchOptions] = useState([]);
  console.log("branchOptions", branchOptions);

  const [dropdownvalue, setDropdownvalue] = useState({
    value: 50,
    label: "50",
  });

  const options = [
    { value: 50, label: "50" },
    { value: 100, label: "100" },
    { value: 150, label: "150" },
  ];
  const [showExportOptions, setShowExportOptions] = useState(false);
  // Function to toggle the export options (PDF & Excel buttons)
  const toggleExportOptions = () => {
    setShowExportOptions(!showExportOptions);
  };

  const [bankUserTableData, setBankUserTableData] = useState([]);
  console.log(bankUserTableData, "bankUserTableData");
  //state for save and cancel button
  const confirmationModal = useSelector(
    (state) => state.securityModalReducer.confirmationModal
  );
  const [modalState, setModalState] = useState(0);

  console.log("confirmationModal", confirmationModal);

  //Custome hook for Scrolling (1)
  const { hasReachedBottom, setHasReachedBottom } = useTableScrollBottom(() => {
    console.log("🚀 Table reached bottom");
    // Load more data here if needed
    if (recordsLength !== bankUserTableData.length) {
      let Data = {
        Name: BankEditUser.Name.value,
        EmployeeID: BankEditUser.EmployeeID.value,
        Email: BankEditUser.LoginID.value,
        RoleID: roleID.value,
        StatusID: statusID.value,
        sRow: sRow,
        Length: 10,
      };
      dispatch(SearchBankUsersAPI(navigate, Data));
    }
  });

  //inial APIs calling
  useEffect(() => {
    let Data = {
      Name: "",
      EmployeeID: "",
      Email: "",
      RoleID: 0,
      StatusID: 0,
      sRow: 0,
      Length: 10,
    };
    dispatch(SearchBankUsersAPI(navigate, Data));
    dispatch(GetAllUserStatusAPI(navigate));
    dispatch(GetBankUserRolesAPI(navigate));
    dispatch(GetAllBranchesAPI(navigate));
  }, []);
  console.log(hasReachedBottom, "hasReachedBottom");
  useEffect(() => {
    if (bankBulkUpload !== null) {
      try {
        setBankBulkUpload(null);
        let Data = {
          Name: "",
          EmployeeID: "",
          Email: "",
          RoleID: 0,
          StatusID: 0,
          sRow: 0,
          Length: 10,
        };
        dispatch(SearchBankUsersAPI(navigate, Data));
      } catch (error) {}
    }
  }, [bankBulkUpload]);
  //handelled states for scrolling here (4)
  useEffect(() => {
    if (SearchBankUsers !== null) {
      try {
        const { bankUsers, totalRecords } = SearchBankUsers;
        if (hasReachedBottom) {
          setHasReachedBottom(false);
          setBankUserTableData([...bankUserTableData, ...bankUsers]);
          let sRows = bankUserTableData.length + bankUsers.length;
          setSRow(sRows);
          setRecordLength(totalRecords);
        } else {
          setBankUserTableData(bankUsers);
          setSRow(bankUsers.length);
          setRecordLength(totalRecords);
        }
      } catch (error) {}
    }
  }, [SearchBankUsers]);

  useEffect(() => {
    if (bankUserRoleStatusChange !== null) {
      try {
        const { updatedUser } = bankUserRoleStatusChange;

        console.log(updatedUser, "updatedUserupdatedUser");
        setBankUserTableData((prevData) => {
          if (Array.isArray(prevData)) {
            return prevData.map((data2, index) => {
              if (data2.employeeID === updatedUser.employeeID) {
                return {
                  ...data2,
                  userRoleID: updatedUser.userRoleID,
                  userStatusID: updatedUser.userStatusID,
                  branch: updatedUser.branch,
                };
              }
              return data2;
            });
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, [bankUserRoleStatusChange]);

  useEffect(() => {
    if (bankUserCreated !== null) {
      try {
        const { user, createdUserID, createdDateTime } = bankUserCreated;
        let findisExist = bankUserTableData.find(() => {
          return (
            user.userRegistrationRequestID ===
            bankUserTableData.userRegistrationRequestID
          );
        });
        console.log(
          bankUserTableData,
          user,
          "bankUserTableDatabankUserTableData"
        );
        if (findisExist === undefined) {
          let bankUserData = {
            branch: user.branchName,
            employeeID: user.employeeID,
            ldapAccount: user.loginID,
            userID: createdUserID,
            firstName: user.firstname,
            email: user.email,
            contactNumber: user.contactnumber,
            failedAttemptCount: 0,
            userRoleID: user.fK_UserRoleID,
            userStatusID: user.fK_UserStatusID,
            creationDateTime: createdDateTime,
          };
          setBankUserTableData((prevData) => {
            return [bankUserData, ...prevData];
          });
        }
      } catch (error) {}
    }
  }, [bankUserCreated]);

  // bankUserUpdated
  useEffect(() => {
    if (bankUserUpdated !== null) {
      console.log("bankUserUpdated", bankUserUpdated);
      try {
        const { user } = bankUserUpdated;

        console.log(user, "updatedUserupdatedUser");
        setBankUserTableData((prevData) => {
          return prevData.map((data2, index) => {
            if (data2.employeeID === user.employeeID) {
              return {
                ...data2,
                userRoleID: user.userRoleID,
                branch: user.branch,
                firstName: user.firstName,
              };
            }
            return data2;
          });
        });
      } catch (error) {
        console.log(error);
      }

      if (roleOptions.length > 0) {
        let findRoleObj = roleOptions.find(
          (roleData, index) =>
            roleData.roleID === bankUserUpdated.user.userRoleID
        );
        if (findRoleObj !== undefined) {
          setEditBankUserRole({
            value: findRoleObj.roleID,
            label: findRoleObj.roleName,
          });
        }
        console.log(findRoleObj, "findRoleObj");
      }
    }
  }, [bankUserUpdated]);

  useEffect(() => {
    if (branchCreated !== null) {
      if (Array.isArray(branchOptions)) {
        let findBranchObj = branchOptions.find(
          (branchData, index) =>
            branchData.branchID === branchCreated.branch.branchID
        );
        if (findBranchObj === undefined) {
          let newBranchData = {
            ...branchCreated.branch,
            value: branchCreated.branch.branchID,
            label: branchCreated.branch.branchName,
          };
          setBranchOptions([...branchOptions, newBranchData]);
        }
      }
    }
  }, [branchCreated]);

  useEffect(() => {
    if (branchUpdated !== null) {
      if (Array.isArray(branchOptions)) {
        let findBranchObj = branchOptions.find(
          (branchData, index) =>
            branchData.branchID === branchUpdated.branch.branchID
        );
        if (findBranchObj !== undefined) {
          setBranchOptions((prevBranchData) => {
            return prevBranchData.map((data4, index) => {
              if (data4.branchID === branchUpdated.branch.branchID) {
                return {
                  ...data4,
                  value: branchUpdated.branch.branchID,
                  label: branchUpdated.branch.branchName,
                  branchCode: branchUpdated.branch.branchCode,
                  branchContact: branchUpdated.branch.branchContact,
                };
              }
              return data4;
            });
          });

          if (editBankUserBranch.value === branchUpdated.branch.branchID) {
            setEditBankUserBranch({
              value: branchUpdated.branch.branchID,
              label: branchUpdated.branch.branchName,
            });
          }
        }
      }
    }
  }, [branchUpdated]);

  //edit user security admin validate handler
  const editUserValidateHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "EmployeeID" && value !== "") {
      console.log("valuevalueemailvaluevalueemail", value);
      let valueCheck = value.replace(/[^\d]/g, "");
      if (valueCheck !== "") {
        setBankEditUser({
          ...BankEditUser,
          EmployeeID: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "EmployeeID" && value === "") {
      setBankEditUser({
        ...BankEditUser,
        EmployeeID: {
          value: "",
          errorMessage: "",
          errorStatus: true,
        },
      });
    }
    if (name === "email" && value !== "") {
      console.log("valuevalueemailvaluevalueemail", value);
      if (value !== "") {
        setBankEditUser({
          ...BankEditUser,
          email: {
            value: value.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "email" && value === "") {
      setBankEditUser({
        ...BankEditUser,
        email: {
          value: "",
          errorMessage: "",
          errorStatus: true,
        },
      });
    }

    if (name === "LoginID" && value !== "") {
      // let valueCheck = value.replace(/[^\d]/g, "");
      if (value !== "") {
        setBankEditUser({
          ...BankEditUser,
          LoginID: {
            value: value.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "LoginID" && value === "") {
      setBankEditUser({
        ...BankEditUser,
        LoginID: { value: "", errorMessage: "", errorStatus: false },
      });
    }

    if (name === "Name" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      if (valueCheck !== "") {
        setBankEditUser({
          ...BankEditUser,
          Name: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "Name" && value === "") {
      setBankEditUser({
        ...BankEditUser,
        Name: { value: "", errorMessage: "", errorStatus: false },
      });
    }
  };

  const handleSelectStatus = async (selectedStatus) => {
    setStatusID(selectedStatus);
  };

  //handle select RoleID
  const handleSelectRole = async (selectedRole) => {
    setRoleID(selectedRole);
  };

  //reset handler for edit user
  const resetHandler = () => {
    dispatch(ConfirmationModalSecurityAdmin(true));
    setModalState(2);
  };

  // show error message When user hit activate btn
  const resetHandlerYes = () => {
    setHasReachedBottom(false);
    setRecordLength(0);
    setSRow(0);
    setBankUserTableData([]);
    if (modalState === 2) {
      dispatch(ConfirmationModalSecurityAdmin(false));
      setModalState(0);
      let Data = {
        Name: "",
        EmployeeID: "",
        Email: "",
        RoleID: 0,
        StatusID: 0,
        sRow: 0,
        Length: 10,
      };
      dispatch(SearchBankUsersAPI(navigate, Data));
      setBankEditUser({
        ...BankEditUser,
        EmployeeID: { value: "", errorMessage: "", errorStatus: false },
        LoginID: { value: "", errorMessage: "", errorStatus: false },
        Name: { value: "", errorMessage: "", errorStatus: false },
      });
      setStatusID({
        value: 0,
        label: "",
      });
      setRoleID({
        value: 0,
        label: "",
      });
    }
  };

  //onClose modal
  const closeUpdateModal = () => {
    setUpdateModal(false);
  };

  const handleCloseEditBankUserModal = useCallback(() => {
    setEditModalSecurity(false);
    setEditBankUserStatus({
      value: 0,
      label: "",
    });
    setEditBankUserRole({
      value: 0,
      label: "",
    });
    setEditBankUserBranch({
      value: 0,
      label: "",
    });
  }, []);

  //Table columns for customer List
  const handleNoButton = useCallback(() => {
    if (modalState === 1) {
      dispatch(ConfirmationModalSecurityAdmin(false));
      setModalState(0);
    } else if (modalState === 2) {
      dispatch(ConfirmationModalSecurityAdmin(false));
      setModalState(0);
    }
  }, [modalState]);

  const handleClickEdit = (record) => {
    console.log("recordrecordrecord", record);
    try {
      setEditModalSecurity(true);
      if (statusOptions.length > 0) {
        let findStatusObj = statusOptions.find(
          (statusData, index) => statusData.statusID === record.userStatusID
        );
        if (findStatusObj !== undefined) {
          setEditBankUserStatus({
            value: findStatusObj.statusID,
            label: findStatusObj.statusName,
          });
        }
        console.log(findStatusObj, "findStatusObj");
      }

      if (roleOptions.length > 0) {
        let findRoleObj = roleOptions.find(
          (roleData, index) => roleData.roleID === record.userRoleID
        );
        if (findRoleObj !== undefined) {
          // if (findRoleObj.roleID !== 9) {
          setEditBankUserRole({
            value: findRoleObj.roleID,
            label: findRoleObj.roleName,
          });
          //   setEditBankUserBranch({
          //     value: 0,
          //     label: "",
          //   });
          // } else if (findRoleObj.roleID === 9) {
          //   setEditBankUserRole({
          //     value: findRoleObj.roleID,
          //     label: findRoleObj.roleName,
          //   });
          // }
        }
      }

      if (branchOptions.length > 0 && record.branch !== null) {
        let findBranchObj = branchOptions.find(
          (branchData, index) => branchData.branchID === record.branch.branchID
        );
        if (findBranchObj !== undefined) {
          setEditBankUserBranch({
            value: findBranchObj.branchID,
            label: findBranchObj.branchName,
          });
        }
      }

      setBankUserUpdate(record);
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      title: <label className="bottom-table-header">Employee ID</label>,
      dataIndex: "employeeID",
      key: "employeeID",
      align: "left",
      ellipsis: true,
      width: "120px",
    },
    {
      title: <label className="bottom-table-header">LoginID</label>,
      dataIndex: "email",
      key: "loginId",
      align: "left",
      width: "320px",
      ellipsis: true,
    },
    {
      title: <label className="bottom-table-header">Empolyee Name</label>,
      dataIndex: "firstName",
      key: "name",
      width: "200px",
      align: "left",
      ellipsis: true,
      render: (val, record) => {
        return <IndexCell value={val} record={record} />;
      },
    },
    {
      title: <label className="bottom-table-header">Role</label>,
      dataIndex: "userRoleID",
      key: "userRoleID",
      align: "left",
      width: "100px",
      ellipsis: true,
      render: (val, record) => {
        let role =
          RoleList?.roles?.length > 0 &&
          RoleList.roles.find((role) => role.roleID === val);
        return (
          <IndexCell
            value={role !== undefined ? role.roleName : ""}
            record={record}
          />
        );
      },
    },
    {
      title: <label className="bottom-table-header">Branch</label>,
      dataIndex: "branch",
      key: "branch",
      width: "150px",
      align: "left",
      ellipsis: true,
      render: (val, record) => {
        return (
          <IndexCell
            value={val !== null ? val.branchName : ""}
            record={record}
          />
        );
      },
    },
    {
      title: <label className="bottom-table-header">Status</label>,
      dataIndex: "userStatusID",
      key: "userStatusID",
      ellipsis: true,
      align: "left",
      width: "80px",
      render: (val, record) => {
        return (
          <IndexCell
            value={val === 1 ? "Active" : "Inactive"}
            // CellClassName={
            //   val === 1 ? styles.ActiveStatus : styles.InactiveStatus
            // }
            record={record}
          />
        );
      },
    },
    {
      title: <label className="bottom-table-header">Edit</label>,
      dataIndex: "edit",
      key: "edit",
      ellipsis: true,
      width: "100px",
      align: "center",
      render: (text, record) => {
        return (
          <label
            className="edit-update-column"
            onClick={() => handleClickEdit(record)}
          >
            <i className="icon-edit editCorporate-user-icon-color" />
          </label>
        );
      },
    },
  ];

  const handleChangeDropDown = (value) => {
    setDropdownvalue(value);
  };

  const UpdateBtnHandle = () => {
    setEditModalSecurity(false);
    setUpdateModal(true);
  };
  //handelled states for scrolling here (2)
  const handleSearch = () => {
    setSRow(0);
    setHasReachedBottom(false);
    setBankUserTableData([]);
    setRecordLength(0);
    let Data = {
      Name: BankEditUser.Name.value,
      EmployeeID: BankEditUser.EmployeeID.value,
      Email: BankEditUser.LoginID.value,
      RoleID: roleID.value,
      StatusID: statusID.value,
      sRow: 0,
      Length: 10,
    };
    dispatch(SearchBankUsersAPI(navigate, Data));
  };

  const handleProceed = () => {
    console.log("Proceed clicked");
    const data = {
      StatusID: editBankUserStatus.value,
      UserID: editBankUserUpdate.userID,
      RoleID: editBankUserRole.value,
      BranchID: editBankUserRole.value === 9 ? editBankUserBranch.value : 0,
    };

    console.log("data to store is: ", data);
    dispatch(
      UpdateBankUserAPI(
        navigate,
        data,
        setUpdateModal,
        handleCloseEditBankUserModal
      )
    );
  };

  useEffect(() => {
    if (GetAllUserStatus !== null) {
      try {
        let newUserStatusData = GetAllUserStatus.status.map((status) => {
          return {
            ...status,
            value: status.statusID,
            label: status.statusName,
          };
        });
        setStatusOptions(newUserStatusData);
      } catch (error) {}
    }
    if (RoleList !== null) {
      try {
        let newRolesData = RoleList.roles.map((role) => {
          return {
            ...role,
            value: role.roleID,
            label: role.roleName,
          };
        });
        setRoleOptions(newRolesData);
      } catch (error) {}
    }

    if (BranchList !== null) {
      try {
        let newBranchData = BranchList.branches.map((branch) => {
          return {
            ...branch,
            value: branch.branchID,
            label: branch.branchName,
          };
        });
        setBranchOptions(newBranchData);
      } catch (error) {}
    }
  }, [GetAllUserStatus, RoleList, BranchList]);

  const handleExportButton = (format) => {
    if (format === "excel") {
      let data = {
        EmployeeID: BankEditUser.EmployeeID.value,
        Name: BankEditUser.Name.value,
        RoleID: Number(roleID.value),
        StatusID: Number(statusID.value),
        Email: BankEditUser.LoginID.value,
        sRow: 0,
        Length: 10,
      };
      dispatch(downloadBankUserReportApi(navigate, data));
    } else if (format === "pdf") {
      let data = {
        EmployeeID: BankEditUser.EmployeeID.value,
        Name: BankEditUser.Name.value,
        RoleID: Number(roleID.value),
        StatusID: Number(statusID.value),
        Email: BankEditUser.LoginID.value,
      };
      dispatch(downloadPDFBankUserSecurityAdminReportApi(navigate, data));
    }
  };

  return (
    <>
      <section className="edit-user-container">
        <Row>
          <Col lg={12} md={12} sm={12}>
            <div className="editBankUser-label">Edit Bank User</div>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col lg={12} md={12} sm={12}>
            <Paper className="span-edit-user">
              <Row className="mt-1">
                <Col lg={3} md={3} sm={12} className="pe-0">
                  <TextField
                    name="EmployeeID"
                    className="text-fields-edituser"
                    labelClass="d-none"
                    placeholder="Employee ID"
                    maxLength={100}
                    value={BankEditUser.EmployeeID.value}
                    onChange={editUserValidateHandler}
                  />
                </Col>
                <Col lg={3} md={3} sm={12} className="pe-0">
                  <TextField
                    name="LoginID"
                    className="text-fields-edituser"
                    labelClass="d-none"
                    maxLength={100}
                    placeholder="Login ID"
                    value={BankEditUser.LoginID.value}
                    onChange={editUserValidateHandler}
                  />
                </Col>
                <Col lg={3} md={3} sm={12} className="pe-0">
                  <TextField
                    name="Name"
                    labelClass="d-none"
                    maxLength={100}
                    className="text-fields-edituser"
                    placeholder="Employee Name"
                    value={BankEditUser.Name.value}
                    onChange={editUserValidateHandler}
                  />
                </Col>
                <Col lg={3} md={3} sm={12}>
                  <Select
                    isSearchable
                    options={roleOptions}
                    placeholder="Select Role"
                    className="edit-user-select-status"
                    value={roleID.value !== 0 ? roleID : null}
                    onChange={handleSelectRole}
                  />
                </Col>
              </Row>

              <Row className="mt-3">
                <Col lg={3} md={3} sm={12} className="pe-0">
                  <Select
                    className="edit-user-select-status"
                    isSearchable
                    placeholder="Select Status"
                    options={statusOptions}
                    value={statusID.value !== 0 ? statusID : null}
                    onChange={handleSelectStatus}
                  />
                </Col>

                <Col
                  lg={9}
                  md={9}
                  sm={12}
                  className="d-flex justify-content-left gap-1"
                >
                  <Button
                    icon={<i className="icon-search bankUser-icon"></i>}
                    text="Search"
                    className="search-Bank-Edit-User-btn"
                    onClick={handleSearch}
                  />
                  <Button
                    icon={<i className="icon-refresh bankUser-icon"></i>}
                    text="Reset"
                    onClick={resetHandler}
                    className="reset-Bank-Edit-User-btn"
                  />
                  <Popover
                    content={
                      <div className="EditBankUser_export-options">
                        <Button
                          icon={<img src={pdfIcon} alt="PDF Icon" />}
                          onClick={() => handleExportButton("pdf")}
                          className="EditBankUser_export-button"
                        />
                        <Button
                          icon={<img src={excelIcon} alt="Excel Icon" />}
                          onClick={() => handleExportButton("excel")}
                          className="EditBankUser_export-button"
                        />
                      </div>
                    }
                    trigger="click"
                    open={open}
                    onOpenChange={handleOpenChange}
                    placement="bottomRight"
                    arrow={false}
                  >
                    <Button
                      icon={<i className="icon-download"></i>}
                      className="EditBankUser_Main-Export-Button"
                      text="Export"
                      iconClass="resetIconClass"
                      onClick={toggleExportOptions}
                    />
                  </Popover>
                </Col>
              </Row>

              <Row className="mt-4">
                <Col lg={12} md={12} sm={12}>
                  {/* <span>
                    <Row>
                      <Col
                        lg={12}
                        md={12}
                        sm={12}
                        className="d-flex gap-1 align-items-center"
                      >
                        <span className={"Bank-show-text-above-table"}>
                          Show
                        </span>

                        <Select
                          options={options}
                          value={dropdownvalue}
                          onChange={handleChangeDropDown}
                          className="select-Bank-field-edit"
                        />

                        <span className={"Bank-show-text-above-table"}>
                          entries
                        </span>
                      </Col>
                    </Row>
                  </span> */}
                  <Table
                    column={columns}
                    rows={bankUserTableData}
                    className="UniversalList-table"
                    scroll={{ y: 230, x: "scroll" }}
                    pagination={false}
                  />
                </Col>
              </Row>
            </Paper>
          </Col>
        </Row>
      </section>
      <Modal
        show={updateModal}
        setShow={setUpdateModal}
        size="lg"
        className={"modaldialog modal-Update"}
        modalHeaderClassName="d-none"
        modalFooterClassName="modal-update-footer"
        onHide={closeUpdateModal}
        ModalBody={
          <Row>
            <Col lg={12} md={12} sm={12}>
              <p className="update-modal-heading">
                Are you sure want to update?
              </p>
            </Col>
          </Row>
        }
        ModalFooter={
          <Row>
            <Col
              lg={12}
              md={12}
              sm={12}
              className="d-flex justify-content-center"
            >
              <Button
                icon={
                  <>
                    <span>Proceed</span>
                    <i className="icon-arrow-right"></i>
                  </>
                }
                className="Update-Proceed-btn"
                onClick={handleProceed}
              />
            </Col>
          </Row>
        }
      />
      {editModalSecurity ? (
        <EditBankUserModal
          modalEdit={editModalSecurity}
          editBankUserUpdate={editBankUserUpdate}
          setModalEdit={setEditModalSecurity}
          Roles={roleOptions}
          StatusList={statusOptions}
          branchOptions={branchOptions}
          editBankUserStatus={editBankUserStatus}
          setEditBankUserStatus={setEditBankUserStatus}
          editBankUserBranch={editBankUserBranch}
          setEditBankUserBranch={setEditBankUserBranch}
          editBankUserRole={editBankUserRole}
          setEditBankUserRole={setEditBankUserRole}
          UpdateBtnHandle={UpdateBtnHandle}
          handleDiscard={handleCloseEditBankUserModal}
        />
      ) : null}
      {confirmationModal === true && (
        <ActivateConfirmationModal
          handleYesButton={resetHandlerYes}
          handleNoButton={handleNoButton}
        />
      )}
      {securityReducer.Loading && <Loader />}
    </>
  );
};

export default EditBankUser;
