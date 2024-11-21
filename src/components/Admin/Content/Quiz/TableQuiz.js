import { useEffect, useState } from "react";
import { getAllQuizForAdmin } from "../../../../services/apiService";

const TableQuiz = (props) => {
  const [listQuiz, setListQuiz] = useState([]);

  useEffect(() =>{
    getListQuiz()
  },[])
  const getListQuiz = async () => {
    const res = await getAllQuizForAdmin();
    if(res && res.EC === 0){
      setListQuiz(res.DT);
      console.log(console.log(res));
    }
  }
  return (
    <>
    <div className="title-table hr-lines">List Quizzes</div>
      <table className="table table-hover table-bordered" >
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
          {listQuiz && listQuiz.length > 0 &&
            listQuiz.map((item, index) => (
              <tr key={`table-quuiz-${index}`}>
                <th scope="row">{item.id}</th>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.difficulty}</td>
                <td>
                  <button className="btn btn-warning me-2 btn-sm">Edit</button>
                  <button className="btn btn-danger btn-sm">Delete</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </>
  );
};

export default TableQuiz;
