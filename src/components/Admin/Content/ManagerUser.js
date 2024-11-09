import ModalCreateUser from "./ModalCreateUser";
import "./ManageUser.scss";
import 'sweetalert2/src/sweetalert2.scss'
import { FaPlusCircle } from "react-icons/fa";
import { useState,useEffect } from "react";
import TableUser from "./TableUser";
import { getAllUsers } from "../../../services/apiService";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalViewUser from "./ModalViewUser";

const ManagerUser = (props) => {
  const [showModalCreate, setshowModalCreate] = useState(false);
  const [showModalUpdate, setshowModalUpdate] = useState(false);
  const [showModalView, setshowModalView] = useState(false);
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
  const handleShowModalView = (user) => {
    setshowModalView(true);
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
          <TableUser listUsers={listUsers}
           handleShowModalUpdate={handleShowModalUpdate} 
           handleShowModalView={handleShowModalView}
           fetchListUsers={fetchListUsers}
           />
        </div>
        <ModalCreateUser show={showModalCreate} setShow={setshowModalCreate} fetchListUsers={fetchListUsers}/>
        <ModalUpdateUser show={showModalUpdate} setShow={setshowModalUpdate} userUpdate={dataUpdate} fetchListUsers={fetchListUsers} />
        <ModalViewUser show={showModalView} setShow={setshowModalView} userView={dataUpdate}/>
      </div>
    </div>
  );
};
export default ManagerUser;
