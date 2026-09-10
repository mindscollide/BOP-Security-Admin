import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import BOPlogo from "../../assets/images/BOPlogo.png";
import "./Redirected.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetPasswordEmailVerificationApi } from "../../store/actions/Auth_Actions";

const Redirected = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!location.search.includes("resetPass_action=")) {
      navigate("/");
      return;
    }

    const token = location.search.split("resetPass_action=")[1];
    const Data = { EncryptedString: token };

    // EmailTokenVerifyApi itself routes on the response message: a valid token goes
    // to /resetPassword, an expired/used one to /resetPasswordLinkExpired. Navigating
    // again here would replace whichever route it just picked, so only failures are
    // handled below.
    dispatch(resetPasswordEmailVerificationApi(navigate, Data));
  }, [location.search]);
  return (
    <section className={"wrapper_verifyEmail"}>
      <Row>
        <Col
          sm={12}
          md={12}
          lg={12}
          className='d-flex justify-content-center mt-5 '>
          <img
            src={BOPlogo}
            style={{ maxWidth: "100%" }}
            width='300'
            className='img-fluid'
            alt='BOP Logo'
          />
        </Col>
        <Col sm={12} md={12} lg={12}>
          <p className={"verifying"}>Verifying your link&hellip;</p>
        </Col>
      </Row>
    </section>
  );
};

export default Redirected;
