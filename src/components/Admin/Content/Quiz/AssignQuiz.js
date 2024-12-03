import { useEffect, useState } from "react";
import Select from "react-select";
import { getAllQuizForAdmin, getAllUsers } from "../../../../services/apiService";

const AssignQuiz = (props) => {
  const [listQuiz, setListQuiz] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState({});
  const [listUser, setListUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});

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
  return (
    <div className="assign-quiz-container row">
      <div className="col-6 form-group">
            <label className="mb-2">Select Quiz</label>
            <Select
              value={selectedQuiz}
              onChange={setSelectedQuiz}
              options={listQuiz}
              SSS
            />
          </div>
      <div className="col-6 form-group">
            <label className="mb-2">Select User</label>
            <Select
              value={setListUser}
              onChange={setSelectedQuiz}
              options={listUser}
              SSS
            />
          </div>
    </div>
  );
};
export default AssignQuiz;
