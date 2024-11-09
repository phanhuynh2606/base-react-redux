import ModalCreateUser from "./ModalCreateUser";
import "./ManageUser.scss";
import { FaPlusCircle } from "react-icons/fa";
import { useState } from "react";
import TableUser from "./TableUser";
const ManagerUser = (props) => {
  const [show, setShow] = useState(false);
  
  return (
    <div className="manage-user-container">
      <div className="title">
        Quản lý Users
      </div>
      <div className="users-content">
        <div className="btn-add-new mb-2">
          <button onClick={() => setShow(true)}> <FaPlusCircle/> Add New User</button>
        </div>
        <div className="table-users-container">
          <TableUser/>
        </div>
        <ModalCreateUser show={show} setShow={setShow}/>
      </div>
    </div>
  );
};
export default ManagerUser;
