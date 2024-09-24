import React, { useState } from "react";
import "./SettingModal.css";
import { Row, Col } from "react-bootstrap";

import {
  TextField,
  Button,
  Table,
  Modal,
} from "../../../../components/elements";
import { Checkbox, Switch } from "antd";

const SettingModal = ({ SettingModalState, setSettingModalState }) => {
  const [settingUser, setSettingUser] = useState(true);
  const [passcodeSetting, setPasscodeSetting] = useState(false);
  const [marketTiming, setMarketTiming] = useState(false);

  const onCloseButton = () => {
    setSettingModalState(false);
  };

  const onClickSettingUser = () => {
    setSettingUser(true);
    setPasscodeSetting(false);
    setMarketTiming(false);
  };

  const onClickPasscodeSetting = () => {
    setSettingUser(false);
    setPasscodeSetting(true);
    setMarketTiming(false);
  };

  const onClickMarketSetting = () => {
    setSettingUser(false);
    setPasscodeSetting(false);
    setMarketTiming(true);
  };

  // const onChange = (e) => {
  //   console.log(`checked = ${e.target.checked}`);
  // };

  return (
    <>
      <Modal
        show={SettingModalState}
        setShow={setSettingModalState}
        className="modaldialog modal-setting-styles"
        modalHeaderClassName={"header-setting-Modal-close-btn"}
        modalFooterClassName={"modal-footer-setting"}
        size="lg"
        onHide={onCloseButton}
        ModalBody={
          <>
            <Row>
              <Col
                lg={12}
                md={12}
                sm={12}
                className="d-flex justify-content-start gap-1"
              >
                <Button
                  text="User Setting"
                  onClick={onClickSettingUser}
                  className={
                    settingUser
                      ? `${"setting-button-modal"}`
                      : `${"setting-button-disabled"}`
                  }
                />
                <Button
                  text="Passcode Setting"
                  onClick={onClickPasscodeSetting}
                  className={
                    passcodeSetting
                      ? `${"setting-button-modal"}`
                      : `${"setting-button-disabled"}`
                  }
                />
                <Button
                  text="Market Timing"
                  onClick={onClickMarketSetting}
                  className={
                    marketTiming
                      ? `${"setting-button-modal"}`
                      : `${"setting-button-disabled"}`
                  }
                />
              </Col>
            </Row>

            {settingUser ? (
              <>
                <Row className="mt-4">
                  <Col className="checkbox-border">
                    <Checkbox onChange={() => e.target.checked()}>
                      Chat Panel Overlap
                    </Checkbox>
                  </Col>
                </Row>
                <Row>
                  <Col className="checkbox-border">
                    <Checkbox onChange={() => e.target.checked()}>
                      Sound on every personal message
                    </Checkbox>
                  </Col>
                </Row>
              </>
            ) : passcodeSetting ? (
              <>
                <div className="border-line-passcode">
                  <Row>
                    <Col
                      lg={6}
                      md={6}
                      sm={12}
                      className="d-flex justify-content-start"
                    >
                      <p className="two-factor-text">
                        Two Factor Authentication
                      </p>
                    </Col>
                    <Col
                      lg={6}
                      md={6}
                      sm={12}
                      className="d-flex justify-content-end"
                    >
                      <Switch />
                    </Col>
                  </Row>
                </div>

                <Row className="mt-3">
                  <Col lg={12} md={12} sm={12}>
                    <p className="change-password-text">Change Password</p>
                  </Col>
                </Row>

                <Row className="mt-1">
                  <Col lg={4} md={4} sm={12}>
                    <span className="change-password-label">
                      Enter New Password *
                    </span>
                  </Col>
                  <Col lg={8} md={8} sm={12}>
                    <TextField
                      name="Password"
                      labelClass="d-none"
                      autoComplete={"off"}
                    />
                  </Col>
                </Row>

                <Row className="mt-3">
                  <Col lg={4} md={4} sm={12}>
                    <span className="change-password-label">
                      Confirm New Password *
                    </span>
                  </Col>
                  <Col lg={8} md={8} sm={12}>
                    <TextField
                      name="ConfirmNewPassword"
                      autoComplete={"off"}
                      labelClass="d-none"
                    />
                  </Col>
                </Row>
              </>
            ) : marketTiming ? (
              <>
                <Row className="mt-4">
                  <Col>
                    <p className="change-password-text">Mon - Thur</p>
                  </Col>
                </Row>
                <Row>
                  <Col lg={8} md={8} sm={8}>
                    <Row>
                      <Col lg={6} md={6} sm={6}>
                        <label className="two-factor-text">Start Time</label>
                        <TextField labelClass="d-none" />
                      </Col>
                      <Col lg={6} md={6} sm={6}>
                        <label className="two-factor-text">End Time</label>
                        <TextField labelClass="d-none" />
                      </Col>
                    </Row>
                  </Col>
                </Row>

                <Row className="mt-3">
                  <Col>
                    <p className="change-password-text">Friday</p>
                  </Col>
                </Row>
                <Row>
                  <Col lg={8} md={8} sm={8}>
                    <Row>
                      <Col lg={6} md={6} sm={6}>
                        <label className="two-factor-text">Start Time</label>
                        <TextField labelClass="d-none" />
                      </Col>
                      <Col lg={6} md={6} sm={6}>
                        <label className="two-factor-text">End Time</label>
                        <TextField labelClass="d-none" />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </>
            ) : null}
          </>
        }
        ModalFooter={
          <>
            <Row className="mb-3">
              <Col lg={12} md={12} sm={12} className="footer-btn-col">
                <Button
                  text="Save"
                  className="update-btn-editModal"
                  //   onClick={UpdateButtonOnClick}
                />
              </Col>
            </Row>
          </>
        }
      />
    </>
  );
};

export default SettingModal;
