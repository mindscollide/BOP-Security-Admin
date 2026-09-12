import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import NotificationSnackBar from "../components/elements/snack_bar/NotificationSnackBar";
import { cleareMessage } from "../store/actions/Auth_Actions";

const NotificationContext = createContext();

// Mounted once in App.js, wrapping the whole app. Two ways a toast gets shown:
//
// 1. Any feature reducer's ResponseMessage + Severity pair — every *_SUCCESS
//    case sets Severity: "success", every *_FAIL case sets Severity: "error"
//    (see the reducers themselves). Picked up automatically below, no wiring
//    needed per screen.
// 2. useNotification().showMessage(message, severity) — call this from any
//    component for a one-off message that doesn't belong to a specific
//    reducer (e.g. a client-side validation error).
//
// `messages` is an array, so multiple toasts from different sources can stack
// at once instead of one replacing another before it's been seen.
export const NotificationProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);
  const timeouts = useRef({});

  const authMsg = useSelector((state) => state.auth.ResponseMessage);
  const authSeverity = useSelector((state) => state.auth.Severity);
  const securityMsg = useSelector(
    (state) => state.securityReducer.ResponseMessage
  );
  const securitySeverity = useSelector(
    (state) => state.securityReducer.Severity
  );
  const settingsMsg = useSelector(
    (state) => state.settingsReducer.ResponseMessage
  );
  const settingsSeverity = useSelector(
    (state) => state.settingsReducer.Severity
  );
  const downloadMsg = useSelector(
    (state) => state.DownloadReportReducer.ResponseMessage
  );
  const downloadSeverity = useSelector(
    (state) => state.DownloadReportReducer.Severity
  );

  const sources = [
    { key: "auth", msg: authMsg, severity: authSeverity },
    { key: "security", msg: securityMsg, severity: securitySeverity },
    { key: "settings", msg: settingsMsg, severity: settingsSeverity },
    { key: "download", msg: downloadMsg, severity: downloadSeverity },
  ];

  // Listen to all Redux messages. Every source's value above is read (from the
  // same render) before this runs, so dispatching cleareMessage() for one
  // source here can't wipe out another source's not-yet-picked-up message.
  useEffect(() => {
    sources.forEach(({ key, msg, severity }) => {
      if (!msg || timeouts.current[key]) return;

      const newItem = {
        id: `${key}-${Date.now()}`,
        message: msg,
        source: key,
        severity,
      };
      setMessages((prev) => [...prev, newItem]);

      // Every feature reducer listens for this same shared CLEARE_MESSAGE
      // action, so this resets all of them — harmless to call once per
      // arriving message since clearing an already-empty field is a no-op.
      dispatch(cleareMessage());

      timeouts.current[key] = setTimeout(() => {
        setMessages((prev) => prev.filter((m) => m.source !== key));
        delete timeouts.current[key];
      }, 3000);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authMsg, authSeverity, securityMsg, securitySeverity, settingsMsg, settingsSeverity, downloadMsg, downloadSeverity]);

  // Unmount-only cleanup — kept in its own effect (empty deps) so it doesn't
  // fire (and cancel every in-flight auto-dismiss timer) on every new message.
  useEffect(() => {
    return () => {
      Object.values(timeouts.current).forEach(clearTimeout);
      timeouts.current = {};
    };
  }, []);

  // Manual trigger — for anything that isn't a Redux-driven ResponseMessage
  // (e.g. client-side validation before an API call is even made).
  const showMessage = useCallback((msg, severity = "error") => {
    const id = `manual-${Date.now()}`;
    setMessages((prev) => [...prev, { id, message: msg, source: "manual", severity }]);
    setTimeout(() => {
      setMessages((prev) => prev.filter((m) => m.id !== id));
    }, 3000);
  }, []);

  return (
    <NotificationContext.Provider value={{ showMessage }}>
      {children}
      <NotificationSnackBar message={messages} />
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
