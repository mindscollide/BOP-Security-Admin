import React from "react";
import styles from "./upload.module.css";
// import Button from "react-bootstrap/Button";
import { Box } from "@material-ui/core";
// import { Button } from "../../../components/elements";
import AttachmentIcon from "../../../assets/images/Attachment_Icon.svg";
import { Button } from "react-bootstrap";
const CustomUpload = ({
  change,
  onClick,
  className,
  disable,
  attachmentIconClass,
}) => {
  return (
    <Box display="flex">
      {/* <Input value={file} disabled={file ? false : true} /> */}
      <input
        className={styles.uploadText}
        id="contained-button-file"
        type="file"
        onChange={change}
        disable={disable}
        onClick={onClick}
        size={1000}
        accept=".doc, .docx, .xls, .xlsx,.pdf,.png,.txt,.jpg, .jpeg,.gif"
        // inputProps={{ acceptOnly: '.doc, .docx, .xls, .xlsx,.pdf,.png' }}
        // restrictions={{
        //   allowedExtensions: [".doc", ".docx", ".xls", ".xlsx", ".pdf", ".png"],
        // }}

        maxfilesize={10000000}
        disabled={disable}
      />
      <label htmlFor="contained-button-file">
        <span className={styles["ButtonForUpload"]}>Upload your Contacts</span>
      </label>
      {/* <label htmlFor="contained-button-file">
        <img className="cursor-pointer" src={AttachmentIcon}></img>
      </label> */}
    </Box>
  );
};

export default CustomUpload;
