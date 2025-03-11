import React, { Fragment, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import {
  TextField,
  Button,
  Table,
  Modal,
} from "../../../../components/elements";
// import { Select } from "antd";
import Select from "react-select";
import "./EditModal.css";

const EditModal = ({
  modalEdit,
  modalEditState,
  setModalEditState,
  setModalEdit,
  Role,
  StatusData,
  UpdateButtonOnClick,
  SelectRoleChangeHandler,
  SelectStatusChangeHandler,
  onChangeTextFieldHandler,
}) => {
  // for select role state
  const [selectedRole, setSelectedRole] = useState(null);

  // for close modal handler
  const closeEditModal = async () => {
    setModalEdit(false);
  };

  const options = [
    { value: "1", label: "Dealer" },
    { value: "2", label: "Treasury" },
    { value: "3", label: "Branch" },
  ];

  const handleSelectRoleChange = (selectedOption) => {
    setSelectedRole(selectedOption.value); // update state with selected value
    SelectRoleChangeHandler(selectedOption);
  };

  return (
    <Fragment>
      <Modal
        show={modalEdit}
        setShow={setModalEdit}
        className="modaldialog modal-Edit-styles"
        modalHeaderClassName={"header-Edit-Modal-close-btn"}
        modalFooterClassName="modal-footer-edit"
        size="lg"
        onHide={closeEditModal}
        ModalBody={
          <Fragment>
            {modalEdit ? (
              <Fragment>
                <Row>
                  <Col
                    lg={12}
                    md={12}
                    sm={12}
                    className="d-flex justify-content-center"
                  >
                    <label className="Modal-Title-Heading">Edit User</label>
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col
                    lg={12}
                    md={12}
                    sm={12}
                    className="d-flex justify-content-start"
                  ></Col>
                </Row>

                <Row>
                  <Col lg={12} md={12} sm={12}>
                    <TextField
                      name="Email"
                      value={modalEditState.Email.value}
                      label={<small className="email-heading">Email</small>}
                      onChange={onChangeTextFieldHandler}
                      placeholder="mindscollide.aamir@hbl.com"
                      className="textfield-edit-modal"
                      disable={true}
                    />
                  </Col>
                </Row>

                <Row className="mt-3">
                  <Col lg={6} md={6} sm={12}>
                    <label className="select-labels">Select Role</label>
                    <Select
                      placeholder="Select Role"
                      className="select-role"
                      value={modalEditState.selectRole}
                      options={options}
                      onChange={handleSelectRoleChange}
                    />
                  </Col>
                  <Col lg={6} md={6} sm={12}>
                    <label className="select-labels">Select Status </label>
                    <Select
                      value={modalEditState.selectStatus}
                      placeholder="Select Status"
                      className="select-status"
                      options={StatusData}
                      onChange={SelectStatusChangeHandler}
                    />
                  </Col>
                </Row>
                {selectedRole === "3" && (
                  <>
                    <Row className="mt-2">
                      <Col lg={12} md={12} sm={12}>
                        <label className="select-labels">Select Branch</label>
                        <Select
                          name="BranchField"
                          // value={modalEditState.BranchField?.value}
                          placeholder="Select Branch"
                          // onChange={onChangeTextFieldHandler}
                          className="select-status"
                        />
                      </Col>
                    </Row>
                  </>
                )}
              </Fragment>
            ) : null}
          </Fragment>
        }
        ModalFooter={
          <Fragment>
            <Row className="mb-3">
              <Col lg={12} md={12} sm={12} className="footer-btn-col">
                <Button
                  icon={<i className="icon-refresh icon-right"></i>}
                  text="Update"
                  className="update-btn-editModal"
                  onClick={UpdateButtonOnClick}
                />
                <Button
                  icon={<i className="icon-close icon-right"></i>}
                  text="Discard"
                  className="discard-btn-editModal"
                  onClick={closeEditModal}
                />
              </Col>
            </Row>
          </Fragment>
        }
      />
    </Fragment>
  );
};

export default EditModal;
