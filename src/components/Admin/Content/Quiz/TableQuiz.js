import Swal from "sweetalert2";
import { deleteQuizByAdmin } from "../../../../services/apiService";
import { toast } from "react-toastify";
import ModalQuizUpdate from "./ModalQuizUpdate";
import { useState } from "react";

const TableQuiz = (props) => {
  const { listQuiz,setListQuiz,getListQuiz } = props;
  const [quizUpdate, setQuizUpdate] = useState({});
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const handleUpdateQuiz = (quiz) => {
    setQuizUpdate(quiz);
    setShowModalUpdate(true);
  };
  const handleDeleteQuiz = (id) => {
    Swal.fire({
      title: `Are you sure delete quiz id : ${id}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // call API delete
        const res = await deleteQuizByAdmin(id);
        if (res && res.EC === 0) {
          toast.success(res.EM);
          setListQuiz(listQuiz.filter((item) => item.id !== id));
        }else{
          toast.error(res.EM);
        }
      }
    });
  };
  return (
    <>
      <div className="title-table hr-lines">List Quizzes</div>
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Type</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {listQuiz &&
            listQuiz.length > 0 &&
            listQuiz.map((item, index) => (
              <tr key={`table-quuiz-${index}`}>
                <th scope="row">{item.id}</th>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.difficulty}</td>
                <td>
                  <button className="btn btn-warning me-2 btn-sm"
                    onClick={() =>handleUpdateQuiz(item)}
                  >Edit</button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteQuiz(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <ModalQuizUpdate show={showModalUpdate} 
      setShow={setShowModalUpdate} 
      quizUpdate={quizUpdate}
      setQuizUpdate={setQuizUpdate}
      getListQuiz={getListQuiz}
      />
    </>
  );
};

export default TableQuiz;
