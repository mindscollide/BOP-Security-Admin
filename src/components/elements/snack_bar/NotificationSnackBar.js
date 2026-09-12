import React, { useEffect } from "react";
import { notification } from "antd";
import IconElement from "./IconElement";
import "./NotificationSnackbar.css";

// Presentational only — driven entirely by the `message` array prop (built by
// context/NotificationContext.js). Supports multiple concurrent toasts, since
// antd's imperative api.open() stacks by key rather than replacing in place.
const NotificationSnackBar = ({ message = [] }) => {
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    if (!message || message.length === 0) return;

    message.forEach((msg) => {
      // Severity ("success"/"error", set by the reducers, or passed directly to
      // showMessage()) drives the color — green for success, red for anything
      // else/missing.
      const severityClass =
        msg?.severity?.toLowerCase() === "success"
          ? "custom-notification-snackbar-success"
          : "custom-notification-snackbar-error";

      // Keyed per message so antd can dedupe/update in place rather than stack
      // duplicates if the same id is passed again.
      api.open({
        key: msg?.id,
        message: msg?.message,
        description: msg?.description || null,
        closeIcon: <IconElement iconClass="icon-close" />,
        className: `custom-notification-snackbar ${severityClass}`,
        duration: 3, // auto-close after 3 seconds
      });
    });
  }, [message, api]);

  return <>{contextHolder}</>;
};

export default NotificationSnackBar;
