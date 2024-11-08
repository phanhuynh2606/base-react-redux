import ModalCreateUser from "./ModalCreateUser";
import "./ManageUser.scss";
import { FaPlusCircle } from "react-icons/fa";
import { useState } from "react";
const ManagerUser = (props) => {
  const [show, setShow] = useState(false);
  
  return (
    <div className="manage-user-container">
      <div className="title">
        Quản lý Users
      </div>
      <div className="users-content">
        <div className="btn-add-new">
          <button onClick={() => setShow(true)}> <FaPlusCircle/> Add New User</button>
        </div>
        <div className="table-users-container">table users</div>
        <ModalCreateUser show={show} setShow={setShow}/>
      </div>
    </div>
  );
};
export default ManagerUser;
