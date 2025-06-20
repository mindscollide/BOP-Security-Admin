import React, { Fragment, useCallback, useEffect, useState } from "react";
import "./EditCorporateUser.css";
import { Col, Row } from "react-bootstrap";
import {
  TextField,
  Button,
  Table,
  Paper,
  Loader,
  Modal,
} from "../../../../components/elements";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import EditCorporateModal from "../../Modals/Edit-Corporate-User-Modal/EditCorporateModal";
import { searchEditCorporateUserSchema } from "../../../../utils/schemas";
import { GetAllUserStatusAPI } from "../../../../store/actions/Auth_Actions";
import {
  SearchCorporateUsersAPI,
  UpdateCorporateUserAPI,
} from "../../../../store/actions/Security_Admin";
import { useTableScrollBottom } from "../../../../helpers/useTableScrollBottom";
import { ConfirmationModalSecurityAdmin } from "../../../../store/actions/Security_Admin_Modal";
import ActivateConfirmationModal from "../../Modals/ActivateConfirmationModal/ActivateConfirmationModal";
import { useMqtt } from "../../../../context/MQTTContext";
import {
  downloadCorporateUserReportApi,
  downloadPDFCorporateUserSecurityAdminReportApi,
} from "../../../../store/actions/Download-Report";
import { ExceptionMap } from "antd/es/result";
import { Popover } from "antd";
import pdfIcon from "../../../../assets/images/pdf.png";
import excelIcon from "../../../../assets/images/excel.png";

const EditCorporateUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };
  //Global State
  const { securityReducer } = useSelector((state) => state);
  const {
    corporateUserBulkUpload,
    corporateUserUpdated,
    setCorporateUserBulkUpload,
    corporateUserRoleStatusChange,
    corproateUpdated,
    setCorporateUserUpdated,
    setCorporateUpdated,
  } = useMqtt();
  const SearchCorporateUsersData = useSelector(
    (state) => state.securityReducer.SearchCorporateUsersData
  );
  // Get all user status selector
  const GetAllUserStatus = useSelector((state) => state.auth.allUserStatusData);

  // state for edit corporate user
  const [editUser, setEditUser] = useState(searchEditCorporateUserSchema);

  const [editCorporateUserUpdate, seCorporateUserUpdate] = useState(null);

  const [editCorporateUserStatus, setEditCorporateUserStatus] = useState({
    value: 0,
    label: "",
  });

  //edit modal on js-security-admin
  const [editModalSecurity, setEditModalSecurity] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);

  //state for storing user Status
  const [statusOptions, setStatusOptions] = useState([]);
  const [statusID, setStatusID] = useState({
    value: 0,
    label: "",
  });

  const [corporateUserTableData, setCorporateUserTableData] = useState([]);

  const [dropdownvalue, setDropdownvalue] = useState({
    value: 50,
    label: "50",
  });
  //state for save and cancel button
  const confirmationModal = useSelector(
    (state) => state.securityModalReducer.confirmationModal
  );
  const [modalState, setModalState] = useState(0);

  const options = [
    { value: 50, label: "50" },
    { value: 100, label: "100" },
    { value: 150, label: "150" },
  ];

  //row length on scroll
  const [sRow, setSRow] = useState(0);
  const [recordsLength, setRecordLength] = useState(0);
  const [showExportOptions, setShowExportOptions] = useState(false);
  // Function to toggle the export options (PDF & Excel buttons)
  const toggleExportOptions = () => {
    setShowExportOptions(!showExportOptions);
  };
  //initial APIs calling
  useEffect(() => {
    dispatch(GetAllUserStatusAPI(navigate));
    let Data = {
      Name: "",
      CompanyName: "",
      Email: "",
      StatusID: 0,
      sRow: 0,
      Length: 10,
    };

    dispatch(SearchCorporateUsersAPI(navigate, Data));
  }, []);

  //Custome hook for Scrolling (1)
  const { hasReachedBottom, setHasReachedBottom } = useTableScrollBottom(() => {
    console.log("🚀 Table reached bottom");
    // Load more data here if needed
    if (recordsLength !== corporateUserTableData.length) {
      let Data = {
        Name: "",
        CompanyName: "",
        Email: "",
        StatusID: 0,
        sRow: sRow,
        Length: 10,
      };
      dispatch(SearchCorporateUsersAPI(navigate, Data));
    }
  });

  useEffect(() => {
    if (SearchCorporateUsersData !== null) {
      try {
        const { corporateUsers, totalRecords } = SearchCorporateUsersData;
        if (hasReachedBottom) {
          setHasReachedBottom(false);
          setCorporateUserTableData([
            ...corporateUserTableData,
            ...corporateUsers,
          ]);
          let sRows = corporateUserTableData.length + corporateUsers.length;
          setSRow(sRows);
          setRecordLength(totalRecords);
        } else {
          setHasReachedBottom(false);
          setCorporateUserTableData(corporateUsers);
          setSRow(corporateUsers.length);
          setRecordLength(totalRecords);
        }
      } catch (error) {}
    } else if (SearchCorporateUsersData === null) {
      if (!hasReachedBottom) {
        setHasReachedBottom(false);
        setCorporateUserTableData([]);
        setRecordLength(0);
        setSRow(0);

        // setCorporateUserTableData([...corporateUserTableData]);
      }
    }
  }, [SearchCorporateUsersData]);

  useEffect(() => {
    if (corporateUserBulkUpload !== null) {
      try {
        let Data = {
          Name: "",
          CompanyName: "",
          Email: "",
          StatusID: 0,
          sRow: sRow,
          Length: 10,
        };
        dispatch(SearchCorporateUsersAPI(navigate, Data));
        setCorporateUserBulkUpload(null);
      } catch (error) {
        console.log("error", error);
      }
    }
  }, [corporateUserBulkUpload]);

  useEffect(() => {
    if (corporateUserUpdated !== null) {
      try {
        const { user } = corporateUserUpdated;
        setCorporateUserTableData((prevTableData) => {
          return prevTableData.map((data2, index) => {
            if (data2.userID === user.userID) {
              return {
                ...data2,
                name: user.name,
              };
            }
            return data2;
          });
        });
      } catch (error) {}
    }
    setCorporateUserUpdated(null);
  }, [corporateUserUpdated]);

  useEffect(() => {
    if (corporateUserRoleStatusChange !== null) {
      try {
        const { updatedUser } = corporateUserRoleStatusChange;
        setCorporateUserTableData((prevTableData) => {
          return prevTableData.map((data2, index) => {
            if (data2.userID === updatedUser.userID) {
              return {
                ...data2,
                statusId: updatedUser.statusId,
              };
            }
            return data2;
          });
        });
      } catch (error) {}
    }
  }, [corporateUserRoleStatusChange]);

  useEffect(() => {
    if (corproateUpdated !== null) {
      try {
        const { corporate } = corproateUpdated;
        setCorporateUserTableData((prevTableData) => {
          return prevTableData.map((data2, index) => {
            if (data2.corporateID === corporate.corporateID) {
              return {
                ...data2,
                corporateName: corporate.corporateName,
              };
            }
            return data2;
          });
        });

        setCorporateUpdated(null);
      } catch (error) {}
    }
  }, [corproateUpdated]);

  //edit user security admin validate handler
  const editUserValidateHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "CorporateName" && value !== "") {
      console.log("valuevalueemailvaluevalueemail", value);
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      if (valueCheck !== "") {
        setEditUser({
          ...editUser,
          CorporateName: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "CorporateName" && value === "") {
      setEditUser({
        ...editUser,
        CorporateName: {
          value: "",
          errorMessage: "",
          errorStatus: true,
        },
      });
    }

    if (name === "email" && value !== "") {
      console.log("valuevalueemailvaluevalueemail", value);
      if (value !== "") {
        setEditUser({
          ...editUser,
          LoginID: {
            value: value.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "email" && value === "") {
      setEditUser({
        ...editUser,
        LoginID: {
          value: "",
          errorMessage: "",
          errorStatus: true,
        },
      });
    }

    if (name === "LoginID" && value !== "") {
      let valueCheck = value.replace(/[^\d]/g, "");
      if (valueCheck !== "") {
        setEditUser({
          ...editUser,
          LoginID: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "LoginID" && value === "") {
      setEditUser({
        ...editUser,
        LoginID: { value: "", errorMessage: "", errorStatus: false },
      });
    }

    if (name === "Name" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      if (valueCheck !== "") {
        setEditUser({
          ...editUser,
          Name: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "Name" && value === "") {
      setEditUser({
        ...editUser,
        Name: { value: "", errorMessage: "", errorStatus: false },
      });
    }
  };
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

  const handleSelectStatus = async (selectedStatus) => {
    setStatusID(selectedStatus);
  };

  //reset handler for edit user
  const resetHandler = () => {
    dispatch(ConfirmationModalSecurityAdmin(true));
    setModalState(2);
  };

  //reset handler for edit user (3)
  const resetHandlerYes = () => {
    setHasReachedBottom(false);
    setRecordLength(0);
    setSRow(0);
    setCorporateUserTableData([]);
    if (modalState === 2) {
      dispatch(ConfirmationModalSecurityAdmin(false));
      setModalState(0);

      let Data = {
        Name: "",
        CompanyName: "",
        Email: "",
        StatusID: 0,
        sRow: 0,
        Length: 10,
      };

      dispatch(SearchCorporateUsersAPI(navigate, Data));
      setEditUser({
        ...editUser,
        CorporateName: {
          value: "",
        },

        LoginID: {
          value: "",
        },

        Name: {
          value: "",
        },
      });
      setStatusID({
        value: 0,
        label: "",
      });
    }
  };

  //onClose modal
  const closeUpdateModal = () => {
    setUpdateModal(false);
  };

  const handleCloseEditCorporateUserModal = useCallback(() => {
    setEditModalSecurity(false);
    setEditCorporateUserStatus({
      value: 0,
      label: "",
    });
  }, []);

  const handleClickEdit = (record) => {
    setEditModalSecurity(true);
    if (statusOptions.length > 0) {
      let findStatusObj = statusOptions.find(
        (statusData, index) => statusData.statusID === record.statusId
      );

      if (findStatusObj !== undefined) {
        setEditCorporateUserStatus({
          value: findStatusObj.statusID,
          label: findStatusObj.statusName,
        });
      }
    }
    seCorporateUserUpdate(record);
  };

  const columns = [
    {
      title: (
        <label className="EditBankUser-bottom-table-header">
          Corporate Name
        </label>
      ),
      dataIndex: "corporateName",
      key: "CorporateName",
      align: "left",
      ellipsis: true,
    },
    {
      title: (
        <label className="EditBankUser-bottom-table-header">Login ID</label>
      ),
      dataIndex: "email",
      key: "email",
      align: "left",
      ellipsis: true,
    },
    {
      title: (
        <label className="EditBankUser-bottom-table-header">User Name</label>
      ),
      dataIndex: "name",
      key: "name",
      align: "left",
      ellipsis: true,
    },
    {
      title: <label className="EditBankUser-bottom-table-header">Status</label>,
      dataIndex: "statusId",
      key: "statusId",
      ellipsis: true,
      align: "left",
      render: (text, record) => {
        if (statusOptions.length > 0) {
          let StatusNameFind = statusOptions.find(
            (role, index) => role.statusID === record.statusId
          );
          console.log(StatusNameFind, "roleNameFind");
          if (StatusNameFind !== undefined) {
            return StatusNameFind.statusName;
          }
        }
        return text;
      },
    },
    {
      title: <label className="EditBankUser-bottom-table-header">Edit</label>,
      dataIndex: "edit",
      key: "edit",
      ellipsis: true,
      align: "left",
      render: (text, record) => {
        return (
          <label
            className="edit-update-column"
            onClick={() => {
              handleClickEdit(record);
            }}
          >
            <i className="icon-edit editCorporate-user-icon-color" />
          </label>
        );
      },
    },
  ];

  const UpdateBtnHandle = () => {
    setEditModalSecurity(false);
    setUpdateModal(true);
  };

  const handleChangeDropDown = (value) => {
    setDropdownvalue(value);
  };

  //handling scroll while search (2)
  const handleSearch = () => {
    setSRow(0);
    setRecordLength(0);
    setHasReachedBottom(false);
    setCorporateUserTableData([]);
    let Data = {
      Name: editUser.Name.value,
      CompanyName: editUser.CorporateName.value,
      Email: editUser.LoginID.value,
      StatusID: statusID.statusID,
      sRow: 0,
      Length: 10,
    };

    console.log("data is: ", Data);
    dispatch(SearchCorporateUsersAPI(navigate, Data));
  };

  const handleProceed = () => {
    const data = {
      StatusID: editCorporateUserStatus.value,
      UserID: editCorporateUserUpdate.userID,
    };

    console.log("data to store is: ", data);
    dispatch(UpdateCorporateUserAPI(navigate, data, setUpdateModal));
  };

  useEffect(() => {
    if (GetAllUserStatus !== null) {
      try {
        let newUserStatusData = GetAllUserStatus.status.map((status) => {
          return {
            ...status,
            value: status.statusID,
            label: status.statusName,
          };
        });
        setStatusOptions(newUserStatusData);
      } catch (error) {}
    }
  }, [GetAllUserStatus]);

  const handleExport = (format) => {
    if (format === "excel") {
      let data = {
        Name: editUser.Name.value,
        CompanyName: editUser.CorporateName.value,
        Email: editUser.LoginID.value,
        StatusID: Number(statusID.value),
        sRow: 0,
        Length: 10,
      };
      dispatch(downloadCorporateUserReportApi(navigate, data));
    } else if (format === "pdf") {
      let data = {
        Name: editUser.Name.value,
        CompanyName: editUser.CorporateName.value,
        Email: editUser.LoginID.value,
        StatusID: Number(statusID.value),
      };
      dispatch(downloadPDFCorporateUserSecurityAdminReportApi(navigate, data));
    }
  };

  return (
    <>
      <section className="edit-user-container">
        <Row>
          <Col lg={12} md={12} sm={12}>
            <div className="editCorporateUser-label">Edit Corporate User</div>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col lg={12} md={12} sm={12}>
            <Paper className="span-edit-user">
              <Row className="mt-1">
                <Col lg={2} md={2} sm={12} className="pe-0">
                  <TextField
                    name="CorporateName"
                    className="text-fields-Corporate-edituser"
                    labelClass="d-none"
                    placeholder="Corporate Name"
                    maxLength={100}
                    value={editUser.CorporateName.value}
                    onChange={editUserValidateHandler}
                  />
                </Col>
                <Col lg={2} md={2} sm={12} className="pe-0">
                  <TextField
                    name="email"
                    className="text-fields-Corporate-edituser"
                    labelClass="d-none"
                    maxLength={100}
                    placeholder="Login ID"
                    value={editUser.LoginID.value}
                    onChange={editUserValidateHandler}
                  />
                </Col>
                <Col lg={2} md={2} sm={12} className="pe-0">
                  <TextField
                    name="Name"
                    labelClass="d-none"
                    maxLength={100}
                    className="text-fields-Corporate-edituser"
                    placeholder="Name"
                    value={editUser.Name.value}
                    onChange={editUserValidateHandler}
                  />
                </Col>
                <Col lg={2} md={2} sm={12} className="dropdown pe-0">
                  <Select
                    name="statusID"
                    className="edit-Corporate-user-select-status"
                    placeholder="Status"
                    options={statusOptions}
                    value={statusID.value !== 0 ? statusID : null}
                    onChange={handleSelectStatus}
                  />
                </Col>

                <Col
                  lg={4}
                  md={4}
                  sm={12}
                  className="d-flex justify-content-left gap-1"
                >
                  <Button
                    icon={
                      <i className="icon-search EditCorporateUser-icon"></i>
                    }
                    text="Search"
                    className="search-Corporate-Edit-User-btn"
                    onClick={handleSearch}
                  />
                  <Button
                    icon={
                      <i className="icon-refresh EditCorporateUser-icon"></i>
                    }
                    text="Reset"
                    onClick={resetHandler}
                    className="reset-Corporate-Edit-User-btn"
                  />
                  <Popover
                    content={
                      <div className="EditBankUser_export-options">
                        <Button
                          icon={<img src={pdfIcon} alt="PDF Icon" />}
                          onClick={() => handleExport("pdf")}
                          className="EditBankUser_export-button"
                        />
                        <Button
                          icon={<img src={excelIcon} alt="Excel Icon" />}
                          onClick={() => handleExport("excel")}
                          className="EditBankUser_export-button"
                        />
                      </div>
                    }
                    trigger="click"
                    open={open}
                    onOpenChange={handleOpenChange}
                    placement="bottomRight"
                    arrow={false}
                  >
                    <Button
                      icon={<i className="icon-download"></i>}
                      className="EditBankUser_Main-Export-Button"
                      text="Export"
                      iconClass="resetIconClass"
                      onClick={toggleExportOptions}
                    />
                  </Popover>
                </Col>
              </Row>

              <Row className="mt-4">
                <Col lg={12} md={12} sm={12}>
                  <Table
                    column={columns}
                    rows={corporateUserTableData}
                    className="UniversalList-table"
                    scroll={{ y: 300, x: "scroll" }}
                  />
                </Col>
              </Row>
            </Paper>
          </Col>
        </Row>
      </section>

      <Modal
        show={updateModal}
        setShow={setUpdateModal}
        size="lg"
        className={"modaldialog modal-Update"}
        modalHeaderClassName="d-none"
        modalFooterClassName="modal-update-footer"
        onHide={closeUpdateModal}
        ModalBody={
          <Fragment>
            {updateModal ? (
              <Fragment>
                <Row>
                  <Col lg={12} md={12} sm={12}>
                    <p className="update-modal-heading">
                      Are you sure want to update?
                    </p>
                  </Col>
                </Row>
              </Fragment>
            ) : null}
          </Fragment>
        }
        ModalFooter={
          <Fragment>
            <Row>
              <Col
                lg={12}
                md={12}
                sm={12}
                className="d-flex justify-content-center"
              >
                <Button
                  icon={
                    <>
                      <span>Proceed</span>
                      <i className="icon-arrow-right"></i>
                    </>
                  }
                  className="Update-Proceed-btn"
                  onClick={handleProceed}
                />
              </Col>
            </Row>
          </Fragment>
        }
      />
      {confirmationModal === true && (
        <ActivateConfirmationModal
          handleYesButton={resetHandlerYes}
          handleNoButton={handleNoButton}
        />
      )}

      {editModalSecurity ? (
        <EditCorporateModal
          modalEdit={editModalSecurity}
          editCorporateUserUpdate={editCorporateUserUpdate}
          setModalEdit={setEditModalSecurity}
          StatusData={statusOptions}
          editCorporateUserStatus={editCorporateUserStatus}
          setEditCorporateUserStatus={setEditCorporateUserStatus}
          UpdateBtnHandle={UpdateBtnHandle}
          handleDiscard={handleCloseEditCorporateUserModal}
          // onChangeTextFieldHandler={onchangeModalTextFieldsHandler}
        />
      ) : null}
      {securityReducer.Loading && <Loader />}
    </>
  );
};

export default EditCorporateUser;
