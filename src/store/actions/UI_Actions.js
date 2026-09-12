import * as actions from "../action_types";

// Global loader control. Dispatch these from ANY thunk (Auth_Actions,
// Security_Admin, ...) or directly from any component — the loader doesn't
// belong to any single feature reducer, so nothing needs to be wired up
// per-screen to use it; <Loader/> (mounted once in App.js) picks it up
// automatically via the `ui` slice.
//
//   dispatch(showLoader());
//   await someAsyncWork();
//   dispatch(hideLoader());
//
// (Toasts are handled separately — see context/NotificationContext.js's
// useNotification().showMessage(message, severity).)
//
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

export { showLoader, hideLoader };
