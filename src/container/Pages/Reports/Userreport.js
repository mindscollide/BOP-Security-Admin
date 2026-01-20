import React, { useState, useEffect, useCallback } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import DatePicker from "react-multi-date-picker";
import "./Userreport.css";
// import moment from "moment";
import ActivateConfirmationModal from "../Modals/ActivateConfirmationModal/ActivateConfirmationModal";
import { Button, Paper, TextField } from "../../../components/elements";
import { GetAllUserStatusAPI } from "../../../store/actions/Auth_Actions";
import { ConfirmationModalSecurityAdmin } from "../../../store/actions/Security_Admin_Modal";
import {
  downloadAccessDetailReportApi,
  downloadLastLoggedInReportApi,
  downloadSystemAdminUserLoginHistoryReportApi,
  downloadUserStatusWiseReportApi,
} from "../../../store/actions/Download-Report";
import { formatDatetoLocal } from "../../../helpers/ReusableMethods";

const Userreport = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get all user status selector
  const GetAllUserStatus = useSelector((state) => state.auth.allUserStatusData);

  let reportBankId = localStorage.getItem("bankID");

  //state for storieng user Status
  const [statusOptions, setStatusOptions] = useState([]);
  const [statusID, setStatusID] = useState({
    value: 0,
    label: "",
  });
  // state for disable the previous date from end date by selecting date from start date
  // const [startDate, setStartDate] = useState(null);
  // const [endDate, setEndDate] = useState(null);

  // const [startDateProps, setStartDateProps] = useState({
  //   value: new Date(),
  //   format: "MM-DD-YYYY",
  //   onChange: (date) => console.log(date.format()),
  // });

  // const [endDateProps, setEndDateProps] = useState({
  //   value: new Date(),
  //   format: "MM-DD-YYYY",
  //   onChange: (date) => console.log(date.format()),
  // });

  //state for save and cancel button
  const confirmationModal = useSelector(
    (state) => state.securityModalReducer.confirmationModal
  );
  const [modalState, setModalState] = useState(0);

  //state for userReports fields
  const [userReport, setUserReport] = useState({
    loginID: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    name: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },

    startDate: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    Email: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    company: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    endDate: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    categoryID: {
      value: 0,
      errorMessage: "",
      errorStatus: false,
    },
    roleID: {
      value: 0,
      errorMessage: "",
      errorStatus: false,
    },
    statusID: {
      value: 0,
      errorMessage: "",
      errorStatus: false,
    },
    bankID: {
      value: reportBankId ? reportBankId : 1,
      errorMessage: "",
      errorStatus: false,
    },
  });

  const handleSelectStatus = async (selectedStatus) => {
    console.log(selectedStatus, "downloadAccessDetailReportApi");
    setStatusID(selectedStatus);

    setUserReport((prevState) => ({
      ...prevState,
      statusID: {
        ...prevState.statusID,
        value: selectedStatus.statusID,
      },
    }));
  };

  console.log(userReport.statusID, "downloadAccessDetailReportApi");

  // onchange handler for user report
  const userReportHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "loginID" && value !== "") {
      console.log(value, "loginIDloginIDloginID");
      let valueCheck = value.replace(/[^\d]/g, "");
      if (valueCheck !== "") {
        setUserReport({
          ...userReport,
          loginID: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "loginID" && value === "") {
      setUserReport({
        ...userReport,
        loginID: { value: "", errorMessage: "", errorStatus: false },
      });
    }

    if (name === "name" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      if (valueCheck !== "") {
        setUserReport({
          ...userReport,
          name: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "name" && value === "") {
      setUserReport({
        ...userReport,
        name: { value: "", errorMessage: "", errorStatus: false },
      });
    }
  };

  //start date state of multi datepicker
  // const changeDateStartHandler = (date) => {
  //   setStartDate(date);
  //   setEndDate(null);
  //   let newDate = moment(date).format("YYYY-MM-DD");
  //   setUserReport({
  //     ...userReport,
  //     startDate: {
  //       value: newDate,
  //     },
  //   });
  //   console.log(newDate, "changeDateStartHandler");
  // };

  // //end date state of multi datepicker
  // const changeDateEndHandler = (date) => {
  //   setEndDate(date);
  //   let newEndDate = moment(date).format("YYYY-MM-DD");
  //   setUserReport({
  //     ...userReport,
  //     endDate: {
  //       value: newEndDate,
  //     },
  //   });
  // };
  //Table columns for customer List
  const handleNoButton = useCallback(() => {
    if (modalState === 1) {
      dispatch(ConfirmationModalSecurityAdmin(false));
      setModalState(0);
    } else if (modalState === 2) {
      dispatch(ConfirmationModalSecurityAdmin(false));
      setModalState(0);
    }
  }, [modalState]);

  //reset handler for edit user
  const resetHandler = () => {
    dispatch(ConfirmationModalSecurityAdmin(true));
    setModalState(2);
  };

  //reset handler
  const resetHandlerYes = () => {
    if (modalState === 2) {
      dispatch(ConfirmationModalSecurityAdmin(false));
      setModalState(0);

      setUserReport({
        ...userReport,
        loginID: {
          value: "",
        },
        name: {
          value: "",
        },
        startDate: {
          value: "",
          errorMessage: "",
          errorStatus: false,
        },
        endDate: {
          value: "",
          errorMessage: "",
          errorStatus: false,
        },
        roleID: {
          value: 0,
        },
        statusID: {
          value: 0,
          errorMessage: "",
          errorStatus: false,
        },
      });
      // setStartDateProps({
      //   ...startDateProps,
      //   value: "",
      // });

      // setEndDateProps({
      //   ...endDateProps,
      //   value: "",
      // });

      setStatusID({
        value: 0,
        label: "",
      });
    }

    // setReportStatusValue([]);
    // setSelectRoleValueReport([]);
  };

  useEffect(() => {
    dispatch(GetAllUserStatusAPI(navigate));
  }, []);

  useEffect(() => {
    if (GetAllUserStatus !== null) {
      try {
        let newUserStatusData = GetAllUserStatus.status.map((status) => {
          return {
            ...status,
            value: { value: status.statusID },
            label: status.statusName,
          };
        });
        setStatusOptions(newUserStatusData);
      } catch (error) {}
    }
  }, [GetAllUserStatus]);

  // handle Access Detail Report
  const HandleAccessDetailReport = () => {
    let data = {
      loginID:
        Number(userReport.loginID.value) !== 0
          ? Number(userReport.loginID.value)
          : 0,
      StatusID:
        Number(userReport.statusID.value) !== 0
          ? Number(userReport.statusID.value)
          : 0,
      Name: userReport.name.value !== "" ? userReport.name.value : "",
      DateFrom:
        userReport.startDate.value !== ""
          ? formatDatetoLocal(userReport.startDate.value)
          : "",
      DateTo:
        userReport.endDate.value !== ""
          ? formatDatetoLocal(userReport.endDate.value)
          : "",
    };
    // console.log(data, "downloadAccessDetailReportApi");
    dispatch(downloadAccessDetailReportApi(navigate, data));
  };

  // Handle Login History
  const handleLoginHistory = () => {
    let data = {
      loginID:
        Number(userReport.loginID.value) !== 0
          ? Number(userReport.loginID.value)
          : 0,
      StatusID:
        Number(userReport.statusID.value) !== 0
          ? Number(userReport.statusID.value)
          : 0,
      Name: userReport.name.value !== "" ? userReport.name.value : "",
      DateFrom:
        userReport.startDate.value !== ""
          ? formatDatetoLocal(userReport.startDate.value)
          : "",
      DateTo:
        userReport.endDate.value !== ""
          ? formatDatetoLocal(userReport.endDate.value)
          : "",
    };
    console.log(data, "downloadAccessDetailReportApi");
    dispatch(downloadSystemAdminUserLoginHistoryReportApi(navigate, data));
  };

  const handlelastLoggedIn = () => {
    let data = {
      loginID:
        Number(userReport.loginID.value) !== 0
          ? Number(userReport.loginID.value)
          : 0,
      StatusID:
        Number(userReport.statusID.value) !== 0
          ? Number(userReport.statusID.value)
          : 0,
      Name: userReport.name.value !== "" ? userReport.name.value : "",
      DateFrom:
        userReport.startDate.value !== ""
          ? formatDatetoLocal(userReport.startDate.value)
          : "",
      DateTo:
        userReport.endDate.value !== ""
          ? formatDatetoLocal(userReport.endDate.value)
          : "",
    };
    console.log(data, "downloadAccessDetailReportApi");
    dispatch(downloadLastLoggedInReportApi(navigate, data));
  };

  const handleStatuswiseReport = () => {
    let data = {
      loginID:
        Number(userReport.loginID.value) !== 0
          ? Number(userReport.loginID.value)
          : 0,
      StatusID:
        Number(userReport.statusID.value) !== 0
          ? Number(userReport.statusID.value)
          : 0,
      Name: userReport.name.value !== "" ? userReport.name.value : "",
      DateFrom:
        userReport.startDate.value !== ""
          ? formatDatetoLocal(userReport.startDate.value)
          : "",
      DateTo:
        userReport.endDate.value !== ""
          ? formatDatetoLocal(userReport.endDate.value)
          : "",
    };
    console.log(data, "downloadAccessDetailReportApi");
    dispatch(downloadUserStatusWiseReportApi(navigate, data));
  };

  const handleFromChange = (value) => {
    console.log(value, "valuevalue123");
    setUserReport((prev) => ({
      ...prev,
      startDate: {
        ...prev,
        value,
        errorMessage: "",
        errorStatus: false,
      },
    }));
  };

  const handleToChange = (value) => {
    console.log(value, "valuevalue123");
    setUserReport((prev) => ({
      ...prev,
      endDate: {
        ...prev,
        value,
        errorMessage: "",
        errorStatus: false,
      },
    }));
  };
  return (
    <>
      <section className="report-user-container">
        <Row>
          <Col lg={12} md={12} sm={12} className="d-flex justify-content-start">
            <label className="report-user-label">User Reports</label>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col lg={12} md={12} sm={12}>
            <Paper className="span-user-color">
              <Row className="g-2 mt-2 mb-2">
                <Col lg={2} md={2} sm={2} className="pe-0">
                  <TextField
                    name="loginID"
                    labelClass={"d-none"}
                    maxLength={100}
                    value={userReport.loginID.value}
                    onChange={userReportHandler}
                    className="text-fields-report"
                    placeholder="Login ID"
                  />
                </Col>
                <Col lg={2} md={2} sm={2} className="pe-0">
                  <Select
                    className="report-select-field-edit"
                    menuPosition="fixed"
                    isSearchable
                    placeholder="Status ID"
                    options={statusOptions}
                    value={statusID.value !== 0 ? statusID : null}
                    onChange={handleSelectStatus}
                  />
                </Col>
                <Col lg={2} md={2} sm={2} className="pe-0">
                  <TextField
                    maxLength={100}
                    name="name"
                    value={userReport.name.value}
                    labelClass={"d-none"}
                    onChange={userReportHandler}
                    className="text-fields-report"
                    placeholder="Name"
                  />
                </Col>

                <Col lg={4} md={4} sm={12} className="d-flex">
                  <DatePicker
                    inputClass="date-picker-left"
                    // name={"dateFrom"}
                    // // selected={startDate}
                    // highlightToday={true}
                    // onOpenPickNewDate={false}
                    // value={userReport.startDate.value}
                    // onPropsChange={setStartDateProps}
                    // selectsStart
                    // startDate={startDate}
                    // endDate={endDate}
                    // minDate={new Date()}
                    // showOtherDays={true}
                    // onChange={(value) =>
                    //   changeDateStartHandler(value?.toDate?.().toString())
                    // }
                    // placeholder="Start Date"

                    name={"dateFrom"}
                    labelClass={"d-none"}
                    placeholder="Start date"
                    showOtherDays={true}
                    value={userReport.startDate.value}
                    onChange={(date) => handleFromChange(date)}
                    minDate={null} // No restriction initially
                    maxDate={userReport.endDate.value || null}
                    editable={false}
                  />
                  <label className="date-to">to</label>

                  <DatePicker
                    inputClass="date-picker-right"
                    // selected={endDate}
                    // highlightToday={true}
                    // onOpenPickNewDate={false}
                    // value={userReport.endDate.value}
                    // onPropsChange={setEndDateProps}
                    // showOtherDays={true}
                    // selectsEnd
                    // startDate={startDate}
                    // endDate={endDate}
                    // minDate={
                    //   startDate
                    //     ? moment(startDate).add(1, "days").toDate()
                    //     : null
                    // }
                    // autoComplete="off"
                    // onChange={(value) =>
                    //   changeDateEndHandler(value?.toDate?.().toString())
                    // }
                    // placeholder="End Date"

                    name="dateTo"
                    labelClass={"d-none"}
                    placeholder="End Date"
                    showOtherDays={true}
                    value={userReport.endDate.value}
                    onChange={(date) => handleToChange(date)}
                    minDate={userReport.startDate.value || null} // Disable dates before selected startDate
                    maxDate={null} // No restriction initially
                    editable={false}
                  />
                </Col>

                <Col
                  lg={2}
                  md={2}
                  sm={2}
                  className="d-flex justify-content-center reset-button"
                >
                  <Button
                    icon={<i className="icon-refresh user-reset"></i>}
                    text="Reset"
                    onClick={resetHandler}
                    className="user-report-reset"
                  />
                </Col>
              </Row>
            </Paper>
          </Col>
        </Row>

        <Row className="mt-2">
          <Col lg={12} md={12} sm={12}>
            <Paper className="status-user-panel">
              <Row className="mt-3">
                <Col lg={12} md={12} sm={12}>
                  <label className="user-status-heading">Status</label>
                </Col>
              </Row>

              <Row className="mt-3 mb-3">
                <Col lg={3} md={3} sm={3} className="p-1">
                  <Button
                    icon={<i className="icon-download download-btn-icons"></i>}
                    text="Access Detail"
                    className="report-btm-buttons"
                    onClick={HandleAccessDetailReport}
                  />
                </Col>
                <Col lg={3} md={3} sm={3} className="p-1">
                  <Button
                    icon={<i className="icon-download download-btn-icons"></i>}
                    text="Login History"
                    className="report-btm-buttons"
                    onClick={handleLoginHistory}
                  />
                </Col>
                <Col lg={3} md={3} sm={3} className="p-1">
                  <Button
                    icon={<i className="icon-download download-btn-icons"></i>}
                    text="Status Wise"
                    className="report-btm-buttons"
                    onClick={handleStatuswiseReport}
                  />
                </Col>
                <Col lg={3} md={3} sm={3} className="p-1">
                  <Button
                    icon={<i className="icon-download download-btn-icons"></i>}
                    text="Last Login"
                    className="report-btm-buttons"
                    onClick={handlelastLoggedIn}
                  />
                </Col>
              </Row>
            </Paper>
          </Col>
        </Row>
      </section>
      <ActivateConfirmationModal onConfirm={resetHandlerYes} />
      {confirmationModal === true && (
        <ActivateConfirmationModal
          handleYesButton={resetHandlerYes}
          handleNoButton={handleNoButton}
        />
      )}
    </>
  );
};

export default Userreport;
