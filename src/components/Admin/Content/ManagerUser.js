

import ModalCreateUser from './ModalCreateUser';

const ManagerUser = (props) => {
    return (
        <div className="manage-user-container">
            <div className="title">
                <h1>Quản lý Users</h1>
            </div>
            <div className="users-content">
                <div >
                  <button>Add New User</button>
                </div>
                <div>
                  table users
                  <ModalCreateUser />
                </div>
            </div>
        </div>
    )
}
export default ManagerUser;