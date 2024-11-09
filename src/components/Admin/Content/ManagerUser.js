import ModalCreateUser from "./ModalCreateUser";
import "./ManageUser.scss";
import { FaPlusCircle } from "react-icons/fa";
import { useState,useEffect } from "react";
import TableUser from "./TableUser";
import { getAllUsers } from "../../../services/apiService";

const ManagerUser = (props) => {
  const [show, setShow] = useState(false);
  const [listUsers, setListUsers] = useState([]);

  const fetchListUsers = async () => {
    let res = await getAllUsers();
    if (res && res.EC === 0) {
      setListUsers(res.DT);
    }
  };
  useEffect(() => {
    fetchListUsers();
  }, []);

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
          <TableUser listUsers={listUsers}/>
        </div>
        <ModalCreateUser show={show} setShow={setShow} fetchListUsers={fetchListUsers}/>
      </div>
    </div>
  );
};
export default ManagerUser;
