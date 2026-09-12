import React, { Fragment, useState, useRef } from "react";
import { Container, Col, Row, InputGroup, Form } from "react-bootstrap";
import { Button } from "../../../components/elements";
import { loginSecurityAdminAPI } from "../../../store/actions/Auth_Actions";
import { useNotification } from "../../../context/NotificationContext";
import { useDispatch } from "react-redux";
import BOPlogo from "../../../assets/images/BOPlogo.png";
import { Link, useNavigate } from "react-router-dom";
import "./SecurityLogin.css";
import {
  encryptField,
  bopEmailValidation,
} from "../../../commen/functions/utils";

const SecurityLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showMessage } = useNotification();

  const UserName = useRef(null);
  const Password = useRef(null);

  //state for login credentials
  const [securityCredentials, setSecurityCredentials] = useState({
    Email: "",
    Password: "",
    fakePassword: "",
  });

  const isEmailValid = bopEmailValidation(securityCredentials.Email.trim());

  const isLoginValid =
    isEmailValid && securityCredentials.Password.trim() !== "";
  // Enter key handler
  const enterKeyHandler = (event, nextInput) => {
    if (event.key === "Enter") {
      event.preventDefault();
      nextInput.current?.focus();
    }
  };

  // credentials for email and password
  const setCredentialHandler = (e) => {
    const { name, value } = e.target;

    if (name === "Password") {
      let maskedPassword = "";

      for (let i = 0; i < value.length; i++) {
        maskedPassword += "•";
      }

      setSecurityCredentials((previousState) => ({
        ...previousState,
        Password: value,
        fakePassword: maskedPassword,
      }));

      return;
    }

    setSecurityCredentials((previousState) => ({
      ...previousState,
      [name]: value,
    }));
  };

  const loginValidateHandler = async (e) => {
    e.preventDefault();

    if (!isLoginValid) {
      return;
    }

    try {
      const email = securityCredentials.Email.trim();
      const password = securityCredentials.Password;

      if (!email || !password) {
        throw new Error("Missing credentials");
      }
      const encryptedEmail = await encryptField(email);
      const encryptedPassword = await encryptField(password);

      const data = {
        Email: encryptedEmail,
        Password: encryptedPassword,
        DeviceID: "1",
        Device: "Browser",
        RoleID: 5,
      };
      console.log(data);
      dispatch(loginSecurityAdminAPI(navigate, data));
    } catch (err) {
      console.log("Hello", err);

      showMessage("Please Enter All Credentials", "error");
    }
  };

  return (
    <Fragment>
      <Col sm={12} lg={12} md={12} className='sign-in'>
        <Container>
          <Row className='mt-5'>
            <Col sm={12} md={12} lg={12} className='login-container'>
              <Row>
                <Col className='mb-4'>
                  <img src={BOPlogo} width='300px' alt='' />
                </Col>
              </Row>
              <Row>
                <Col className='center-div flex-column'>
                  <Row>
                    <Col sm={12} md={12} lg={12} className='login-heading'>
                      Login
                    </Col>
                  </Row>
                  <Form onSubmit={loginValidateHandler}>
                    <Row>
                      <Col sm={12} md={12} lg={12} className='mt-3'>
                        <InputGroup className='mb-3'>
                          <InputGroup.Text
                            id='basic-addon1'
                            className='Icon-Field-class'>
                            <i className='icon-user'></i>
                          </InputGroup.Text>
                          <Form.Control
                            ref={UserName}
                            onKeyDown={(event) =>
                              enterKeyHandler(event, Password)
                            }
                            name='Email'
                            autoComplete='off'
                            value={securityCredentials.Email}
                            onChange={setCredentialHandler}
                            className='form-comtrol-textfield'
                            placeholder='Email ID'
                            aria-label='Username'
                            aria-describedby='basic-addon1'
                          />
                        </InputGroup>
                      </Col>
                      <Col sm={12} md={12} lg={12} className='mb-3'>
                        <InputGroup>
                          <InputGroup.Text
                            id='basic-addon1'
                            className='Icon-Field-class'>
                            <i className='icon-lock'></i>
                          </InputGroup.Text>
                          <Form.Control
                            id='password'
                            name='Password'
                            ref={Password}
                            autoComplete='off'
                            data-lpignore='true'
                            data-1p-ignore='true'
                            className='form-comtrol-textfield-password masked-password-field'
                            placeholder='Password'
                            aria-label='passwordText'
                            aria-describedby='basic-addon2'
                            type={"text"}
                            value={securityCredentials.Password}
                            onChange={setCredentialHandler}
                          />
                        </InputGroup>
                      </Col>
                      <Col
                        sm={12}
                        md={12}
                        lg={12}
                        className='mb-2 d-flex justify-content-end'>
                        <Link
                          className='forgotPassword-text'
                          to='/forgotpassword'>
                          Forgot Password?
                        </Link>
                      </Col>

                      <Col
                        sm={12}
                        md={12}
                        lg={12}
                        className='signIn-Signup-btn-col'>
                        <Button
                          text='Login'
                          className='login-btn'
                          onClick={loginValidateHandler}
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

export default SecurityLogin;
