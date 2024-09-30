import React, { useEffect, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { Table, Paper } from "../../../components/elements";
import CreateModal from "../../Pages/Modals/Create-User-Modal/CreateModal";
import AcceptModal from "../../Pages/Modals/Accept-User-Modal/AcceptModal";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import "./PendingApprovalBank.css";
import { getNewBankUserRequestMainApi } from "../../../store/actions/Security_Admin";

const PendingApprovalBank = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { securityReducer } = useSelector((state) => state);
  console.log(securityReducer, "Aasdaasasasa");
  //modal for create user for reject
  const [createRejectModal, setCreateRejectModal] = useState(false);

  const [rowData, setRowData] = useState([]);

  //modal for accept user in create
  const [acceptModal, setAcceptModal] = useState(false);

  //open modal accept
  const openAcceptModal = async () => {
    setAcceptModal(true);
  };

  const openRejectModal = async () => {
    setCreateRejectModal(true);
  };

  useEffect(() => {
    dispatch(getNewBankUserRequestMainApi(navigate));
  }, []);

  useEffect(() => {
    if (
      securityReducer.bankUserRequestData.userRequestList !== null &&
      securityReducer.bankUserRequestData.userRequestList !== undefined
    ) {
      setRowData(securityReducer.bankUserRequestData.userRequestList);
    } else {
      setRowData([]);
    }
  }, []);

  const dataSource = [
    {
      key: "1",
      email: "aunnaqvi12@gmail.com",
      name: "Naqvi",
      fK_UserRoleID: "Dealer",
      branch: "-",
    },
    {
      key: "2",
      email: "johnnaqvi33@gmail.com",
      name: "Naqvi",
      fK_UserRoleID: "Branch",
      branch: "1234-Saddar",
    },
    {
      key: "3",
      email: "jAlinaqvi33@gmail.com",
      name: "Rizvi",
      fK_UserRoleID: "Treasury",
      branch: "-",
    },
  ];

  // column of create user
  const columnsCreate = [
    {
      title: <label className="bottom-table-header">Email</label>,
      dataIndex: "email",
      key: "email",
      width: "400px",
      ellipsis: true,
      render: (text, record) => {
        return <>{text}</>;
      },
    },

    {
      title: <label className="bottom-table-header">Employee Name</label>,
      dataIndex: "firstname",
      key: "firstname",
      ellipsis: true,
      render: (text, record) => {
        return <>{text}</>;
      },
    },
    {
      title: <label className="bottom-table-header">Role</label>,
      dataIndex: "fK_UserRoleID",
      key: "fK_UserRoleID",
      ellipsis: true,
      render: (text, record) => {
        return <>{text}</>;
      },
    },
    {
      title: <label className="bottom-table-header">Branch</label>,
      dataIndex: "branchName",
      key: "branchName",
      ellipsis: true,
      render: (text, record) => {
        return <>{text}</>;
      },
    },
    {
      title: <label className="bottom-table-header">Accept</label>,
      dataIndex: "accept",
      key: "accept",
      ellipsis: true,
      align: "center",
      render: (text, data) => {
        return (
          <label onClick={() => openAcceptModal()}>
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
      render: (text, rejectData) => {
        return (
          <label onClick={() => openRejectModal()}>
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
                column={columnsCreate}
                rows={rowData}
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
        />
      ) : null}

      {acceptModal ? (
        <AcceptModal
          modalAccept={acceptModal}
          setModalAccept={setAcceptModal}
        />
      ) : null}
    </>
  );
};

export default PendingApprovalBank;
