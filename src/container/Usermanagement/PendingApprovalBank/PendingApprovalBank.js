import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import {
  Table,
  Paper,
  Loader,
  Notification,
} from "../../../components/elements";
import CreateModal from "../../Pages/Modals/Create-User-Modal/CreateModal";
import AcceptModal from "../../Pages/Modals/Accept-User-Modal/AcceptModal";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import "./PendingApprovalBank.css";
import {
  getNewBankUserRequestApi,
  saveBankUserApi,
} from "../../../store/actions/Security_Admin";
import { useMqtt } from "../../../context/MQTTContext";
import { useTableScrollBottom } from "../../../helpers/useTableScrollBottom";

const PendingApprovalBank = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState([]);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const { bankUserRequested, bankUserCreated, bankUserRejected } = useMqtt();
  console.log(
    { bankUserRequested, bankUserCreated, bankUserRejected },
    "bankUserRequestedbankUserRequested"
  );
  //Global State
  const { securityReducer } = useSelector((state) => state);
  //Checking snakbar state
  const [open, setOpen] = useState(false);

  const GetNewBankUserRequests = useSelector(
    (state) => state.securityReducer.GetNewBankUserRequestsData
  );

  //modal for create user for reject
  const [createRejectModal, setCreateRejectModal] = useState(false);

  //modal for accept user in create
  const [acceptModal, setAcceptModal] = useState(false);
  //row length on scroll
  const [sRow, setSRow] = useState(0);
  const [recordsLength, setRecordLength] = useState(0);
  const [modalState, setModalState] = useState(0);

  //Custome hook for Scrolling (1)
  const { hasReachedBottom, setHasReachedBottom } = useTableScrollBottom(() => {
    console.log("🚀 Table reached bottom");
    // Load more data here if needed
    if (recordsLength !== tableData.length) {
      let Data = {
        sRow: sRow,
        Length: 10,
      };
      dispatch(getNewBankUserRequestApi(navigate, Data));
    }
  });

  //open modal accept
  const openAcceptModal = async (requestId) => {
    // console.log(requestId);
    setSelectedRequestId(requestId);

    setAcceptModal(true);
  };

  const handleAccept = () => {
    if (selectedRequestId) {
      // console.log("selectedRequestId", selectedRequestId);
      try {
        let registrationID = { UserRegistrationRequestID: selectedRequestId };
        dispatch(saveBankUserApi(navigate, registrationID,setAcceptModal));
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const openRejectModal = async (record) => {
    setSelectedRequestId(record.userRegistrationRequestID);
    setCreateRejectModal(true);
  };

  useEffect(() => {
    let Data = {
      sRow: 0,
      Length: 10,
    };
    dispatch(getNewBankUserRequestApi(navigate, Data));
  }, []);

  useEffect(() => {
    if (GetNewBankUserRequests !== null) {
      try {
        const { userRequestList, totalRecords } = GetNewBankUserRequests;
        if (hasReachedBottom) {
          setHasReachedBottom(false);
          setRecordLength(totalRecords);
          setTableData([...tableData, ...userRequestList]);
          setSRow(tableData.length + userRequestList.length);
        } else {
          setHasReachedBottom(false);
          setTableData(userRequestList);
          setRecordLength(totalRecords);
          setSRow(userRequestList.length);
        }
      } catch (error) {
        console.log("Error", error);
      }
    } else if (GetNewBankUserRequests === null) {
      if (!hasReachedBottom) {
        setHasReachedBottom(false);
        setTableData([]);
        setRecordLength(0);
        setSRow(0);
      }
    }
  }, [GetNewBankUserRequests]);

  // Remove from list
  useEffect(() => {
    if (bankUserCreated !== null) {
      try {
        const { user } = bankUserCreated;
        let findisExist = tableData.find(
          (rowData, index) =>
            rowData.userRegistrationRequestID === user.userRegistrationRequestID
        );
        if (findisExist !== undefined) {
          setTableData((prevData) => {
            return prevData.filter(
              (tableData, index) =>
                tableData.userRegistrationRequestID !==
                user.userRegistrationRequestID
            );
          });
        }
      } catch (error) {}
    }
  }, [bankUserCreated]);
  // Remove From List
  useEffect(() => {
    if (bankUserRejected !== null) {
      try {
        const { userRegistrationRequestID } = bankUserRejected;
        let findisExist = tableData.find(
          (rowData, index) =>
            rowData.userRegistrationRequestID === userRegistrationRequestID
        );
        if (findisExist !== undefined) {
          setTableData((prevData) => {
            return prevData.filter(
              (tableData, index) =>
                tableData.userRegistrationRequestID !==
              userRegistrationRequestID
            );
          });
        }
      } catch (error) {}
    }
  }, [bankUserRejected]);

  useEffect(() => {
    if (bankUserRequested !== null) {
      console.log(bankUserRequested, "bankUserRequested");
      try {
        let user = bankUserRequested?.user;
        console.log(user, "bankUserRequested");
        // if()
        setTableData([user, ...tableData]);
      } catch (error) {
        console.log(error);
      }
    }
  }, [bankUserRequested]);

  // column of create user
  const columns = [
    {
      title: <label className="bottom-table-header">Email</label>,
      dataIndex: "email",
      key: "email",
      width: "380px",

      ellipsis: true,
    },

    {
      title: <label className="bottom-table-header">Name</label>,
      dataIndex: "firstname",
      key: "firstname",
      width: "280px",

      ellipsis: true,
    },
    {
      title: <label className="bottom-table-header">Role</label>,
      dataIndex: "role",
      key: "fK_UserRoleID",
      ellipsis: true,
    },
    {
      title: <label className="bottom-table-header">Branch</label>,
      dataIndex: "branchName",
      key: "branchName",
      ellipsis: true,
      render: (text, record) => {
        return (
          <label className="d-flex justify-content-center">
            {record.branchName !== "" ? record.branchName : "-"}
          </label>
        );
      },
    },
    {
      title: <label className="bottom-table-header">Accept</label>,
      dataIndex: "accept",
      key: "accept",
      ellipsis: true,
      align: "center",
      render: (text, record) => {
        return (
          <label
            onClick={() => {
              // console.log("record", record);
              openAcceptModal(record.userRegistrationRequestID);
            }}
          >
            <i className="icon-check icon-accept-column"></i>
          </label>
        );
      },
    },
    {
      title: <label className="bottom-table-header">Reject</label>,
      dataIndex: "reject",
      key: "reject",
      ellipsis: true,
      align: "center",
      render: (text, record) => {
        return (
          <label onClick={() => openRejectModal(record)}>
            <i className="icon-close icon-close-column"></i>
          </label>
        );
      },
    },
  ];

  return (
    <>
      <section className="create-user-container">
        <Row>
          <Col lg={12} md={12} sm={12} className="d-flex justify-content-start">
            <label className="Pending-Approval-label">
              Pending Approval Bank
            </label>
          </Col>
        </Row>

        <Row className="mt-3">
          <Paper className="span-table">
            <Col lg={12} md={12} sm={12} className="mt-3">
              <Table
                column={columns}
                rows={tableData}
                className="Createuser-table"
                pagination={false}
                scroll={{ y: 400, x: "scroll" }}
              />
            </Col>
          </Paper>
        </Row>
      </section>

      {createRejectModal ? (
        <CreateModal
          modalReject={createRejectModal}
          setModalReject={setCreateRejectModal}
          rejectUserData={selectedRequestId}
        />
      ) : null}

      {acceptModal ? (
        <AcceptModal
          modalAccept={acceptModal}
          setModalAccept={setAcceptModal}
          acceptHandler={handleAccept}
        />
      ) : null}
      {securityReducer.Loading && <Loader />}
      <Notification setOpen={setOpen} open={open.open} message={open.message} />
    </>
  );
};

export default PendingApprovalBank;
