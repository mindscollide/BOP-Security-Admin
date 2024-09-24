import React, { Fragment, useEffect, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import {
  TextField,
  Button,
  Table,
  Paper,
  Loader,
  Modal,
  Notification,
} from "../../../components/elements";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

import EditModal from "../../Pages/Modals/Edit-User-Modal/EditModal";
import "./BankUser.css";

const BankUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //edit modal on js-security-admin
  const [editModalSecurity, setEditModalSecurity] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);

  //state for selectRole
  const [editSelectRole, setEditSelectRole] = useState([]);
  const [editSelectRoleValue, setEditSelectRoleValue] = useState([]);

  // state for select Status
  const [editSelectStatus, setEditSelectStatus] = useState([]);
  const [editSelectStatusValue, setEditSelectStatusValue] = useState([]);

  const [dropdownvalue, setDropdownvalue] = useState({
    value: 50,
    label: "50",
  });

  const options = [
    { value: 50, label: "50" },
    { value: 100, label: "100" },
    { value: 150, label: "150" },
  ];

  // state for edit user
  const [BankEditUser, setBankEditUser] = useState({
    EmployeeID: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    LoginID: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    Name: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    roleID: {
      value: 0,
      errorMessage: "",
      errorStatus: false,
    },
    statusID: {
      value: 0,
      errorMessage: "",
      errorStatus: false,
    },
  });

  const [modalEditState, setModalEditState] = useState({
    Email: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    FirstName: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    LastName: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    ldapAccount: "",

    selectRole: {
      value: 0,
      label: "",
      errorMessage: "",
      errorStatus: false,
    },
    selectStatus: {
      value: 0,
      label: "",
      errorMessage: "",
      errorStatus: false,
    },
    userID: 0,
  });

  const onchangeModalTextFieldsHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "Email" && value !== "") {
      console.log("valuevalueemailvaluevalueemail", value);
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

  //reset handler for edit user
  const resetHandler = () => {
    setBankEditUser({
      ...BankEditUser,

      EmployeeID: {
        value: "",
      },

      LoginID: {
        value: "",
      },

      Name: {
        value: "",
      },

      roleID: {
        value: 0,
      },

      statusID: {
        value: 0,
      },
    });
    setEditSelectRoleValue([]);
    setEditSelectStatusValue([]);
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
      loginId: "johnnaqvi33@gmail.com",
      name: "Saif",
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
      width: "400px",
      ellipsis: true,
    },
    {
      title: <label className="bottom-table-header">Empolyee Name</label>,
      dataIndex: "name",
      key: "name",
      align: "center",
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
      align: "left",
      ellipsis: true,
    },
    {
      title: <label className="bottom-table-header">Status</label>,
      dataIndex: "userStatusID",
      key: "userStatusID",
      ellipsis: true,
      align: "center",
      // render: (text, record) => {
      //   return (
      //     <>
      //       <i className="icon-check edit-user-enabled"></i>
      //     </>
      //   );
      // },
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
        return <a className="Previous-pagination">Previous</a>;
      }
      if (type === "next") {
        return <a className="Previous-pagination">Next</a>;
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
                    name="roleID"
                    options={editSelectRole}
                    className="edit-user-select-status"
                    placeholder="Select Role"
                    value={editSelectRoleValue}
                  />
                </Col>
              </Row>

              <Row className="mt-3">
                <Col lg={3} md={3} sm={12} className="pe-0">
                  <Select
                    name="statusID"
                    className="edit-user-select-status"
                    placeholder="Select Status"
                    options={editSelectStatus}
                    value={editSelectStatusValue}
                  />
                </Col>

                <Col lg={9} md={9} sm={12}>
                  <Button
                    icon={<i className="icon-search icon-search-space"></i>}
                    text="Search"
                    className="search-Bank-Edit-User-btn"
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
          Role={editSelectRole}
          StatusData={editSelectStatus}
          UpdateButtonOnClick={UpdateBtnHandle}
          onChangeTextFieldHandler={onchangeModalTextFieldsHandler}
        />
      ) : null}
    </>
  );
};

export default BankUser;
