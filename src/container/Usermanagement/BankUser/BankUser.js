import React, { Fragment, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import {
  TextField,
  Button,
  Table,
  Paper,
  Loader,
  Modal,
} from "../../../components/elements";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

import EditModal from "../../Pages/Modals/Edit-User-Modal/EditModal";
import "./BankUser.css";
import {
  bankModalEditStateSchema,
  searchEditBankUserSchema,
} from "../../../utils/schemas";
import { ConfirmationModalSecurityAdmin } from "../../../store/actions/Security_Admin_Modal";
import ActivateConfirmationModal from "../../../helpers/Modals/ActivateConfirmationModal";
import {
  GetAllUserStatusAPI,
  RoleListAPI,
} from "../../../store/actions/Auth_Actions";

const BankUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { securityReducer } = useSelector((state) => state);
  //Search all corporate Users
  const SearchBankUsers = useSelector(
    (state) => state.securityReducer.SearchBankUsersData
  );

  // Get all user status selector
  const GetAllUserStatus = useSelector((state) => state.auth.allUserStatusData);

  //Role List
  const RoleList = useSelector((state) => state.auth.RoleList);

  // state for edit bank user
  const [BankEditUser, setBankEditUser] = useState(searchEditBankUserSchema);

  // state for Modal Edit Bank User
  const [modalEditState, setModalEditState] = useState(
    bankModalEditStateSchema
  );

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

  const [dropdownvalue, setDropdownvalue] = useState({
    value: 50,
    label: "50",
  });

  const options = [
    { value: 50, label: "50" },
    { value: 100, label: "100" },
    { value: 150, label: "150" },
  ];

  const onchangeModalTextFieldsHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "Email" && value !== "") {
      if (value !== "") {
        setModalEditState({
          ...modalEditState,
          Email: {
            value: value.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "Email" && value === "") {
      setModalEditState({
        ...modalEditState,
        Email: {
          value: "",
          errorMessage: "",
          errorStatus: true,
        },
      });
    }

    if (name === "FirstName" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      console.log("valueCheckvalueCheck", valueCheck);
      if (valueCheck !== "") {
        setModalEditState({
          ...modalEditState,
          FirstName: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "FirstName" && value === "") {
      setModalEditState({
        ...modalEditState,
        FirstName: { value: "", errorMessage: "", errorStatus: false },
      });
    }

    if (name === "LastName" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      console.log("valueCheckvalueCheck", valueCheck);
      if (valueCheck !== "") {
        setModalEditState({
          ...modalEditState,
          LastName: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "LastName" && value === "") {
      setModalEditState({
        ...modalEditState,
        LastName: { value: "", errorMessage: "", errorStatus: false },
      });
    }
  };

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
      let valueCheck = value.replace(/[^\d]/g, "");
      if (valueCheck !== "") {
        setBankEditUser({
          ...BankEditUser,
          LoginID: {
            value: valueCheck.trimStart(),
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

    setBankEditUser((prevState) => ({
      ...prevState,
      statusID: { ...prevState.statusID, value: selectedStatus.value },
    }));
  };

  //handle select RoleID
  const handleSelectRole = async (selectedRole) => {
    setRoleID(selectedRole);

    setBankEditUser((prevState) => ({
      ...prevState,
      roleID: { ...prevState.roleID, value: selectedRole.value },
    }));
  };

  //Handle Select Role for Edit Modal
  const handleEditModalRole = (option) => {
    console.log("Role Option is:", option);

    setModalEditState({
      ...modalEditState,
      selectRole: {
        label: option.label,
        value: option.value,
      },
    });
  };

  const handleEditModalStatus = (option) => {
    console.log("Staus Option is:", option);
    setModalEditState({
      ...modalEditState,
      selectStatus: {
        label: option.label,
        value: option.value,
      },
    });
  };

  //reset handler for edit user
  const resetHandler = () => {
    dispatch(ConfirmationModalSecurityAdmin(true));
  };

  // show error message When user hit activate btn
  const resetHandlerYes = () => {
    setBankEditUser({
      ...BankEditUser,

      EmployeeID: { value: "", errorMessage: "", errorStatus: false },
      LoginID: { value: "", errorMessage: "", errorStatus: false },
      Name: { value: "", errorMessage: "", errorStatus: false },
      Role: { value: "", errorMessage: "", errorStatus: false },
      statusID: { value: "", errorMessage: "", errorStatus: false },
    });
    setStatusID({
      value: 0,
      label: "",
    });
    setRoleID({
      value: 0,
      label: "",
    });
  };

  //onClose modal
  const closeUpdateModal = () => {
    setUpdateModal(false);
  };

  const dataSource = [
    {
      key: "1",
      employeeID: "01",
      loginId: "aunnaqvi12@gmail.com",
      name: "Aun",
      userRoleID: "Dealer",
      BranchName: "-",
      userStatusID: <i className="icon-check edit-user-enabled"></i>,
    },
    {
      key: "2",
      employeeID: "02",
      loginId: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa@",
      name: "123456789012345678901",
      userRoleID: "Branch",
      BranchName: "1234-Saddar",
      userStatusID: <i className="icon-lock Icon-Lock-color"></i>,
    },
    {
      key: "3",
      employeeID: "03",
      loginId: "bilalnaqvi33@gmail.com",
      name: "Bilal",
      userRoleID: "Branch",
      BranchName: "-",
      userStatusID: <i className="icon-lock Icon-Lock-color"></i>,
    },
  ];

  const columns = [
    {
      title: <label className="bottom-table-header">Employee ID</label>,
      dataIndex: "employeeID",
      key: "employeeID",
      align: "left",
      ellipsis: true,
    },
    {
      title: <label className="bottom-table-header">LoginID</label>,
      dataIndex: "loginId",
      key: "loginId",
      align: "left",
      width: "260px",
      ellipsis: true,
    },
    {
      title: <label className="bottom-table-header">Empolyee Name</label>,
      dataIndex: "name",
      key: "name",
      width: "190px",
      align: "left",
      ellipsis: true,
    },
    {
      title: <label className="bottom-table-header">Role</label>,
      dataIndex: "userRoleID",
      key: "userRoleID",
      align: "left",
      ellipsis: true,
    },
    {
      title: <label className="bottom-table-header">Branch</label>,
      dataIndex: "BranchName",
      key: "BranchName",
      width: "190px",
      align: "left",
      ellipsis: true,
    },
    {
      title: <label className="bottom-table-header">Status</label>,
      dataIndex: "userStatusID",
      key: "userStatusID",
      ellipsis: true,
      align: "center",
    },
    {
      title: <label className="bottom-table-header">Edit</label>,
      dataIndex: "edit",
      key: "edit",
      ellipsis: true,
      align: "center",
      render: (text, record) => {
        return (
          <label
            className="edit-update-column"
            onClick={() => setEditModalSecurity(true)}
          >
            <i className="icon-edit edit-user-icon-color" />
          </label>
        );
      },
    },
  ];

  const paginationBankConfig = {
    itemRender: (_, type, originalElement) => {
      if (type === "prev") {
        return <href className="Previous-pagination">Previous</href>;
      }
      if (type === "next") {
        return <href className="Previous-pagination">Next</href>;
      }
      return originalElement;
    },
    // other pagination settings like current, pageSize, etc.
  };

  const handleChangeDropDown = (value) => {
    setDropdownvalue(value);
  };

  const UpdateBtnHandle = () => {
    setEditModalSecurity(false);
    setUpdateModal(true);
  };

  const handleSearch = () => {
    let data = {
      employeeID: BankEditUser.EmployeeID.value,
      loginId: BankEditUser.LoginID.value,
      name: BankEditUser.Name.value,
      userRoleID: roleID.roleID,
      userStatusID: statusID.statusID,
    };
    console.log("data is: ", data);
  };

  const handleProceed = () => {
    console.log("Proceed clicked");
    const data = {
      SelectRole: modalEditState.selectRole.value,
      selectStatus: modalEditState.selectStatus.value.value,
    };

    console.log("data to store is: ", data);
    // dispatch();
  };

  useEffect(() => {
    dispatch(GetAllUserStatusAPI(navigate));
    dispatch(RoleListAPI(navigate));
  }, []);

  useEffect(() => {
    if (GetAllUserStatus !== null) {
      try {
        let newUserStatusData = GetAllUserStatus.status.map((status) => {
          return {
            ...status,
            value: { value: status.statusID },
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
  }, [GetAllUserStatus, RoleList]);

  return (
    <>
      <section className="edit-user-container">
        <Row>
          <Col lg={12} md={12} sm={12}>
            <div className="edit-user-label">Edit Bank User</div>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col lg={12} md={12} sm={12}>
            <Paper className="span-edit-user">
              <Row className="mt-3">
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

                <Col lg={9} md={9} sm={12}>
                  <Button
                    icon={<i className="icon-search icon-search-space"></i>}
                    text="Search"
                    className="search-Bank-Edit-User-btn"
                    onClick={handleSearch}
                  />
                  <Button
                    icon={<i className="icon-refresh icon-reset-space"></i>}
                    text="Reset"
                    onClick={resetHandler}
                    className="reset-Bank-Edit-User-btn"
                  />

                  <Button
                    icon={<i className="icon-download icon-reset-space"></i>}
                    text="Export"
                    className="export-Bank-Edit-User-btn"
                  />
                </Col>
              </Row>

              <Row className="mt-4">
                <Col lg={12} md={12} sm={12}>
                  <span>
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
                  </span>
                  <Table
                    column={columns}
                    rows={dataSource}
                    className="Edituser-table"
                    pagination={paginationBankConfig}
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
          <Fragment>
            {updateModal ? (
              <Fragment>
                <Row>
                  <Col lg={12} md={12} sm={12}>
                    <p className="update-modal-heading">
                      Are you sure want to update?
                    </p>
                  </Col>
                </Row>
              </Fragment>
            ) : null}
          </Fragment>
        }
        ModalFooter={
          <Fragment>
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
          </Fragment>
        }
      />
      {editModalSecurity ? (
        <EditModal
          modalEdit={editModalSecurity}
          modalEditState={modalEditState}
          setModalEditState={setModalEditState}
          setModalEdit={setEditModalSecurity}
          SelectRoleChangeHandler={handleEditModalRole}
          SelectStatusChangeHandler={handleEditModalStatus}
          Role={roleOptions}
          StatusData={statusOptions}
          UpdateButtonOnClick={UpdateBtnHandle}
          onChangeTextFieldHandler={onchangeModalTextFieldsHandler}
        />
      ) : null}
      <ActivateConfirmationModal onConfirm={resetHandlerYes} />
      {securityReducer.Loading && <Loader />}
    </>
  );
};

export default BankUser;
