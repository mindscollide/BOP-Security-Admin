import React, { Fragment } from "react";
import { Col, Row } from "react-bootstrap";
import { TextField, Button, Modal } from "../../../../components/elements";
// import { Select } from "antd";
import Select from "react-select";
import "./EditCorporateModal.css";

const EditCorporateModal = ({
  modalEdit,
  editCorporateUserUpdate,
  setModalEdit,
  StatusData,
  editCorporateUserStatus,
  setEditCorporateUserStatus,
  UpdateBtnHandle,
  handleDiscard,
}) => {
  console.log("editCorporateUserUpdate", editCorporateUserUpdate);
  return (
    <Fragment>
      <Modal
        show={modalEdit}
        setShow={handleDiscard}
        className="modaldialog modal-Corporate-Edit-styles"
        modalHeaderClassName={"header-Edit-Modal-close-btn"}
        modalFooterClassName="modal-footer-edit"
        size="lg"
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
                      value={editCorporateUserUpdate.email}
                      // placeholder="mindscollide.aamir@hbl.com"
                      // onChange={onChangeTextFieldHandler}
                      label={<small className="email-heading">Email</small>}
                      className="textfield-edit-modal"
                      disable={true}
                    />
                  </Col>
                </Row>

                <Row className="mt-3">
                  <Col lg={12} md={12} sm={12}>
                    <label className="select-labels">Select Status</label>
                    <Select
                      value={editCorporateUserStatus}
                      placeholder="Select Status"
                      className="select-status"
                      options={StatusData}
                      onChange={(selectedVal) => {
                        setEditCorporateUserStatus(selectedVal);
                      }}
                    />
                  </Col>
                </Row>
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
                  onClick={UpdateBtnHandle}
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

export default EditCorporateModal;
