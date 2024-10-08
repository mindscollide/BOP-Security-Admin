import React, { Fragment } from "react";
import { Container, Col, Row } from "react-bootstrap";
import {
  TextField,
  Button,
  Table,
  Modal,
} from "../../../../components/elements";
import "./AcceptModal.css";

const AcceptModal = ({
  ModalTitle,
  modalAccept,
  setModalAccept,
  acceptHandler,
}) => {
  // for close modal handler
  const closeAcceptModal = () => {
    setModalAccept(false);
  };
  return (
    <Fragment>
      <Modal
        show={modalAccept}
        setShow={setModalAccept}
        className="modaldialog modal-Accept-styles"
        modalHeaderClassName={"d-none"}
        modalFooterClassName="modal-accept-footer"
        size="lg"
        onHide={closeAcceptModal}
        ModalBody={
          <Fragment>
            {modalAccept ? (
              <Fragment>
                <Row className="mt-2">
                  <Col
                    lg={12}
                    md={12}
                    sm={12}
                    className="d-flex justify-content-center"
                  >
                    <p className="confirmation-heading">Confirmation</p>
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col
                    lg={12}
                    md={12}
                    sm={12}
                    className="CreateModal textAreaDiv"
                  >
                    <p className="paragraph-accepting">
                      Are you sure you want to do this action?
                    </p>
                  </Col>
                </Row>
              </Fragment>
            ) : null}
          </Fragment>
        }
        ModalFooter={
          <Fragment>
            <Row className="mb-3">
              <Col lg={12} md={12} sm={12} className="footer-create-btn-col">
                <Button
                  text="Yes"
                  className="proceed-btn"
                  icon={<i class="icon-check icon-right"></i>}
                  onClick={acceptHandler}
                />
                <Button
                  text="No"
                  className="discard-accept-btn"
                  onClick={closeAcceptModal}
                  icon={<i class="icon-close icon-right"></i>}
                />
              </Col>
            </Row>
          </Fragment>
        }
      />
    </Fragment>
  );
};

export default AcceptModal;
