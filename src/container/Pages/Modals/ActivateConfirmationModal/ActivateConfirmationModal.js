import React from "react";
import styles from "./ActivateConfirmationModal.module.css";
import { useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import { Button, Modal } from "../../../../components/elements";

const ActivateConfirmationModal = ({ handleYesButton, handleNoButton }) => {
  console.log(handleYesButton, "onConfirmonConfirm");

  const showActivationMOdal = useSelector(
    (state) => state.securityModalReducer.confirmationModal
  );
  console.log(showActivationMOdal, "showActivationMOdal");
  // //handle No Button
  // const handleNoButton = () => {
  //   dispatch(ConfirmationModalSystemAdmin(false));
  // };

  return (
    <Modal
      show={showActivationMOdal}
      className="UniversalBOPModalStyles"
      modalHeaderClassName={"d-none"}
      modalFooterClassName="UniversalBOPModalStylesfooter"
      size="md"
      onHide={handleNoButton}
      ModalBody={
        <>
          <Row>
            <Col lg={12} md={12} sm={12}>
              <span className={styles["AddBranchLabel"]}>Confirmation</span>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col
              lg={12}
              md={12}
              sm={12}
              className="d-flex justify-content-center"
            >
              <span className={styles["labels-add-bank"]}>
                Are you sure you want to do this action?
              </span>
            </Col>
          </Row>
        </>
      }
      ModalFooter={
        <Row className="mb-3">
          <Col
            lg={12}
            md={12}
            sm={12}
            className="d-flex justify-content-center gap-2"
          >
            <Button
              icon={<i className="icon-check"></i>}
              text={"Yes"}
              className={styles["AddBranchClass"]}
              iconClass={styles["IconClass"]}
              onClick={handleYesButton}
            />

            <Button
              icon={<i className="icon-close"></i>}
              text={"No"}
              className={styles["CancelButton"]}
              iconClass={styles["IconClass"]}
              onClick={handleNoButton}
            />
          </Col>
        </Row>
      }
    />
  );
};

export default ActivateConfirmationModal;
