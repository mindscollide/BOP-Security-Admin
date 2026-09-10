import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Notification, Message } from "../components/elements";
import { cleareMessage } from "../store/actions/Auth_Actions";

// Global toast for the plain ResponseMessage string every reducer's *_FAIL (and a
// few *_SUCCESS) actions set. That string carries no success/fail flag of its own,
// so this always renders as an error toast — genuine success toasts need the
// reducer/action to be extended to carry a type, or the screen to call
// <Notification type={Message.success} .../> directly with its own local state.
//
// Each watched slice is reset via CLEARE_MESSAGE right after being picked up. Without
// that the string stays set in Redux forever, so if the exact same message fires
// again later the toast never reopens — the effect's dependency doesn't see a change.
const ResponseMessage = () => {
  const dispatch = useDispatch();
  const securityAdminResponseMessage = useSelector(
    (state) => state.securityReducer.ResponseMessage
  );
  const authResponseMessage = useSelector(
    (state) => state.auth.ResponseMessage
  );
  const settingsResponseMessage = useSelector(
    (state) => state.settingsReducer.ResponseMessage
  );
  const downloadReportResponseMessage = useSelector(
    (state) => state.DownloadReportReducer.ResponseMessage
  );
  const [open, setOpen] = useState({ open: false, message: "" });

  useEffect(() => {
    if (securityAdminResponseMessage !== "") {
      setOpen({ open: true, message: securityAdminResponseMessage });
      dispatch(cleareMessage());
      setTimeout(() => {
        setOpen({ open: false, message: "" });
      }, 5000); // 5 seconds timeout for the snackbar message to disappear.
    }
  }, [securityAdminResponseMessage]);

  useEffect(() => {
    if (authResponseMessage !== "") {
      setOpen({ open: true, message: authResponseMessage });
      dispatch(cleareMessage());
      setTimeout(() => {
        setOpen({ open: false, message: "" });
      }, 5000); // 5 seconds timeout for the snackbar message to disappear.
    }
  }, [authResponseMessage]);

  useEffect(() => {
    if (settingsResponseMessage) {
      setOpen({ open: true, message: settingsResponseMessage });
      dispatch(cleareMessage());
      setTimeout(() => {
        setOpen({ open: false, message: "" });
      }, 5000); // 5 seconds timeout for the snackbar message to disappear.
    }
  }, [settingsResponseMessage]);

  useEffect(() => {
    if (downloadReportResponseMessage) {
      setOpen({ open: true, message: downloadReportResponseMessage });
      dispatch(cleareMessage());
      setTimeout(() => {
        setOpen({ open: false, message: "" });
      }, 5000); // 5 seconds timeout for the snackbar message to disappear.
    }
  }, [downloadReportResponseMessage]);

  return (
    <Notification
      setOpen={setOpen}
      open={open.open}
      message={open.message}
      type={Message.error}
    />
  );
};

export default ResponseMessage;
