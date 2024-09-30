import React, { useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { Table, Paper } from "../../../components/elements";
import CreateModal from "../../Pages/Modals/Create-User-Modal/CreateModal";
import AcceptModal from "../../Pages/Modals/Accept-User-Modal/AcceptModal";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./PendingApprovalCorporate.css";

const PendingApprovalCorporate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { securityReducer } = useSelector((state) => state);
  console.log(securityReducer, "aa");
  //modal for create user for reject
  const [createRejectModal, setCreateRejectModal] = useState(false);

  //modal for accept user in create
  const [acceptModal, setAcceptModal] = useState(false);

  //open modal accept
  const openAcceptModal = async () => {
    setAcceptModal(true);
  };

  const openRejectModal = async () => {
    setCreateRejectModal(true);
  };

  const dataSource = [
    {
      key: "1",
      corporateName: "Zelbury",
      email: "aunnaqvi12@gmail.com",
      userName: "Muhammad Naqvi",
    },
    {
      key: "2",
      corporateName: "Zelbury",
      email: "johnnaqvi33@gmail.com",
      userName: "Muhammad Saif",
    },
    {
      key: "3",
      corporateName: "Zelbury",
      email: "kashifnaqvi453@gmail.com",
      userName: "Muhammad Kashif",
    },
  ];

  // column of create user
  const columnsCreate = [
    {
      title: <label className="bottom-table-header">Corporate Name</label>,
      dataIndex: "corporateName",
      key: "corporateName",
      width: "300px",

      ellipsis: true,
    },
    {
      title: <label className="bottom-table-header">Email</label>,
      dataIndex: "email",
      key: "email",
      width: "400px",
      ellipsis: true,
    },
    {
      title: <label className="bottom-table-header">User Name</label>,
      dataIndex: "userName",
      key: "userName",
      ellipsis: true,
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
              Pending Approval Corporate
            </label>
          </Col>
        </Row>

        <Row className="mt-3">
          <Paper className="span-table">
            <Col lg={12} md={12} sm={12} className="mt-3">
              <Table
                column={columnsCreate}
                rows={dataSource}
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

export default PendingApprovalCorporate;
