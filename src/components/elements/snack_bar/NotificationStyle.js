import { makeStyles } from "@material-ui/core/styles";
export const useStyles = makeStyles((theme) => ({
  root: {
    "& > * + *": {
      marginTop: theme.spacing(10),
    },
  },
  BackGroundSucces: {
    width: "100%",
    background:
      "linear-gradient(to bottom, #eeb592 0%, #fc6d0f 100%) !important",
    marginTop: theme.spacing(5),
    position: "relative",
    // zIndex: 5,
  },
  BackGroundfailed: {
    width: "100%",
    backgroundColor: "#ce0000",
    marginTop: theme.spacing(6),
    position: "relative",
    // zIndex: 5,
  },
}));
