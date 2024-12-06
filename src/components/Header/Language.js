import vn from "../../../src/assets/vietnam.png";
import en from "../../../src/assets/unite_states.png";
import NavDropdown from "react-bootstrap/NavDropdown";
const Language = () => {
  return (
    <>
      <NavDropdown
        title={<img src={vn} alt="en" width="20" height="20" />}
        id="basic-nav-dropdown2"
        className="languages">
        <NavDropdown.Item>
          <img src={en} alt="vn" width="20" height="20" />
          <span className="ms-2">English</span>
        </NavDropdown.Item>
        <NavDropdown.Item className="d-flex">
          <img src={vn} alt="vn" width="20" height="20" />
          <span className="ms-2">Việt Nam</span>
        </NavDropdown.Item>
      </NavDropdown>
    </>
  );
};
export default Language;
