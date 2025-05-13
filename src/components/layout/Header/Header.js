import { useState } from "react";
import { Container, Nav, Dropdown } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import BOPLogo from "../../../assets/images/BOPLogo-white.png";
import SettingModal from "../../../container/Pages/Modals/Setting-Modal/SettingModal";
import "./Header.css";
import { LogOutAPI, signOut } from "../../../store/actions/Auth_Actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [SettingModalState, setSettingModalState] = useState(false);

  const onClickSetting = () => {
    setSettingModalState(true);
  };

  const handleLogout = () => {
    dispatch(LogOutAPI(navigate));
  };
  return (
    <>
      <Container fluid className="container-header-2">
        <Navbar>
          <Container fluid>
            <Navbar.Brand>
              <img src={BOPLogo} width={200} alt="" />
            </Navbar.Brand>
            <Dropdown>
              <Dropdown.Toggle className="dropdown-toggle-header2">
                <p className="user-name-header2">
                  {localStorage.getItem("userName")}
                </p>
                <i className="icon-arrow-down"></i>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown_menu-Header2">
                <Dropdown.Item onClick={onClickSetting}>
                  <Nav.Link>
                    <i className="icon-settings me-1"></i>
                    <label className="dropdown-select-labels">Setting</label>
                  </Nav.Link>
                </Dropdown.Item>

                <Dropdown.Item onClick={handleLogout}>
                  <i className="icon-logout me-1"></i>
                  <label className="dropdown-select-labels">Logout</label>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Container>
        </Navbar>
        {SettingModalState ? (
          <SettingModal
            SettingModalState={SettingModalState}
            setSettingModalState={setSettingModalState}
          />
        ) : null}
      </Container>
    </>
  );
};

export default Header;
