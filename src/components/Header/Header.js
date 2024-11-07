import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../../../src/logo.svg";
import { CiSettings } from "react-icons/ci";
import { NavLink } from "react-router-dom";

const Header = () => {
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
          <NavDropdown title={
            <span>
            <CiSettings className="me-2" />
            Setting
          </span>
          } id="basic-nav-dropdown">
              <NavDropdown.Item >Log in</NavDropdown.Item>
              <NavDropdown.Item >Log out</NavDropdown.Item>
              <NavDropdown.Item >Profile</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
