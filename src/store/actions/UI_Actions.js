import * as actions from "../action_types";

// Global toast + loader controls. Dispatch these from ANY thunk (Auth_Actions,
// Security_Admin, ...) or directly from any component — they don't belong to
// any single feature reducer, so nothing needs to be wired up per-screen to
// use them; <GlobalToast/>/<Loader/> (mounted once in App.js) pick them up
// automatically via the `ui` slice.
//
//   dispatch(showToast("User updated", "success"));
//   dispatch(showToast("Something went wrong")); // severity defaults to "error"
//
//   dispatch(showLoader());
//   await someAsyncWork();
//   dispatch(hideLoader());
//
// severity accepts "success" | "error" | "info" | "warning" (matches
// components/elements' Message constants — plain strings so this file doesn't
// have to import the UI layer).
const showToast = (message, severity = "error") => ({
  type: actions.SHOW_TOAST,
  message,
  severity,
});

const hideToast = () => ({
  type: actions.HIDE_TOAST,
});

// showLoader/hideLoader increment/decrement a counter rather than toggling a
// boolean, so two overlapping calls (e.g. two async operations in flight at
// once) can't have one call's hideLoader() hide the loader while the other
// is still running.
const showLoader = () => ({
  type: actions.SHOW_LOADER,
});

const hideLoader = () => ({
  type: actions.HIDE_LOADER,
});

export { showToast, hideToast, showLoader, hideLoader };
