import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMqtt } from "../../../../context/MQTTContext";
import {
  getNewCorporateUserRequestApi,
  saveCorporateUserApi,
} from "../../../../store/actions/Security_Admin";
import { useTableScrollBottom } from "../../../../helpers/useTableScrollBottom";
import {
  Loader,
  Notification,
  Paper,
  Table,
} from "../../../../components/elements";
import CreateModal from "../../Modals/Create-User-Modal/CreateModal";
import AcceptModal from "../../Modals/Accept-User-Modal/AcceptModal";
import "./PendingApprovalCorporate.css";
// import {
//   Table,
//   Paper,
//   Loader,
//   Notification,
// } from "../../../../components/elements";
// import CreateModal from "../../Modals/Create-User-Modal/CreateModal";
// import AcceptModal from "../../Modals/Accept-User-Modal/AcceptModal";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import "./PendingApprovalCorporate.css";
// import {
//   getNewCorporateUserRequestApi,
//   saveCorporateUserApi,
// } from "../../../../store/actions/Security_Admin";
// import { useMqtt } from "../../../../context/MQTTContext";
// // import { tab } from "@testing-library/user-event/dist/tab";
// import { useTableScrollBottom } from "../../../../helpers/useTableScrollBottom";

const PendingApprovalCorporate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState([]);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const {
    corproateUserRequested,
    corproateUserCreated,
    corproateUserRejected,
    corproateUpdated
  } = useMqtt();
  //Global State
  const { securityReducer } = useSelector((state) => state);
  //Checking snakbar state
  const [open, setOpen] = useState(false);
  //row length on scroll
  const [sRow, setSRow] = useState(0);
  const [recordsLength, setRecordLength] = useState(0);
  const GetNewCorporateUserRequests = useSelector(
    (state) => state.securityReducer.GetNewCorporateUserRequestsData
  );
  console.log(
    {
      corproateUserRequested,
      corproateUserCreated,
      corproateUserRejected,
      tableData,
    },
    "GetNewCorporateUserRequestsData"
  );

  //modal for create user for reject
  const [createRejectModal, setCreateRejectModal] = useState(false);

  //modal for accept user in create
  const [acceptModal, setAcceptModal] = useState(false);

  //open modal accept
  const openAcceptModal = async (requestId) => {
    setSelectedRequestId(requestId);
    setAcceptModal(true);
  };

  const handleAccept = () => {
    if (selectedRequestId) {
      console.log("selectedRequestId", selectedRequestId);
      try {
        let registrationID = { UserRegistrationRequestID: selectedRequestId };
        dispatch(saveCorporateUserApi(navigate, registrationID));
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
    let Data = {
      sRow: 0,
      Length: 10,
    };
    dispatch(getNewCorporateUserRequestApi(navigate, Data));
  }, []);

  //custom hook for scrolling (lazy loading)
  const { hasReachedBottom, setHasReachedBottom } = useTableScrollBottom(() => {
    console.log("🚀 Table reached bottom");
    // Load more data here if needed
    if (recordsLength !== tableData.length) {
      let Data = {
        sRow: sRow,
        Length: 10,
      };
      dispatch(getNewCorporateUserRequestApi(navigate, Data));
    }
  });

  useEffect(() => {
    if (GetNewCorporateUserRequests !== null) {
      try {
        const { userRequestList, totalRecords } = GetNewCorporateUserRequests;
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
      } catch (error) {}
    } else if (GetNewCorporateUserRequests === null) {
      if (!hasReachedBottom) {
        setHasReachedBottom(false);
        setTableData([]);
        setRecordLength(0);
        setSRow(0);
      }
    }
  }, [GetNewCorporateUserRequests]);

  // Remove from list
  useEffect(() => {
    if (corproateUserCreated !== null) {
      try {
        const { user } = corproateUserCreated;
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
  }, [corproateUserCreated]);

  // Remove From List
  useEffect(() => {
    if (corproateUserRejected !== null) {
      try {
        const { userRegistrationRequestID } = corproateUserRejected;

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
  }, [corproateUserRejected]);

  useEffect(() => {
    if (corproateUserRequested !== null) {
      console.log(corproateUserRequested, "bankUserRequested");
      try {
        let user = corproateUserRequested?.user;
        console.log(user, "bankUserRequested");
        // if()
        setTableData([user, ...tableData]);
      } catch (error) {
        console.log(error);
      }
    }
  }, [corproateUserRequested]);

  useEffect(() => {
    if(corproateUpdated !== null) {
      try {
        const { corporate } = corproateUpdated;
        setTableData((prevTableData) => {
          return prevTableData.map((data2, index) => {
            if (data2.fK_CorporateID === corporate.corporateID) {
              return {
                ...data2,
                corporateName: corporate.corporateName,
              };
            }
            return data2;
          });
        });
      } catch (error) {}
    }
  }, [corproateUpdated])

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
      width: "380px",
      ellipsis: true,
    },
    {
      title: <label className="bottom-table-header">Name</label>,
      dataIndex: "firstname",
      key: "firstname",
      ellipsis: true,
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
              console.log("record", record);
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
              Pending Approval Corporate
            </label>
          </Col>
        </Row>

        <Row className="mt-3">
          <Paper className="span-table">
            <Col lg={12} md={12} sm={12} className="mt-3">
              <Table
                column={columnsCreate}
                rows={tableData}
                scroll={{ y: 400 }}
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

export default PendingApprovalCorporate;
