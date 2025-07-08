import React, { Fragment, useEffect, useState } from "react";
import BOPLOGO from "../../../assets/images/logo-hd.png";
import { Col } from "react-bootstrap";
import styles from "./Loader.module.css";
import { all } from "axios";
import { useSelector } from "react-redux";
import "./Loader.css";

const Loader = () => {
  const [isLoader, setIsLoading] = useState(false);

  const allStates = useSelector((state) => state);
  console.log("All States: ", allStates);
  const DownloadReportReducer = useSelector(
    (state) => state.DownloadReportReducer.Loading
  );
  const auth = useSelector((state) => state.auth.Loading);
  const downloadReducer = useSelector((state) => state.downloadReducer.Loading);
  const securityReducer = useSelector((state) => state.securityReducer.Loading);
  const settingsReducer = useSelector((state) => state.settingsReducer.Loading);

  const isLoading = [
    DownloadReportReducer,
    auth,
    downloadReducer,
    securityReducer,
    settingsReducer,
  ].some((loading) => loading);

  useEffect(() => {
    let timeout;

    if (isLoading) {
      setIsLoading(true); // Show loader
    } else {
      // Hide loader after a short delay when loading completes
      timeout = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }

    return () => clearTimeout(timeout);
  }, [isLoading]);
  return (
    // <Fragment>
    //   <Col sm={12} md={12} lg={12} className={styles["overlay"]}>
    //     <Col sm={12} md={12} lg={12} className={styles["overlay-content"]}>
    //       <img src={BOPLOGO} width={200} alt="" />
    //       <span className={styles["loader-line"]}></span>
    //     </Col>
    //   </Col>
    // </Fragment>

    isLoader && (
      <div className="body-loader overflow-hidden">
        <div className="body-loader-inner">
          <div className="logo-loader-wrapper">
            <img
              className="img-fluid"
              src={BOPLOGO}
              alt="Section-Loader"
              width={200}
            />
            <div className="loader-line-highlight" />
          </div>
        </div>
      </div>
    )
  );
};

export default Loader;
