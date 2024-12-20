import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../../../src/logo.svg";

import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../services/apiService";
import { toast } from "react-toastify";
import { doLogout } from "../../redux/action/userAction";
import Language from "./Language";
import { useTranslation } from "react-i18next";
import Profile from "./Profile";
import { useState } from "react";

const Header = () => {
  const account = useSelector((state) => state.user.account);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const [showModalProfile, setShowModalProfile] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {t} = useTranslation();

  const handleShow = () => setShowModalProfile(true);

  const handleLogin = () => {
    navigate("/login");
  };
  const handleRegister = () => {
    navigate("/signup");
  };
  const handleLogout = async () => {
    const res = await logout(account.email, account.refresh_token);
    if (res && res.EC === 0) {
      dispatch(doLogout());
      toast.success(res.EM);
      navigate("/login");
    } else {
      toast.error(res.EM);
    }
  };
  return (
    <>
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <NavLink to="/" className="navbar-brand d-flex align-items-center">
          <img
            alt="Logo"
            src={logo}
            width="50"
            height="50"
            className="brand-icon d-inline-block align-top"
          />{" "}
          Quizlet{" "}
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/" className="nav-link">
              {t("header.home")}
            </NavLink>
            <NavLink to="/users" className="nav-link">
            {t("header.u")}
            </NavLink>
            <NavLink to="/admin" className="nav-link">
            {t("header.a")}
            </NavLink>
          </Nav>
          <Nav>
            {isAuthenticated === false ? (
              <>
                <button className="btn-login" onClick={() => handleLogin()}>
                {t("header.login")}
                </button>
                <button
                  className="btn-signup me-3"
                  onClick={() => handleRegister()}
                >
                  {t("header.signup")}
                </button>
              </>
            ) : (
              <>
                <NavDropdown
                  title={t("header.s")}
                  id="basic-nav-dropdown"
                  className="me-3"
                >
                  <NavDropdown.Item onClick={() => handleShow()}>{t("header.p")}</NavDropdown.Item>
                  <NavDropdown.Item onClick={() => handleLogout()}>
                  {t("header.l")}
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
          <Language/>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Profile show={showModalProfile}
             setShow={setShowModalProfile}
    />
    </>
  );
};

export default Header;
