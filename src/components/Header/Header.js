import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../../../src/logo.svg";
import { NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  }
  const handleRegister = () => {
    navigate("/signup");
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
          <NavLink to="/" className="navbar-brand d-flex align-items-center">
            <img alt="Logo" src={logo} width="60" height="60"
              className="d-inline-block align-top" />{" "}  Quizlet{" "}
          </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to='/' className="nav-link">Home</NavLink>
            <NavLink to='/users' className="nav-link">Users</NavLink>
            <NavLink to='/admin' className="nav-link">Admin</NavLink>
          </Nav>
          <Nav>
              <button className="btn-login" onClick={() => handleLogin()}> Log in</button>
              <button className="btn-signup" onClick={() => handleRegister()}> Sign up</button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
