import React, { useState, Fragment } from "react";
import { Container, Col, Row, InputGroup, Form } from "react-bootstrap";
import { Button } from "../../../components/elements";
import BOPlogo from "../../../assets/images/BOPlogo.png";
import "./ForgotPassword.css";
import { Link, useNavigate } from "react-router-dom";
import {
  bopEmailValidation,
  encryptField,
} from "../../../commen/functions/utils";
import { useDispatch } from "react-redux";
import { forgotPasswordApi } from "../../../store/actions/Auth_Actions";
const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  //state for login credentials
  // Only true once a submit attempt has actually been made, so the error
  // below the input can show on click even when the field is still empty.
  const [submitted, setSubmitted] = useState(false);

  const isEmailValid = email.trim() !== "" && bopEmailValidation(email.trim());

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!isEmailValid) {
      setSubmitted(true);
      return;
    }

    try {
      const Data = {
        Email: await encryptField(email.trim()),
        RoleID: 5,
      };

      console.log("Forgot Password Data:", Data);

      dispatch(forgotPasswordApi(navigate, Data));
    } catch (error) {
      console.error("Forgot password error:", error);
    }
  };

  return (
    <Fragment>
      <Col sm={12} lg={12} md={12} className='sign-in'>
        <Container>
          <Row className=''>
            <Col sm={12} md={12} lg={12} className='login-container'>
              <Row>
                <Col className='mb-4'>
                  <img src={BOPlogo} width='300px' alt='' />
                </Col>
              </Row>
              <Row>
                <Col className='center-div flex-column'>
                  <Form>
                    <Row className='flex-column'>
                      <Col className='d-flex justify-content-center'>
                        <p className='forget-password-heading'>
                          Recover Password
                        </p>
                      </Col>
                      <Col className='d-flex justify-content-center'>
                        <p className='small-heading-forget'>
                          Please type your full email
                        </p>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={12} md={12} lg={12} className='mt-3'>
                        <InputGroup>
                          <InputGroup.Text
                            id='basic-addon1'
                            className='Icon-Field-class'>
                            <i className='icon-user'></i>
                          </InputGroup.Text>
                          <Form.Control
                            name='new_email'
                            type='text'
                            autoComplete={false}
                            className='form-comtrol-ResetPassword-textfield'
                            placeholder='Email'
                            aria-label='Email'
                            aria-describedby='basic-addon1'
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                              if (submitted) setSubmitted(false);
                            }}
                          />
                        </InputGroup>
                        {(submitted || email.trim() !== "") &&
                          !isEmailValid && (
                            <span className='emailErrorText'>
                              Enter a valid email address
                            </span>
                          )}
                      </Col>

                      <Col
                        sm={12}
                        md={12}
                        lg={12}
                        className='d-flex justify-content-center mt-3'>
                        <Button
                          text='Send Change Password Link'
                          className='ResetPassword-btn'
                          onClick={handleForgotPassword}
                        />
                      </Col>
                      <Col className='d-flex justify-content-center'>
                        <span className='mt-2 text-center'>
                          <Link className={"forgotPasswordLink"} to={"/"}>
                            Back to Login
                          </Link>
                        </span>
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Col>
    </Fragment>
  );
};

export default ForgotPassword;
