import React, { Fragment } from "react";
import { Col, Row } from "react-bootstrap";
import { TextField, Button, Modal } from "../../../../components/elements";
// import { Select } from "antd";
import Select from "react-select";
import "./EditBankUserModal.css";

const EditBankUserModal = ({
  modalEdit,
  editBankUserUpdate,
  setModalEdit,
  Roles,
  StatusList,
  editBankUserStatus,
  editBankUserRole,
  setEditBankUserRole,
  setEditBankUserStatus,
  UpdateBtnHandle,
  branchOptions,
  editBankUserBranch,
  setEditBankUserBranch,
  handleDiscard,
}) => {
  return (
    <Fragment>
      <Modal
        show={modalEdit}
        setShow={handleDiscard}
        className="modaldialog bank-user-modal-Edit-styles"
        modalHeaderClassName={"header-Edit-Modal-close-btn"}
        modalFooterClassName="modal-footer-edit"
        size="md"
        onHide={handleDiscard}
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
                    <label className="Modal-Title-Heading">
                      Edit Bank User
                    </label>
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
                      value={editBankUserUpdate.email}
                      label={<small className="email-heading">Email</small>}
                      className="disableEditBankModalText"
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
                      options={Roles}
                      value={editBankUserRole}
                      onChange={(selectedVal) => {
                        setEditBankUserRole(selectedVal);
                        setEditBankUserBranch({
                          value: 0,
                          label: "",
                        });
                      }}
                    />
                  </Col>
                  <Col lg={6} md={6} sm={12}>
                    <label className="select-labels">Select Status</label>
                    <Select
                      value={editBankUserStatus}
                      placeholder="Select Status"
                      className="select-status"
                      options={StatusList}
                      onChange={(selectedVal) => {
                        setEditBankUserStatus(selectedVal);
                      }}
                    />
                  </Col>
                </Row>
                {editBankUserRole.value === 9 && (
                  <Row className="mt-3">
                    <Col
                      lg={12}
                      md={12}
                      sm={12}
                      className="flex-column flex-wrap"
                    >
                      <label className="select-labels">Select Branch</label>
                      <Select
                        options={branchOptions}
                        placeholder="Select Branch"
                        value={editBankUserBranch}
                        onChange={(selectedVal) => {
                          setEditBankUserBranch(selectedVal);
                        }}
                        isSearchable={true}
                        // menuPortalTarget={document.body}
                      />
                    </Col>
                  </Row>
                )}
              </Fragment>
            ) : null}
          </Fragment>
        }
        ModalFooter={
          <Fragment>
            <Row className="mb-3 mt-3">
              <Col lg={12} md={12} sm={12} className="footer-btn-col">
                <Button
                  icon={<i className="icon-refresh icon-right"></i>}
                  text="Update"
                  className="update-btn-editModal"
                  onClick={UpdateBtnHandle}
                  disableBtn={
                    editBankUserRole.value !== 9 &&
                    editBankUserStatus.value &&
                    editBankUserBranch.value === 0
                      ? false
                      : editBankUserRole.value === 9 &&
                        editBankUserBranch.value !== 0 &&
                        editBankUserStatus
                      ? false
                      : true
                  }
                />
                <Button
                  icon={<i className="icon-close icon-right"></i>}
                  text="Discard"
                  className="discard-btn-editModal"
                  onClick={handleDiscard}
                />
              </Col>
            </Row>
          </Fragment>
        }
      />
    </Fragment>
  );
};

export default EditBankUserModal;
