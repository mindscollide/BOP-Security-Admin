import React, { useEffect, useState } from "react";
import "./SettingModal.css";
import { Row, Col } from "react-bootstrap";

import {
  TextField,
  Button,
  Modal,
  Loader,
} from "../../../../components/elements";
import { Checkbox, Switch } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  GetUserSettingsAPI,
  UpdateUserSettingsAPI,
} from "../../../../store/actions/SettingsActions";

const SettingModal = ({ SettingModalState, setSettingModalState }) => {
  console.log(SettingModalState, "SettingModalStateSettingModalState");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [settingUser, setSettingUser] = useState(true);
  const [passcodeSetting, setPasscodeSetting] = useState(false);
  const [marketTiming, setMarketTiming] = useState(false);
  const [settings, setSettings] = useState({
    chatPannalOverlap: true,
    soundOnEveryMessage: true,
    twoFactorAuthentication: true,
    newPassword: {
      value: "",
    },
    confirmNewPassword: {
      value: "",
    },
    monToThurStartTime: {
      value: "",
    },
    monToThurEndTime: {
      value: "",
    },
    friStartTime: {
      value: "",
    },
    friEndTime: {
      value: "",
    },
  });

  const [settingsRecord, setSettingRecords] = useState({
    BD_Enable2FA: false,
    BD_SoundOnEveryMessage: false,
    BD_EmailOnEveryMessage: false,
  });

  const [errors, setErrors] = useState({
    lengthError: true,
    numberError: true,
    specialCharError: true,
    matchError: true,
  });

  console.log(settingsRecord, "settingsRecordsettingsRecord");

  const LoadingState = useSelector((state) => state);

  console.log("securityReducersecurityReducer", LoadingState);

  const GetUserSettings = useSelector(
    (state) => state.settingsReducer.GetUserSettings
  );

  useEffect(() => {
    dispatch(GetUserSettingsAPI(navigate));
  }, []);

  useEffect(() => {
    if (GetUserSettings !== null) {
      try {
        const { userSettingsList } = GetUserSettings;
        if (userSettingsList.length > 0) {
          const newSettings = {};

          userSettingsList.forEach((settingData) => {
            newSettings[settingData.configKey] = JSON.parse(
              settingData.configValue
            );
          });

          setSettingRecords((prevSettings) => ({
            ...prevSettings,
            ...newSettings,
          }));
        }
      } catch (error) {
        console.error("Error setting user settings:", error);
      }
    }
  }, [GetUserSettings]);

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

  // Checkbox for Chat Panal Overlap and Sound on every personal message
  const onChangeCheckbox = (e) => {
    console.log("e.target.checked,", e.target.checked);
    if (e.target.name === "chatPannal") {
      setSettingRecords({
        ...settingsRecord,
        BD_EmailOnEveryMessage: e.target.checked,
      });
    } else if (e.target.name === "soundOnEveryMessage") {
      setSettingRecords({
        ...settingsRecord,
        BD_SoundOnEveryMessage: e.target.checked,
      });
    }
  };

  // radio button for Two factor authentication
  const onChangeSwitch = (e) => {
    setSettingRecords({
      ...settingsRecord,
      BD_Enable2FA: e,
    });
    console.log(`switch to ${e}`);
  };

  // const onChange = (e) => {
  //   console.log(`checked = ${e.target.checked}`);
  // };
  const UpdateButtonOnClick = () => {
    try {
      let updateData = {
        Settings: [
          {
            Key: "BD_EmailOnEveryMessage",
            Value: String(settingsRecord.BD_EmailOnEveryMessage),
          },
          {
            Key: "BD_SoundOnEveryMessage",
            Value: String(settingsRecord.BD_SoundOnEveryMessage),
          },
          {
            Key: "BD_Enable2FA",
            Value: String(settingsRecord.BD_Enable2FA),
          },
        ],
      };

      dispatch(
        UpdateUserSettingsAPI(navigate, updateData, setSettingModalState)
      );
    } catch (err) {}
  };
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
                    <Checkbox
                      name="chatPannal"
                      checked={settingsRecord.BD_EmailOnEveryMessage}
                      onChange={onChangeCheckbox}
                    >
                      Chat Panel Overlap
                    </Checkbox>
                  </Col>
                </Row>
                <Row>
                  <Col className="checkbox-border">
                    <Checkbox
                      name="soundOnEveryMessage"
                      checked={settingsRecord.BD_SoundOnEveryMessage}
                      onChange={onChangeCheckbox}
                    >
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
                      <Switch
                        name="twoFactorAuth"
                        checked={settingsRecord.BD_Enable2FA}
                        value={settingsRecord.BD_Enable2FA}
                        onChange={onChangeSwitch}
                      />
                    </Col>
                  </Row>
                </div>

                {/* <Row className="mt-3">
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
                </Row> */}
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
                  onClick={UpdateButtonOnClick}
                />
              </Col>
            </Row>
          </>
        }
      />
      {/* {securityReducer.Loading && <Loader />} */}
    </>
  );
};

export default SettingModal;
