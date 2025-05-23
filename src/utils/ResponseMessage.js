import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Notification } from "../components/elements";

const ResponseMessage = () => {
  const SecurityAdminResponseMessage = useSelector(
    (state) => state.securityReducer.ResponseMessage
  );
  console.log("SecurityAdminResponseMessage", SecurityAdminResponseMessage);
  useEffect(() => {
    if (SecurityAdminResponseMessage !== "") {
      setOpen({ open: true, message: SecurityAdminResponseMessage });
      setTimeout(() => {
        setOpen({ open: false, message: "" });
      }, 5000); // 5 seconds timeout for the snackbar message to disappear.
    }
  }, [SecurityAdminResponseMessage]);
  // //Checking snakbar state
  const [open, setOpen] = useState({ open: false, message: "" });
  return (
    <Notification setOpen={setOpen} open={open.open} message={open.message} />
  );
};

export default ResponseMessage;
