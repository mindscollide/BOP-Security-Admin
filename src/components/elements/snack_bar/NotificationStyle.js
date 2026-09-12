import { makeStyles } from "@material-ui/core/styles";
export const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(10),
    },
  },
  // The Loader overlay sits at z-index 9999; MUI's Snackbar defaults to
  // theme.zIndex.snackbar (1400), so without this it renders underneath it.
  snackbar: {
    zIndex: "10000 !important",
  },
  success: {
    width: "100%",
    backgroundColor: "#32a852",
    color: "#fff",
    marginTop: theme.spacing(5),
    position: "relative",
    fontSize: "15px",
  },
  error: {
    width: "100%",
    backgroundColor: "#ce0000 !important",
    marginTop: theme.spacing(5),
    position: "relative",
    fontSize: "15px",
  },
  warning: {
    width: "100%",
    backgroundColor: "#ed6c02 !important",
    marginTop: theme.spacing(5),
    position: "relative",
    fontSize: "15px",
  },
  info: {
    width: "100%",
    backgroundColor: "#0288d1 !important",
    marginTop: theme.spacing(5),
    position: "relative",
    fontSize: "15px",
  },
}));
