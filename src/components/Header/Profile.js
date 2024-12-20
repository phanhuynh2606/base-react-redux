import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useTranslation } from "react-i18next";
import MainInfor from "./Profile/MainInfor"
import ChangePassword from "./Profile/ChangePassword"
import HistoryExam from "./Profile/HistoryExam"
import "./Profile/Profile.scss";
import { useState } from "react";
const Profile = (props) => {
  const { show, setShow } = props;
  const { t } = useTranslation();
  const handleClose = () => setShow(false);
  const [activeTab, setActiveTab] = useState("1"); // Theo dõi tab đang hoạt động

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static" 
              size={activeTab === "3" ? "xl" : "lg"}
      >
        <Modal.Header closeButton>
          <Modal.Title>{t("profile.header")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs
            defaultActiveKey="1"
            id="uncontrolled-tab-example"
            className="mb-3"
            onSelect={(k) => setActiveTab(k)}
          >
            <Tab eventKey="1" title={t("profile.text1")}>
              <MainInfor/>
            </Tab>
            <Tab eventKey="2" title={t("profile.text2")}>
              <ChangePassword/>
            </Tab>
            <Tab eventKey="3" title={t("profile.text3")}>
              <HistoryExam/>
            </Tab>
          </Tabs>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Profile;
