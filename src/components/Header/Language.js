import vn from "../../../src/assets/vietnam.png";
import en from "../../../src/assets/unite_states.png";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useTranslation } from "react-i18next";
const Language = () => {
  const { t,i18n } = useTranslation();
  const handleChangeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  return (
    <>
      <NavDropdown
        title={i18n.language === "en" ? <img src={en} alt="en" width="20" height="20" /> : <img src={vn} alt="en" width="20" height="20" />}
        id="basic-nav-dropdown2"
        className="languages">
        <NavDropdown.Item>
          <img src={en} alt="vn" width="20" height="20" />
          <span className="ms-2" onClick={() => handleChangeLanguage('en')}>English</span>
        </NavDropdown.Item>
        <NavDropdown.Item className="d-flex">
          <img src={vn} alt="vn" width="20" height="20" />
          <span className="ms-2" onClick={() => handleChangeLanguage('vi')}>Việt Nam</span>
        </NavDropdown.Item>
      </NavDropdown>
    </>
  );
};
export default Language;
