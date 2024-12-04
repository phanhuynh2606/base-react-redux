import { useEffect, useState } from "react";
import Select from "react-select";
import {
  getAllQuizForAdmin,
  getAllUsers,
  postAssignQuiz,
} from "../../../../services/apiService";
import { toast } from "react-toastify";
import { set } from "nprogress";

const AssignQuiz = (props) => {
  const [listQuiz, setListQuiz] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState({});
  const [listUser, setListUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState();

  useEffect(() => {
    getListQuiz();
    fetchListUser();
  }, []);
  const getListQuiz = async () => {
    const res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      let newQuiz = res.DT.map((quiz) => {
        return {
          value: quiz.id,
          label: `${quiz.id} - ${quiz.name}`,
        };
      });
      setListQuiz(newQuiz);
    }
  };
  const fetchListUser = async () => {
    const res = await getAllUsers();
    if (res && res.EC === 0) {
      let users = res.DT.map((user) => {
        return {
          value: user.id,
          label: `${user.id} - ${user.username}`,
        };
      });
      setListUser(users);
    }
  };
  const handleAssign = async () => {
    let countSuccess = 0;
    for(const user of selectedUser){
      let res = await postAssignQuiz(selectedQuiz.value, user.value);
      if (res && res.EC === 0) {
        countSuccess++;
      }else{
        toast.error(`${res.EM}: ${user.label}`);
      }
    }
    if(countSuccess === selectedUser.length){
      toast.success("Assign quiz success!");
    }
  }
  return (
    <div className="assign-quiz-container row">
      <div className="col-6 form-group">
        <label className="mb-2">Select Quiz</label>
        <Select
          value={selectedQuiz}
          onChange={setSelectedQuiz}
          options={listQuiz}
        />
      </div>
      <div className="col-6 form-group">
        <label className="mb-2">Select User</label>
        <Select
          searchable={true}
          closeMenuOnSelect={false}
          value={selectedUser}
          onChange={setSelectedUser}
          options={listUser}
          isMulti={true}
        />
      </div>
      <div className="col-12 mt-3">
        <button className="btn btn-warning" onClick={(e) => handleAssign()}>Assign</button>
      </div>
    </div>
  );
};
export default AssignQuiz;
