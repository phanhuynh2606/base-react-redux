import { useState } from "react";
import Select from "react-select";
import "./Questions.scss";
import { BsPatchPlus, BsPatchMinus } from "react-icons/bs";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
const Questions = (props) => {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  const [selectedQuiz, setSelectedQuiz] = useState({});
  return (
    <>
      <div className="question-container">
        <div className="title">Manage Questions</div>
        <div className="add-new-question">
          <div className="col-6 form-group">
            <label>Quiz</label>
            <Select
              value={selectedQuiz}
              onChange={setSelectedQuiz}
              options={options}
              SSS
            />
          </div>
          <div className="mt-3">Add questions: </div>
          <div>
            <div className="question-content">
              <div class="form-floating description">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Description"
                />
                <label>Description</label>
              </div>
              <div className="group-uploaded">
                <label className="label-upload">Upload Image</label>
                <input type="file" hidden />
                <span>0 file is uploaded</span>
              </div>
              <div className="btn-add">
                <span>
                  <BsPatchPlus className="icon-add" />
                </span>
                <span>
                  <BsPatchMinus className="icon-remove" />
                </span>
              </div>
            </div>
            <div className="answers-content flex-row">
              <div className="col-6 input-answer">
                <input className="form-check-input isCorrect" type="checkbox" />
                <div class="form-floating answer-name">
                  <input
                    type="text"
                    className="form-control "
                    placeholder="Answer"
                  />
                  <label>Answer 1</label>
                </div>
              </div>
              <div className="btn-group">
                <span>
                  <FiPlusCircle className="icon-add" />
                </span>
                <span>
                  <FiMinusCircle className="icon-remove" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Questions;
