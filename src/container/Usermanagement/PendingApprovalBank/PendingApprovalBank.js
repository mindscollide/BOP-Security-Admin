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

const PendingApprovalBank = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState([]);
  const [selectedRequestId, setSelectedRequestId] = useState(null);

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
        dispatch(saveBankUserApi(navigate, registrationID));
        setAcceptModal(false);
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
    dispatch(getNewBankUserRequestApi(navigate));
  }, []);

  useEffect(() => {
    if (GetNewBankUserRequests !== null) {
      try {
        const { userRequestList } = GetNewBankUserRequests;
        if (userRequestList.length > 0) {
          setTableData(GetNewBankUserRequests.userRequestList);
        }
      } catch (error) {
        console.log("Error", error);
      }
    } else if (GetNewBankUserRequests === null) {
      setTableData("");
    }
  }, [GetNewBankUserRequests]);

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
      dataIndex: "fK_UserRoleID",
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
          <label>{record.branchName !== "" ? record.branchName : "-"}</label>
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
