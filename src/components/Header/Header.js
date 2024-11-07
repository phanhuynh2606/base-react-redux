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
          <Navbar.Brand href="#home" className="d-flex align-items-center">
            <img
              alt=""
              src={logo}
              width="40"
              height="40"
              className="d-inline-block align-top"
            />{" "}
            Quizlet{" "}
          </Navbar.Brand>
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
              <NavDropdown.Item href="#action/3.1">Log in</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.1">Log out</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
