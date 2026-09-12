import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Notification, Message } from "../components/elements";
import { cleareMessage } from "../store/actions/Auth_Actions";
import { hideToast } from "../store/actions/UI_Actions";

const ResponseMessage = () => {
  const dispatch = useDispatch();
  const timerRef = useRef(null);

  // Security
  const securityAdminResponseMessage = useSelector(
    (state) => state.securityReducer.ResponseMessage
  );
  const securityAdminSeverity = useSelector(
    (state) => state.securityReducer.Severity
  );

  // Auth
  const authResponseMessage = useSelector(
    (state) => state.auth.ResponseMessage
  );
  const authSeverity = useSelector(
    (state) => state.auth.Severity
  );

  // Settings
  const settingsResponseMessage = useSelector(
    (state) => state.settingsReducer.ResponseMessage
  );
  const settingsSeverity = useSelector(
    (state) => state.settingsReducer.Severity
  );

  // Download Report
  const downloadReportResponseMessage = useSelector(
    (state) => state.DownloadReportReducer.ResponseMessage
  );
  const downloadReportSeverity = useSelector(
    (state) => state.DownloadReportReducer.Severity
  );

  // Global Toast
  const toast = useSelector((state) => state.ui.toast);

  const [open, setOpen] = useState({
    open: false,
    message: "",
    type: "",
  });

  const showToast = (message, severity) => {
    // Show only if both message and severity exist
    if (!message || !severity) return;

    // Clear old timeout
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    setOpen({
      open: true,
      message,
      type: severity,
    });

    timerRef.current = setTimeout(() => {
      setOpen((prev) => ({
        ...prev,
        open: false,
      }));
    }, 5000);
  };

  // Security
  useEffect(() => {
    if (securityAdminResponseMessage && securityAdminSeverity) {
      showToast(
        securityAdminResponseMessage,
        securityAdminSeverity
      );

      dispatch(cleareMessage());
    }
  }, [securityAdminResponseMessage, securityAdminSeverity, dispatch]);

  // Auth
  useEffect(() => {
    if (authResponseMessage && authSeverity) {
      showToast(
        authResponseMessage,
        authSeverity
      );

      dispatch(cleareMessage());
    }
  }, [authResponseMessage, authSeverity, dispatch]);

  // Settings
  useEffect(() => {
    if (settingsResponseMessage && settingsSeverity) {
      showToast(
        settingsResponseMessage,
        settingsSeverity
      );

      dispatch(cleareMessage());
    }
  }, [settingsResponseMessage, settingsSeverity, dispatch]);

  // Download Report
  useEffect(() => {
    if (
      downloadReportResponseMessage &&
      downloadReportSeverity
    ) {
      showToast(
        downloadReportResponseMessage,
        downloadReportSeverity
      );

      dispatch(cleareMessage());
    }
  }, [
    downloadReportResponseMessage,
    downloadReportSeverity,
    dispatch,
  ]);

  // Global Toast
  useEffect(() => {
    if (
      toast?.open &&
      toast?.message &&
      toast?.severity
    ) {
      showToast(
        toast.message,
        toast.severity
      );

      dispatch(hideToast());
    }
  }, [
    toast?.open,
    toast?.message,
    toast?.severity,
    dispatch,
  ]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <Notification
      setOpen={setOpen}
      open={open.open}
      message={open.message}
      type={open.type}
    />
  );
};

export default ResponseMessage;