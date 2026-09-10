import React, { useState, Fragment } from "react";
import { Container, Col, Row, InputGroup, Form } from "react-bootstrap";
import { Button } from "../../../components/elements";
import BOPlogo from "../../../assets/images/BOPlogo.png";
import "./ForgotPassword.css";
import { useNavigate } from "react-router-dom";
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

  const isEmailValid = email.trim() !== "" && bopEmailValidation(email.trim());

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!isEmailValid) {
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
                          Forget Password ?
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
                        <InputGroup className='mb-3'>
                          <InputGroup.Text
                            id='basic-addon1'
                            className='Icon-Field-class'>
                            <i className='icon-user'></i>
                          </InputGroup.Text>
                          <Form.Control
                            name='email'
                            type='email'
                            autoComplete='email'
                            className='form-comtrol-ResetPassword-textfield'
                            placeholder='Email'
                            aria-label='Email'
                            aria-describedby='basic-addon1'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </InputGroup>
                        {email.trim() !== "" && !isEmailValid && (
                          <div className='text-danger mt-1'>
                            Email should be correct
                          </div>
                        )}
                      </Col>

                      <Col className='d-flex justify-content-center mt-2'>
                        <Button
                          text='Forgot Password'
                          className='ResetPassword-btn'
                          disableBtn={!isEmailValid}
                          onClick={handleForgotPassword}
                        />
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
