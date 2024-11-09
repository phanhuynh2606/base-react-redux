
const TableUser = (props) => {
  const { listUsers } = props;
  return (
    <>
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {listUsers &&
            listUsers.length > 0 ?
            listUsers.map((user, index) => {
              return (
                <tr key={`table-user-${index}`}>
                  <th scope="row">{index+1}</th>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button className="btn btn-secondary btn-sm">View</button>
                    <button className="btn btn-warning btn-sm mx-2">Update</button>
                    <button className="btn btn-danger btn-sm">Delete</button>
                  </td>
                </tr>
              );
            }) : (
              <tr>
                <td colSpan="4" className="text-center fs-4 fw-light">Not found data 😢</td>
              </tr>
            )}
        </tbody>
      </table>
    </>
  );
};
export default TableUser;
