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

import EditCorporateModal from "../../Pages/Modals/Edit-Corporate-User-Modal/EditCorporateModal";
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

  const [dropdownvalue, setDropdownvalue] = useState({
    value: 50,
    label: "50",
  });

  // state for edit user
  const [editUser, setEditUser] = useState({
    CorporateName: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    email: {
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

    if (name === "CorporateName" && value !== "") {
      console.log("valuevalueemailvaluevalueemail", value);
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      if (valueCheck !== "") {
        setEditUser({
          ...editUser,
          CorporateName: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "CorporateName" && value === "") {
      setEditUser({
        ...editUser,
        CorporateName: {
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

    if (name === "LoginID" && value !== "") {
      let valueCheck = value.replace(/[^\d]/g, "");
      if (valueCheck !== "") {
        setEditUser({
          ...editUser,
          LoginID: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "LoginID" && value === "") {
      setEditUser({
        ...editUser,
        LoginID: { value: "", errorMessage: "", errorStatus: false },
      });
    }

    if (name === "Name" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      if (valueCheck !== "") {
        setEditUser({
          ...editUser,
          Name: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "Name" && value === "") {
      setEditUser({
        ...editUser,
        Name: { value: "", errorMessage: "", errorStatus: false },
      });
    }
  };

  //reset handler for edit user
  const resetHandler = () => {
    setEditUser({
      ...editUser,
      CorporateName: {
        value: "",
      },

      LoginID: {
        value: "",
      },

      Name: {
        value: "",
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
      CorporateName: "AfrozAhmed",
      loginID: "Asadnaqvi12@gmail.com",
      name: "Asad",
    },
    {
      key: "2",
      CorporateName: "AfrozAhmed",
      loginID: "Aunnaqvi33@gmail.com",
      name: "Aun",
    },
    {
      key: "3",
      CorporateName: "AfrozAhmed",
      loginID: "Aunnaqvi33@gmail.com",
      name: "Aun",
    },
  ];

  const columns = [
    {
      title: <label className="bottom-table-header">Corporate Name</label>,
      dataIndex: "CorporateName",
      key: "CorporateName",
      align: "left",
      ellipsis: true,
    },
    {
      title: <label className="bottom-table-header">LoginID</label>,
      dataIndex: "loginID",
      key: "loginID",
      align: "left",
      ellipsis: true,
    },
    {
      title: <label className="bottom-table-header">Name</label>,
      dataIndex: "name",
      key: "name",
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
            {/* <i className="icon-lock edit-user-enabled"></i> */}
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

  const paginationConfig = {
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

  const options = [
    { value: 50, label: "50" },
    { value: 100, label: "100" },
    { value: 150, label: "150" },
  ];

  const UpdateBtnHandle = () => {
    setEditModalSecurity(false);
    setUpdateModal(true);
  };

  const handleChangeDropDown = (value) => {
    setDropdownvalue(value);
  };

  return (
    <>
      <section className="edit-user-container">
        <Row>
          <Col lg={12} md={12} sm={12}>
            <div className="edit-user-label">Edit Corporate User</div>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col lg={12} md={12} sm={12}>
            <Paper className="span-edit-user">
              <Row className="mt-3">
                <Col lg={2} md={2} sm={12} className="pe-0">
                  <TextField
                    name="CorporateName"
                    className="text-fields-Corporate-edituser"
                    labelClass="d-none"
                    placeholder="Corporate Name"
                    maxLength={100}
                    value={editUser.CorporateName.value}
                    onChange={editUserValidateHandler}
                  />
                </Col>
                <Col lg={2} md={2} sm={12} className="pe-0">
                  <TextField
                    name="LoginID"
                    className="text-fields-Corporate-edituser"
                    labelClass="d-none"
                    maxLength={100}
                    placeholder="Login ID"
                    value={editUser.LoginID.value}
                    onChange={editUserValidateHandler}
                  />
                </Col>
                <Col lg={2} md={2} sm={12} className="pe-0">
                  <TextField
                    name="Name"
                    labelClass="d-none"
                    maxLength={100}
                    className="text-fields-Corporate-edituser"
                    placeholder="Name"
                    value={editUser.Name.value}
                    onChange={editUserValidateHandler}
                  />
                </Col>
                <Col lg={2} md={2} sm={12} className="pe-0">
                  <Select
                    name="statusID"
                    className="edit-Corporate-user-select-status"
                    placeholder="Status"
                    options={editSelectStatus}
                    value={editSelectStatusValue}
                  />
                </Col>

                <Col lg={4} md={12} sm={12}>
                  <Button
                    icon={<i className="icon-search icon-search-space"></i>}
                    text="Search"
                    className="search-Corporate-Edit-User-btn"
                  />
                  <Button
                    icon={<i className="icon-refresh icon-reset-space"></i>}
                    text="Reset"
                    onClick={resetHandler}
                    className="reset-Corporate-Edit-User-btn"
                  />

                  <Button
                    icon={<i className="icon-download icon-reset-space"></i>}
                    text="Export"
                    className="export-Corporate-Edit-User-btn"
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
                        <span className={"corporate-show-text-above-table"}>
                          Show
                        </span>

                        <Select
                          options={options}
                          value={dropdownvalue}
                          onChange={handleChangeDropDown}
                          className="select-Bank-field-edit"
                        />

                        <span className={"corporate-show-text-above-table"}>
                          entries
                        </span>
                      </Col>
                    </Row>
                  </span>
                  <Table
                    column={columns}
                    rows={dataSource}
                    className="Edituser-table"
                    pagination={paginationConfig}
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
        <EditCorporateModal
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
