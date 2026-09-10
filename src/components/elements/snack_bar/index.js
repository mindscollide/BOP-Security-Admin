import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { useStyles } from "./NotificationStyle";

const Message = {
  success: "success",
  error: "error",
  info: "info",
  warning: "warning",
};

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

// Generic snackbar — drop it anywhere and drive it with local state:
//
//   const [toast, setToast] = useState({ open: false, message: "", type: Message.error });
//   setToast({ open: true, message: "User updated", type: Message.success });
//   setToast({ open: true, message: "Something went wrong", type: Message.error });
//
//   <Notification
//     open={toast.open}
//     message={toast.message}
//     type={toast.type}
//     setOpen={setToast}
//   />
//
// `type` accepts Message.success / Message.error / Message.info / Message.warning
// (plain "success" / "error" / "info" / "warning" strings work too). Defaults to
// "error" so existing callers that don't pass a type keep their current look.
const Notification = ({
  setOpen,
  open,
  message,
  type = Message.error,
  autoHideDuration = 4000,
}) => {
  const classes = useStyles();
  const vertical = "top";
  const horizontal = "right";
  const severity = Message[type] || Message.error;

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen({ open: false, message: "" });
  };

  return (
    <>
      {message !== "" ? (
        <div className={classes.root}>
          <Snackbar
            className={classes.snackbar}
            autoHideDuration={autoHideDuration}
            anchorOrigin={{ vertical, horizontal }}
            open={open}
            onClose={handleClose}
            message={message}
            key={vertical + horizontal}
          >
            <Alert
              onClose={handleClose}
              severity={severity}
              className={classes[severity]}
            >
              {message}
            </Alert>
          </Snackbar>
        </div>
      ) : null}
    </>
  );
};
export { Notification, Message };
