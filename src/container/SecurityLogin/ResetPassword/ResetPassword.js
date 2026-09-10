import React, { Fragment, useEffect, useState } from "react";
import { Col, Row, InputGroup, Form } from "react-bootstrap";
import { Button } from "../../../components/elements";
import BOPlogo from "../../../assets/images/BOPlogo.png";
import PasswordChecklist from "react-password-checklist";
import "./ResetPassword.css";
import { decryptField, encryptField } from "../../../commen/functions/utils";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetPasswordApi } from "../../../store/actions/Auth_Actions";

const COMMON_PASSWORDS = [
  "password",
  "12345678",
  "123456789",
  "qwerty123",
  "letmein",
  "welcome1",
  "admin123",
  "iloveyou",
  "passw0rd",
  "changeme",
  "bankofpunjab",
  "bop12345",
  // App/domain-specific words that shouldn't appear in a password either
  "treasury",
  "dealer",
  "corporate",
  "branch",
  "punjab",
  "forex",
];

const containsPersonalInfo = (password, personalInfo) => {
  const lowerPassword = password.toLowerCase();

  // A value like firstName can itself be multiple words (e.g. "Mamdani Treasury"),
  // so every word is split out and checked individually against the password.
  const words = personalInfo
    .flatMap((info) => (info ? info.split(/\s+/) : []))
    .filter((word) => word.length >= 3);

  return words.some((word) => lowerPassword.includes(word.toLowerCase()));
};

const containsDictionaryWord = (password) => {
  const lowerPassword = password.toLowerCase();
  return COMMON_PASSWORDS.some((word) => lowerPassword.includes(word));
};

const hasRepeatedCharacters = (password) => /(.)\1{2,}/.test(password);

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [personalInfo, setPersonalInfo] = useState({
    email: "",
    firstName: "",
    encryptedToken: "",
  });

  const [validations, setValidations] = useState({
    isLengthValid: false,
    hasNumber: false,
    hasSpecialChar: false,
    hasLowerCase: false,
    hasUpperCase: false,
    noRepeatedChars: false,
    noDictionaryOrPersonalInfo: false,
    isMatch: false,
  });

  const navigationState = location.state;

  const email = navigationState?.email || "";
  const requestToken = navigationState?.requestToken || "";

  const isFormValid = Object.values(validations).every(Boolean);

  const validatePassword = (newPassword, newConfirmPassword) => {
    const personalInfoList = [
      personalInfo.email,
      personalInfo.email?.split("@")[0],
      personalInfo.firstName,
    ];

    setValidations({
      isLengthValid: newPassword.length >= 8,

      hasNumber: /[0-9]/.test(newPassword),

      hasSpecialChar: /[!@#$%^&*]/.test(newPassword),

      hasLowerCase: /[a-z]/.test(newPassword),

      hasUpperCase: /[A-Z]/.test(newPassword),

      noRepeatedChars:
        newPassword !== "" && !hasRepeatedCharacters(newPassword),

      noDictionaryOrPersonalInfo:
        newPassword !== "" &&
        !containsDictionaryWord(newPassword) &&
        !containsPersonalInfo(newPassword, personalInfoList),

      isMatch: newPassword !== "" && newPassword === newConfirmPassword,
    });
  };

  useEffect(() => {
    if (!navigationState) {
      navigate("/", { replace: true });
      return;
    }

    const {
      email: encryptedEmail,
      firstName: encryptedFirstName,
      userID: encryptedUserID,
      requestToken: token = "",
    } = navigationState ?? null;

    const decryptResetPasswordState = async () => {
      try {
        const [decryptedEmail, decryptedFirstName, decryptedUserID] =
          await Promise.all([
            encryptedEmail ? decryptField(encryptedEmail) : "",

            encryptedFirstName ? decryptField(encryptedFirstName) : "",

            encryptedUserID ? decryptField(encryptedUserID) : "",
          ]);

        setPersonalInfo({
          email: decryptedEmail,
          firstName: decryptedFirstName,
          encryptedToken: token,
        });
      } catch (error) {
        console.error("Failed to decrypt reset password data:", error);

        navigate("/", { replace: true });
      }
    };

    decryptResetPasswordState();
  }, [location.state, navigate]);

  useEffect(() => {
    validatePassword(password, confirmPassword);
  }, [password, confirmPassword, personalInfo.email, personalInfo.firstName]);

  const handleClickResetPassword = async () => {
    if (!isFormValid) {
      return;
    }

    try {
      const email = personalInfo.email.trim();
      console.log("datadatadata", email, password, personalInfo);

      if (!email || !password) {
        return;
      }

      const [encryptedEmail, encryptedPassword] = await Promise.all([
        encryptField(email),
        encryptField(password),
      ]);

      const data = {
        Email: encryptedEmail,
        Password: encryptedPassword,
        DeviceID: "1",
        Device: "Browser",
        RoleID: 5,
        EncryptedString: personalInfo.encryptedToken,
      };
      console.log("datadatadata", data);

      dispatch(resetPasswordApi(navigate, data));
    } catch (error) {
      console.error("Reset password error:", error);
    }
  };

  return (
    <Fragment>
      <section className='ResetPassword-Screen-bg'>
        <Row className='mt-5'>
          <Col sm={12} md={12} lg={12} className='ResetPassword-container'>
            <Row>
              <Col className='mb-4'>
                <img src={BOPlogo} width='300px' alt='' />
              </Col>
            </Row>
            <Row className='mt-2'>
              <Col
                sm={5}
                md={5}
                lg={5}
                className='ResetBOP-center-div flex-column'>
                {/* <Form onSubmit={loginValidateHandler}> */}
                <Row>
                  <Col sm={12} md={12} lg={12}>
                    <span className='Heading-ResetPaswword-BOP-container'>
                      Reset Password
                    </span>
                  </Col>
                  <Col sm={12} md={12} lg={12} className='mt-3'>
                    <InputGroup className='mb-3'>
                      <InputGroup.Text
                        id='basic-addon1'
                        className='Icon-Field-class-BOP-resetPass'>
                        <i className='icon-lock'></i>
                      </InputGroup.Text>
                      <Form.Control
                        name='password'
                        autoComplete='off'
                        className='form-comtrol-ResetPassword-textfield'
                        placeholder='Password'
                        aria-label='Password'
                        aria-describedby='basic-addon1'
                        type={"password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </InputGroup>
                  </Col>
                  <Col sm={12} md={12} lg={12} className='mb-3'>
                    <InputGroup>
                      <InputGroup.Text
                        id='basic-addon1'
                        className='Icon-Field-class-BOP-resetPass'>
                        <i className='icon-lock'></i>
                      </InputGroup.Text>
                      <Form.Control
                        name='confirmPassword'
                        autoComplete='off'
                        className='form-comtrol-ResetPassword-textfield-password'
                        placeholder='New Confirm Password'
                        aria-label='Confirm Password'
                        aria-describedby='basic-addon1'
                        type={"password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </InputGroup>
                  </Col>
                  <Row>
                    <Col>
                      <div className='d-flex gap-1 align-items-center justify-content-start mb-2'>
                        <span
                          className={
                            validations.isLengthValid
                              ? "checkIcon"
                              : "closeIcon"
                          }>
                          <i
                            className={
                              validations.isLengthValid
                                ? "icon-check checkIcon"
                                : "icon-close"
                            }
                          />
                        </span>

                        <span>Length of at least 8 characters</span>
                      </div>

                      <div className='d-flex gap-1 align-items-center justify-content-start mb-2'>
                        <span
                          className={
                            validations.hasNumber ? "checkIcon" : "closeIcon"
                          }>
                          <i
                            className={
                              validations.hasNumber
                                ? "icon-check"
                                : "icon-close"
                            }
                          />
                        </span>

                        <span>Contains numbers</span>
                      </div>

                      <div className='d-flex gap-1 align-items-center justify-content-start mb-2'>
                        <span
                          className={
                            validations.hasLowerCase ? "checkIcon" : "closeIcon"
                          }>
                          <i
                            className={
                              validations.hasLowerCase
                                ? "icon-check"
                                : "icon-close"
                            }
                          />
                        </span>

                        <span>Contains at least 1 lowercase letter</span>
                      </div>

                      <div className='d-flex gap-1 align-items-center justify-content-start mb-2'>
                        <span
                          className={
                            validations.hasUpperCase ? "checkIcon" : "closeIcon"
                          }>
                          <i
                            className={
                              validations.hasUpperCase
                                ? "icon-check"
                                : "icon-close"
                            }
                          />
                        </span>

                        <span>Contains at least 1 uppercase letter</span>
                      </div>

                      <div className='d-flex gap-1 align-items-center justify-content-start mb-2'>
                        <span
                          className={
                            validations.hasSpecialChar
                              ? "checkIcon"
                              : "closeIcon"
                          }>
                          <i
                            className={
                              validations.hasSpecialChar
                                ? "icon-check"
                                : "icon-close"
                            }
                          />
                        </span>

                        <span>Contains special characters (!@#$%^&*)</span>
                      </div>

                      <div className='d-flex gap-1 align-items-center justify-content-start mb-2'>
                        <span
                          className={
                            validations.noRepeatedChars
                              ? "checkIcon"
                              : "closeIcon"
                          }>
                          <i
                            className={
                              validations.noRepeatedChars
                                ? "icon-check"
                                : "icon-close"
                            }
                          />
                        </span>

                        <span>No character repeated more than 2 times</span>
                      </div>

                      <div className='d-flex gap-1 align-items-start justify-content-start mb-2'>
                        <span
                          className={
                            validations.noDictionaryOrPersonalInfo
                              ? "checkIcon"
                              : "closeIcon"
                          }>
                          <i
                            className={
                              validations.noDictionaryOrPersonalInfo
                                ? "icon-check"
                                : "icon-close"
                            }
                          />
                        </span>

                        <span>
                          Does not contain dictionary or personal information
                        </span>
                      </div>

                      <div className='d-flex gap-1 align-items-start mb-2'>
                        <span
                          className={
                            validations.isMatch ? "checkIcon" : "closeIcon"
                          }>
                          <i
                            className={
                              validations.isMatch ? "icon-check" : "icon-close"
                            }
                          />
                        </span>

                        <span>Password match</span>
                      </div>
                    </Col>
                  </Row>
                  <Col
                    sm={12}
                    md={12}
                    lg={12}
                    className='d-flex justify-content-center mt-2'>
                    <Button
                      text='Reset Password'
                      className='ResetPassword-btn'
                      disableBtn={!isFormValid}
                      onClick={handleClickResetPassword}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </section>
    </Fragment>
  );
};

export default ResetPassword;
