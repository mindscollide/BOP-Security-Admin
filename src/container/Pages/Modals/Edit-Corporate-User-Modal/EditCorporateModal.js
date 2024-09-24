import React, { Fragment } from "react";
import { Container, Col, Row } from "react-bootstrap";
import {
  TextField,
  Button,
  Table,
  Modal,
} from "../../../../components/elements";
// import { Select } from "antd";
import Select from "react-select";
import "./EditCorporateModal.css";

const EditCorporateModal = ({
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
  // for close modal handler
  const closeEditModal = async () => {
    setModalEdit(false);
  };

  return (
    <Fragment>
      <Modal
        show={modalEdit}
        setShow={setModalEdit}
        className="modaldialog modal-Corporate-Edit-styles"
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
                      placeholder="mindscollide.aamir@hbl.com"
                      label={<small className="email-heading">Email</small>}
                      onChange={onChangeTextFieldHandler}
                      className="textfield-edit-modal"
                      disable={true}
                    />
                  </Col>
                </Row>

                <Row className="mt-3">
                  <Col lg={12} md={12} sm={12}>
                    <label className="select-labels">Select Status</label>
                    <Select
                      value={modalEditState.selectStatus}
                      placeholder="Select Status"
                      className="select-status"
                      options={StatusData}
                      onChange={SelectStatusChangeHandler}
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
                  icon={<i class="icon-refresh icon-right"></i>}
                  text="Update"
                  className="update-btn-editModal"
                  onClick={UpdateButtonOnClick}
                />
                <Button
                  icon={<i class="icon-close icon-right"></i>}
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

export default EditCorporateModal;
