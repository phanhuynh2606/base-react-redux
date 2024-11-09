import ModalCreateUser from "./ModalCreateUser";
import "./ManageUser.scss";
import { FaPlusCircle } from "react-icons/fa";
import { useState,useEffect } from "react";
import TableUser from "./TableUser";
import { getAllUsers } from "../../../services/apiService";
import ModalUpdateUser from "./ModalUpdateUser";

const ManagerUser = (props) => {
  const [showModalCreate, setshowModalCreate] = useState(false);
  const [showModalUpdate, setshowModalUpdate] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});
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

  const handleShowModalUpdate = (user) => {
    setshowModalUpdate(true);
    setDataUpdate(user);
  };

  return (
    <div className="manage-user-container">
      <div className="title">
        Quản lý Users
      </div>
      <div className="users-content">
        <div className="btn-add-new mb-2">
          <button onClick={() => setshowModalCreate(true)}> <FaPlusCircle/> Add New User</button>
        </div>
        <div className="table-users-container">
          <TableUser listUsers={listUsers} handleShowModalUpdate={handleShowModalUpdate}/>
        </div>
        <ModalCreateUser show={showModalCreate} setShow={setshowModalCreate} fetchListUsers={fetchListUsers}/>
        <ModalUpdateUser show={showModalUpdate} setShow={setshowModalUpdate} userUpdate={dataUpdate} fetchListUsers={fetchListUsers} />
      </div>
    </div>
  );
};
export default ManagerUser;
