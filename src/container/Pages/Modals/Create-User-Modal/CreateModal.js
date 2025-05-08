import React, { Fragment, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import {
  TextField,
  Button,
  Table,
  Modal,
} from "../../../../components/elements";
import { Select } from "antd";
import "./CreateModal.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  getNewBankUserRequestApi,
  getNewCorporateUserRequestApi,
  rejectUserRequestApi,
} from "../../../../store/actions/Security_Admin";
// import { getRejectUser } from "../../../../store/actions/Security_Admin";

const CreateModal = ({
  ModalTitle,
  modalReject,
  setModalReject,
  rejectUserData,
}) => {
  // states for comment field
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Error bar states
  const [errorShow, setErrorShow] = useState(false);

  // console.log("userRegestrationID", rejectUserData);
  // // state for comment field state
  // const [commentField, setCommentField] = useState({
  //   commentType: {
  //     value: "",
  //     errorMessage: "",
  //     errorStatus: false,
  //   },
  // });

  // const commentHandler = (e) => {
  //   let name = e.target.name;
  //   let value = e.target.value;

  //   if (name === "commentType" && value !== "") {
  //     setCommentField({
  //       ...commentField,
  //       commentType: {
  //         value: value.trimStart(),
  //         errorMessage: "",
  //         errorStatus: false,
  //       },
  //     });
  //   } else if (name === "commentType" && value === "") {
  //     setCommentField({
  //       ...commentField,
  //       commentType: { value: "", errorMessage: "", errorStatus: false },
  //     });
  //   }
  // };

  // for close modal handler
  const closeRejectModal = () => {
    setModalReject(false);
  };
  const handleRejectUserRequest = () => {
    if (rejectUserData !== "") {
      setErrorShow(false);
      // console.log(rejectUserData, "rejectUserDatarejectUserDatarejectUserData");
      let Data = {
        UserRegistrationRequestID: rejectUserData,
      };
      // console.log(Data, "rejectUserDatarejectUserDatarejectUserData");
      dispatch(rejectUserRequestApi(navigate, Data, setModalReject));
    } else {
      setErrorShow(true);
    }
  };
  return (
    <Fragment>
      <Modal
        show={modalReject}
        setShow={setModalReject}
        className='modaldialog modal-Reject-styles'
        modalHeaderClassName={"header-Reject-Modal-close-btn"}
        modalFooterClassName='modal-Reject-footer'
        size='lg'
        onHide={closeRejectModal}
        ModalBody={
          <Fragment>
            {modalReject ? (
              <Fragment>
                <Row>
                  <Col
                    lg={12}
                    md={12}
                    sm={12}
                    className='d-flex justify-content-center'>
                    <label className='edit-Reject-label'>Reject User</label>
                  </Col>
                </Row>

                <Row className='mt-3'>
                  <Col
                    lg={12}
                    md={12}
                    sm={12}
                    className='d-flex justify-content-center'>
                    <p className='paragraph-accepting'>
                      Are you sure you want to do this action?
                    </p>
                  </Col>
                </Row>

                {/* <Row className="mt-2">
                <label>
                  <small className="Type-commet-heading">
                    Type your comment{" "}
                    <span className="required-color "> * </span>
                  </small>
                </label>
                <Col
                  lg={12}
                  md={12}
                  sm={12}
                  className="CreateModal textAreaDiv"
                >
                  <TextField
                    name={"commentType"}
                    maxLength={500}
                    value={commentField.commentType.value}
                    onChange={commentHandler}
                    type="text"
                    as={"textarea"}
                    className="textfield-Reject-modal"
                  />
                </Col>
                <Row>
                  <Col className="d-flex justify-content-start">
                    <p
                      className={
                        errorShow && commentField.commentType.value === ""
                          ? "errorMessage"
                          : "errorMessage_hidden"
                      }
                    >
                      Comment is required
                    </p>
                  </Col>
                </Row>
              </Row> */}
              </Fragment>
            ) : null}
          </Fragment>
        }
        ModalFooter={
          <Fragment>
            <Row className='mb-3'>
              <Col lg={12} md={12} sm={12} className='footer-create-btn-col'>
                <Button
                  icon={<i className='icon-refresh icon-right'></i>}
                  text='Yes'
                  className='update-btn'
                  onClick={handleRejectUserRequest}
                />

                <Button
                  icon={<i className='icon-close icon-right'></i>}
                  text='No'
                  className='discard-btn'
                  onClick={closeRejectModal}
                />
              </Col>
            </Row>
          </Fragment>
        }
      />
    </Fragment>
  );
};

export default CreateModal;
