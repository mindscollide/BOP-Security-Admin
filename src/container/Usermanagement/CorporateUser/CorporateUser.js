import React, { Fragment, useCallback, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import {
  TextField,
  Button,
  Table,
  Paper,
  Loader,
  Modal,
} from "../../../components/elements";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import EditCorporateModal from "../../Pages/Modals/Edit-Corporate-User-Modal/EditCorporateModal";
import "./CorporateUser.css";
import { ConfirmationModalSecurityAdmin } from "../../../store/actions/Security_Admin_Modal";
import ActivateConfirmationModal from "../../../helpers/Modals/ActivateConfirmationModal";
import { searchEditCorporateUserSchema } from "../../../utils/schemas";
import { GetAllUserStatusAPI } from "../../../store/actions/Auth_Actions";
import {
  SearchCorporateUsersAPI,
  UpdateCorporateUserAPI,
} from "../../../store/actions/Security_Admin";
import { useTableScrollBottom } from "../../../helpers/useTableScrollBottom";
const EditUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Global State
  const { securityReducer } = useSelector((state) => state);
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

  const options = [
    { value: 50, label: "50" },
    { value: 100, label: "100" },
    { value: 150, label: "150" },
  ];
  const [sRow, setSRow] = useState(0);
  const [recordsLength, setRecordLength] = useState(0);

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
    } else {
      if (!hasReachedBottom) {
        setCorporateUserTableData([]);
        setHasReachedBottom(false);
        setCorporateUserTableData([...corporateUserTableData]);
      }
    }
  }, [SearchCorporateUsersData]);

  // const onchangeModalTextFieldsHandler = (e) => {
  //   let name = e.target.name;
  //   let value = e.target.value;

  //   if (name === "Email" && value !== "") {
  //     if (value !== "") {
  //       setModalEditState({
  //         ...modalEditState,
  //         Email: {
  //           value: value.trimStart(),
  //           errorMessage: "",
  //           errorStatus: false,
  //         },
  //       });
  //     }
  //   } else if (name === "Email" && value === "") {
  //     setModalEditState({
  //       ...modalEditState,
  //       Email: {
  //         value: "",
  //         errorMessage: "",
  //         errorStatus: true,
  //       },
  //     });
  //   }

  //   if (name === "FirstName" && value !== "") {
  //     let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
  //     console.log("valueCheckvalueCheck", valueCheck);
  //     if (valueCheck !== "") {
  //       setModalEditState({
  //         ...modalEditState,
  //         FirstName: {
  //           value: valueCheck.trimStart(),
  //           errorMessage: "",
  //           errorStatus: false,
  //         },
  //       });
  //     }
  //   } else if (name === "FirstName" && value === "") {
  //     setModalEditState({
  //       ...modalEditState,
  //       FirstName: { value: "", errorMessage: "", errorStatus: false },
  //     });
  //   }

  //   if (name === "LastName" && value !== "") {
  //     let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
  //     console.log("valueCheckvalueCheck", valueCheck);
  //     if (valueCheck !== "") {
  //       setModalEditState({
  //         ...modalEditState,
  //         LastName: {
  //           value: valueCheck.trimStart(),
  //           errorMessage: "",
  //           errorStatus: false,
  //         },
  //       });
  //     }
  //   } else if (name === "LastName" && value === "") {
  //     setModalEditState({
  //       ...modalEditState,
  //       LastName: { value: "", errorMessage: "", errorStatus: false },
  //     });
  //   }
  // };

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

  const handleSelectStatus = async (selectedStatus) => {
    setStatusID(selectedStatus);
  };

  //reset handler for edit user
  const resetHandler = () => {
    dispatch(ConfirmationModalSecurityAdmin(true));
  };

  //reset handler for edit user
  const resetHandlerYes = () => {
    let Data = {
      Name: "",
      CompanyName: "",
      Email: "",
      StatusID: "",
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
    console.log("recordrecordrecord", record);
    setEditModalSecurity(true);
    if (statusOptions.length > 0) {
      let findStatusObj = statusOptions.find(
        (statusData, index) => statusData.statusID === record.statusId
      );

      console.log("findStatusObj", findStatusObj);
      if (findStatusObj !== undefined) {
        setEditCorporateUserStatus({
          value: findStatusObj.statusID,
          label: findStatusObj.statusName,
        });
      }
      console.log(findStatusObj, "findStatusObj");
    }
    seCorporateUserUpdate(record);
  };

  const columns = [
    {
      title: <label className='bottom-table-header'>Corporate Name</label>,
      dataIndex: "corporateName",
      key: "CorporateName",
      width: "190px",
      align: "left",
      ellipsis: true,
    },
    {
      title: <label className='bottom-table-header'>Login ID</label>,
      dataIndex: "email",
      key: "email",
      align: "left",
      width: "270px",
      ellipsis: true,
    },
    {
      title: <label className='bottom-table-header'>User Name</label>,
      dataIndex: "name",
      key: "name",
      width: "190px",
      align: "centers",
      ellipsis: true,
    },
    {
      title: <label className='bottom-table-header'>Status</label>,
      dataIndex: "statusId",
      key: "statusId",
      ellipsis: true,
      align: "center",
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
      title: <label className='bottom-table-header'>Edit</label>,
      dataIndex: "edit",
      key: "edit",
      ellipsis: true,
      align: "center",
      render: (text, record) => {
        return (
          <label
            className='edit-update-column'
            onClick={() => {
              handleClickEdit(record);
            }}>
            <i className='icon-edit edit-user-icon-color' />
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

  const handleSearch = () => {
    setSRow(0);
    setRecordLength(0);
    setHasReachedBottom(false);
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

  return (
    <>
      <section className='edit-user-container'>
        <Row>
          <Col lg={12} md={12} sm={12}>
            <div className='edit-user-label'>Edit Corporate User</div>
          </Col>
        </Row>
        <Row className='mt-3'>
          <Col lg={12} md={12} sm={12}>
            <Paper className='span-edit-user'>
              <Row className='mt-3'>
                <Col lg={2} md={2} sm={12} className='pe-0'>
                  <TextField
                    name='CorporateName'
                    className='text-fields-Corporate-edituser'
                    labelClass='d-none'
                    placeholder='Corporate Name'
                    maxLength={100}
                    value={editUser.CorporateName.value}
                    onChange={editUserValidateHandler}
                  />
                </Col>
                <Col lg={2} md={2} sm={12} className='pe-0'>
                  <TextField
                    name='email'
                    className='text-fields-Corporate-edituser'
                    labelClass='d-none'
                    maxLength={100}
                    placeholder='Login ID'
                    value={editUser.LoginID.value}
                    onChange={editUserValidateHandler}
                  />
                </Col>
                <Col lg={2} md={2} sm={12} className='pe-0'>
                  <TextField
                    name='Name'
                    labelClass='d-none'
                    maxLength={100}
                    className='text-fields-Corporate-edituser'
                    placeholder='Name'
                    value={editUser.Name.value}
                    onChange={editUserValidateHandler}
                  />
                </Col>
                <Col lg={2} md={2} sm={12} className='dropdown pe-0'>
                  <Select
                    name='statusID'
                    className='edit-Corporate-user-select-status'
                    placeholder='Status'
                    options={statusOptions}
                    value={statusID.value !== 0 ? statusID : null}
                    onChange={handleSelectStatus}
                  />
                </Col>

                <Col lg={4} md={12} sm={12}>
                  <Button
                    icon={<i className='icon-search icon-search-space'></i>}
                    text='Search'
                    className='search-Corporate-Edit-User-btn'
                    onClick={handleSearch}
                  />
                  <Button
                    icon={<i className='icon-refresh icon-reset-space'></i>}
                    text='Reset'
                    onClick={resetHandler}
                    className='reset-Corporate-Edit-User-btn'
                  />

                  <Button
                    icon={<i className='icon-download icon-reset-space'></i>}
                    text='Export'
                    className='export-Corporate-Edit-User-btn'
                  />
                </Col>
              </Row>

              <Row className='mt-4'>
                <Col lg={12} md={12} sm={12}>
                  <span>
                    <Row>
                      <Col
                        lg={12}
                        md={12}
                        sm={12}
                        className='d-flex gap-1 align-items-center'>
                        <span className={"corporate-show-text-above-table"}>
                          Show
                        </span>

                        <Select
                          options={options}
                          value={dropdownvalue}
                          onChange={handleChangeDropDown}
                          className='select-Bank-field-edit'
                        />

                        <span className={"corporate-show-text-above-table"}>
                          entries
                        </span>
                      </Col>
                    </Row>
                  </span>
                  <Table
                    column={columns}
                    rows={corporateUserTableData}
                    className='Edituser-table'
                    scroll={{ y: 350 }}
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
        size='lg'
        className={"modaldialog modal-Update"}
        modalHeaderClassName='d-none'
        modalFooterClassName='modal-update-footer'
        onHide={closeUpdateModal}
        ModalBody={
          <Fragment>
            {updateModal ? (
              <Fragment>
                <Row>
                  <Col lg={12} md={12} sm={12}>
                    <p className='update-modal-heading'>
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
                className='d-flex justify-content-center'>
                <Button
                  icon={
                    <>
                      <span>Proceed</span>
                      <i className='icon-arrow-right'></i>
                    </>
                  }
                  className='Update-Proceed-btn'
                  onClick={handleProceed}
                />
              </Col>
            </Row>
          </Fragment>
        }
      />

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
      <ActivateConfirmationModal onConfirm={resetHandlerYes} />
    </>
  );
};

export default EditUser;
