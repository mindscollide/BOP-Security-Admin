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
import "./CorporateUser.css";

const EditUser = () => {
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

  // state for edit user
  const [editUser, setEditUser] = useState({
    userLdapAccount: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    email: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    firstName: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    lastName: {
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

    if (name === "userLdapAccount" && value !== "") {
      console.log("valuevalueemailvaluevalueemail", value);
      if (value !== "") {
        setEditUser({
          ...editUser,
          userLdapAccount: {
            value: value.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "userLdapAccount" && value === "") {
      setEditUser({
        ...editUser,
        userLdapAccount: {
          value: "",
          errorMessage: "",
          errorStatus: true,
        },
      });
    }
    if (name === "email" && value !== "") {
      console.log("valuevalueemailvaluevalueemail", value);
      if (value !== "") {
        setEditUser({
          ...editUser,
          email: {
            value: value.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "email" && value === "") {
      setEditUser({
        ...editUser,
        email: {
          value: "",
          errorMessage: "",
          errorStatus: true,
        },
      });
    }

    if (name === "firstName" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      if (valueCheck !== "") {
        setEditUser({
          ...editUser,
          firstName: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "firstName" && value === "") {
      setEditUser({
        ...editUser,
        firstName: { value: "", errorMessage: "", errorStatus: false },
      });
    }

    if (name === "lastName" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      if (valueCheck !== "") {
        setEditUser({
          ...editUser,
          lastName: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "lastName" && value === "") {
      setEditUser({
        ...editUser,
        lastName: { value: "", errorMessage: "", errorStatus: false },
      });
    }
  };

  //reset handler for edit user
  const resetHandler = () => {
    setEditUser({
      ...editUser,
      email: {
        value: "",
      },
      userLdapAccount: {
        value: "",
      },

      firstName: {
        value: "",
      },

      lastName: {
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
      employeeID: "1",
      userLDAPAccount: "aunnaqvi12@gmail.com",
      firstName: "Aun",
      address: "10 Downing Street",
      lastName: "Naqvi",
      BranchName: "Peshawar",
      userRoleID: "Data Entry - Business Team",
    },
    {
      key: "2",
      employeeID: "2",
      userLDAPAccount: "johnnaqvi33@gmail.com",
      firstName: "Saif",
      lastName: "Naqvi",
      BranchName: "Saddar",
      userRoleID: "Data Entry - Business Team",
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
      title: <label className="bottom-table-header">Login ID</label>,
      dataIndex: "userLDAPAccount",
      key: "userLDAPAccount",
      align: "left",
      ellipsis: true,
    },
    {
      title: <label className="bottom-table-header">First Name</label>,
      dataIndex: "firstName",
      key: "firstName",
      align: "center",
      ellipsis: true,
    },
    {
      title: <label className="bottom-table-header">Last Name</label>,
      dataIndex: "lastName",
      key: "lastName",
      align: "center",
      ellipsis: true,
    },
    {
      title: <label className="bottom-table-header">Role</label>,
      dataIndex: "userRoleID",
      key: "userRoleID",
      align: "center",
      ellipsis: true,
    },
    {
      title: <label className="bottom-table-header">Branch</label>,
      dataIndex: "BranchName",
      key: "BranchName",
      align: "center",
      ellipsis: true,
    },
    {
      title: <label className="bottom-table-header">Status</label>,
      dataIndex: "userStatusID",
      key: "userStatusID",
      ellipsis: true,
      align: "center",
      render: (text, record) => {
        return (
          <>
            <i className="icon-check edit-user-enabled"></i>
          </>
        );
      },
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

  const UpdateBtnHandle = () => {
    setEditModalSecurity(false);
    setUpdateModal(true);
  };

  return (
    <>
      <section className="edit-user-container">
        <Row>
          <Col lg={12} md={12} sm={12}>
            <div className="edit-user-label">Corporate User</div>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col lg={12} md={12} sm={12}>
            <Paper className="span-edit-user">
              <Row className="mt-3">
                <Col lg={3} md={3} sm={12} className="pe-0">
                  <TextField
                    name="userLdapAccount"
                    className="text-fields-edituser"
                    labelClass="d-none"
                    placeholder="Login ID"
                    maxLength={100}
                    value={editUser.userLdapAccount.value}
                    onChange={editUserValidateHandler}
                  />
                </Col>
                <Col lg={3} md={3} sm={12} className="pe-0">
                  <TextField
                    name="firstName"
                    className="text-fields-edituser"
                    labelClass="d-none"
                    maxLength={100}
                    placeholder="First Name"
                    value={editUser.firstName.value}
                    onChange={editUserValidateHandler}
                  />
                </Col>
                <Col lg={3} md={3} sm={12} className="pe-0">
                  <TextField
                    name="lastName"
                    labelClass="d-none"
                    maxLength={100}
                    className="text-fields-edituser"
                    placeholder="Last Name"
                    value={editUser.lastName.value}
                    onChange={editUserValidateHandler}
                  />
                </Col>
                <Col lg={3} md={3} sm={12}>
                  <Select
                    name="roleID"
                    options={editSelectRole}
                    className="select-field-edit"
                    placeholder="Role"
                    value={editSelectRoleValue}
                  />
                </Col>
              </Row>

              <Row>
                <Col lg={3} md={3} sm={12} className="pe-0">
                  <Select
                    name="statusID"
                    className="edit-user-select-status"
                    placeholder="Status"
                    options={editSelectStatus}
                    value={editSelectStatusValue}
                  />
                </Col>

                <Col lg={6} md={6} sm={12}>
                  <Button
                    icon={<i className="icon-search icon-search-space"></i>}
                    text="Search"
                    className="search-Edit-User-btn"
                  />
                  <Button
                    icon={<i className="icon-refresh icon-reset-space"></i>}
                    text="Reset"
                    onClick={resetHandler}
                    className="reset-Edit-User-btn"
                  />
                </Col>
              </Row>

              <Row className="mt-4">
                <Col lg={12} md={12} sm={12}>
                  <Table
                    column={columns}
                    rows={dataSource}
                    className="Edituser-table"
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

export default EditUser;
