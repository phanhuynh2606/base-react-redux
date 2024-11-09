import { toast } from "react-toastify";
import { deleteUser } from "../../../services/apiService";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";


const TableUserPaginate = (props) => {

  const {listUsers,pageCount,currentPage,setCurrentPage} = props;
  const handlePageClick = async (event) => {
    setCurrentPage(Number(event.selected)+1);
    await props.fetchListUsersWithPaginate(Number(event.selected)+1);
  };

  const handleDelete = async (user) => {
    Swal.fire({
      title: "Are you sure delete?",
      text: `You will detele user has email: ${user && user.email ?user.email:""}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteUser(user.id);
        if(res && res.EC === 0){
          toast.success(res.EM);
          setCurrentPage(1);
          await props.fetchListUsersWithPaginate(1);
        }else{
          toast.error(res.EM);
        }
      }
    });
  };
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
          {listUsers && listUsers.length > 0 ? (
            listUsers.map((user, index) => {
              return (
                <tr key={`table-user-${index}`}>
                  <th scope="row">{index + 1}</th>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => props.handleShowModalView(user)}
                    >
                      View
                    </button>
                    <button
                      className="btn btn-warning btn-sm mx-2"
                      onClick={() => props.handleShowModalUpdate(user)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(user)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="4" className="text-center fs-4 fw-light">
                Not found data 😢
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="user-pagination d-flex justify-content-center">
      <ReactPaginate
        nextLabel=" > "
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel=" < "
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
        forcePage={currentPage-1}
      /> 
      </div>
    </>
  );
};
export default TableUserPaginate;
