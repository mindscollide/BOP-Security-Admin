import React, { Fragment, useEffect, useState, useRef } from "react";
import { Container, Col, Row, InputGroup, Form } from "react-bootstrap";
import {
  Button,
  TextField,
  Loader,
  Notification,
} from "../../../components/elements";
import jsLogo from "../../../assets/images/js-logo.png";
import { loginSecurityAdminAPI } from "../../../store/actions/Auth_Actions";
import { useDispatch, useSelector } from "react-redux";
import BOPlogo from "../../../assets/images/BOPlogo.png";
import { useNavigate } from "react-router-dom";
import "./SecurityLogin.css";
const SecurityLogin = () => {
  const { auth } = useSelector((state) => state);
  console.log(auth, "authReducerauthReducerauthReducer");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState({
    open: false,
    message: "",
  });

  const UserName = useRef(null);
  const Password = useRef(null);

  const [errorMessages, setErrorMessages] = useState({
    UserNameError: "",
    PasswordError: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  //state for login credentials
  const [securityCredentials, setSecurityCredentials] = useState({
    UserName: "",
    Password: "",
    fakePassword: "",
  });

  // Enter key handler
  const enterKeyHandler = (event, nextInput) => {
    if (event.key === "Enter") {
      nextInput.current.focus();
    }
  };

  // credentials for email and password
  const emailOnchangeHandler = (e) => {
    const value = e.target.value;
    setSecurityCredentials((prevState) => ({
      ...prevState,
      UserName: value,
    }));

    // Clear error if value is not empty
    if (value !== "") {
      setErrorMessages((prevState) => ({ ...prevState, UserNameError: "" }));
    }
  };

  // onChange for password
  const passwordOnchangeHandler = (e) => {
    const value = e.target.value;
    setSecurityCredentials((prevState) => ({
      ...prevState,
      Password: value,
    }));

    // Clear error if value is not empty
    if (value !== "") {
      setErrorMessages((prevState) => ({ ...prevState, PasswordError: "" }));
    }
  };

  // handler for submit login
  const loginValidateHandler = (e) => {
    e.preventDefault();
    let errors = {};
    console.log(errors, "errorerrore");

    // Check if fields are empty
    if (securityCredentials.UserName === "") {
      errors.UserNameError = "Email Field Is Empty";
    }
    if (securityCredentials.Password === "") {
      errors.PasswordError = "Password Field Is Empty";
    }

    // If errors exist, update the errorMessages state
    if (Object.keys(errors).length > 0) {
      setErrorMessages(errors);
    } else {
      dispatch(loginSecurityAdminAPI(navigate)); // Proceed with login
    }
  };

  // eye on Click on Eye Icon on Password
  const toggleEyeIcon = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Fragment>
      <Col sm={12} lg={12} md={12} className="sign-in">
        <Container>
          <Row className="">
            <Col sm={12} md={12} lg={12} className="login-container">
              <Row>
                <Col className="mb-4">
                  <img src={BOPlogo} width="300px" />
                </Col>
              </Row>
              <Row>
                <Col className="center-div flex-column">
                  <Form onSubmit={loginValidateHandler}>
                    <Row>
                      <Col sm={12} md={12} lg={12} className="mt-3">
                        <InputGroup>
                          <InputGroup.Text
                            id="basic-addon1"
                            className="Icon-Field-class"
                          >
                            <i className="icon-user"></i>
                          </InputGroup.Text>
                          <Form.Control
                            ref={UserName}
                            onKeyDown={(event) =>
                              enterKeyHandler(event, Password)
                            }
                            name="UserName"
                            autoComplete="off"
                            value={securityCredentials.UserName}
                            onChange={emailOnchangeHandler}
                            className="form-comtrol-textfield"
                            placeholder="Email ID"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                          />
                        </InputGroup>

                        <p
                          className={
                            errorMessages.UserNameError
                              ? "error-message"
                              : "error-message-nothing"
                          }
                        >
                          {errorMessages.UserNameError}
                        </p>
                      </Col>
                      <Col sm={12} md={12} lg={12} className="mb-3">
                        <InputGroup>
                          <InputGroup.Text
                            id="basic-addon1"
                            className="Icon-Field-class"
                          >
                            <i className="icon-lock"></i>
                          </InputGroup.Text>
                          <Form.Control
                            name="passwordText"
                            // ref={Password}
                            autoComplete="off"
                            className="form-comtrol-textfield-password"
                            placeholder="Password"
                            aria-label="passwordText"
                            aria-describedby="basic-addon2"
                            type={showPassword ? "text" : "password"}
                            value={securityCredentials.Password}
                            onChange={passwordOnchangeHandler}
                          />
                          <InputGroup.Text
                            id="basic-addon2"
                            className="eyeIcon-Field-class-BOP-login"
                            onClick={toggleEyeIcon}
                          >
                            {showPassword ? (
                              <i className="icon-eye-slash"></i>
                            ) : (
                              <i className="icon-eye"></i>
                            )}
                          </InputGroup.Text>
                        </InputGroup>
                        <p
                          className={
                            errorMessages.PasswordError
                              ? "error-message"
                              : "error-message-nothing"
                          }
                        >
                          {errorMessages.PasswordError}
                        </p>
                      </Col>
                      <Col
                        sm={12}
                        md={12}
                        lg={12}
                        className="signIn-Signup-btn-col"
                      >
                        <Button text="Login" className="login-btn" />
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Col>
      <Notification setOpen={setOpen} open={open.open} message={open.message} />
      {auth.Loading ? <Loader /> : null}
    </Fragment>
  );
};

export default SecurityLogin;
