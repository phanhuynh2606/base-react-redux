import ModalCreateUser from "./ModalCreateUser";
import "./ManageUser.scss";
import 'sweetalert2/src/sweetalert2.scss'
import { FaPlusCircle } from "react-icons/fa";
import { useState,useEffect } from "react";
import { getAllUsers, getUsersWithPaginate } from "../../../services/apiService";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalViewUser from "./ModalViewUser";
import TableUserPaginate from "./TableUserPaginate";

const ManagerUser = (props) => {
  const LIMIT_USER = 4;
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

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
  const fetchListUsersWithPaginate = async (page) => {
    let res = await getUsersWithPaginate(page, LIMIT_USER);
    if (res && res.EC === 0) {
      setPageCount(res.DT.totalPages);
      setListUsers(res.DT.users);
    }
  };
  useEffect(() => {
    fetchListUsersWithPaginate(1);
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
          <TableUserPaginate listUsers={listUsers}
           handleShowModalUpdate={handleShowModalUpdate} 
           handleShowModalView={handleShowModalView}
           fetchListUsersWithPaginate={fetchListUsersWithPaginate}
           pageCount={pageCount}
           currentPage={currentPage}
           setCurrentPage={setCurrentPage}
           />
        </div>
        <ModalCreateUser 
          show={showModalCreate} 
          setShow={setshowModalCreate} 
          fetchListUsers={fetchListUsers}
          fetchListUsersWithPaginate={fetchListUsersWithPaginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          />
        <ModalUpdateUser 
          show={showModalUpdate} 
          setShow={setshowModalUpdate} userUpdate={dataUpdate} 
          fetchListUsers={fetchListUsers} 
          fetchListUsersWithPaginate={fetchListUsersWithPaginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          />
        <ModalViewUser show={showModalView} setShow={setshowModalView} userView={dataUpdate}/>
      </div>
    </div>
  );
};
export default ManagerUser;
