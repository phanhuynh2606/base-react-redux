import { useState } from "react";
import Select from "react-select";
import { v4 as uuidv4 } from "uuid";
import "./Questions.scss";
import { BsPatchPlus, BsPatchMinus } from "react-icons/bs";
import { AiFillPlusSquare, AiFillMinusCircle } from "react-icons/ai";
import { RiImageAddFill } from "react-icons/ri";
import _ from "lodash";
const Questions = (props) => {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  const [selectedQuiz, setSelectedQuiz] = useState({});
  const [questions, setQuestions] = useState([
    {
      id: uuidv4(),
      description: "",
      imageFile: "",
      imageName: "",
      answers: [
        {
          id: uuidv4(),
          description: "",
          isCorrect: false,
        },
      ],
    },
  ]);

  const handleAddRemoveQuestion = (type, id) => {
    if (type === "ADD") {
      setQuestions([
        ...questions,
        {
          id: uuidv4(),
          description: "",
          imageFile: "",
          imageName: "",
          answers: [
            {
              id: uuidv4(),
              description: "",
              isCorrect: false,
            },
          ],
        },
      ]);
    }
    if (type === "REMOVE") {
      let questionClone = _.cloneDeep(questions);
      const newQuestions = questionClone.filter(
        (question) => question.id !== id
      );
      setQuestions(newQuestions);
    }
  };
  const handleAddRemoveAnswer = (type,questionId,answerId) => {
    let questionClone = _.cloneDeep(questions);
    if (type === "ADD") {
      const newQuestions = questionClone.map((question) => {
        if (question.id === questionId) {
          question.answers.push({
            id: uuidv4(),
            description: "",
            isCorrect: false,
          });
        }
        return question;
      });
      setQuestions(newQuestions);
    }
    if (type === "REMOVE") {
      const newQuestions = questionClone.map((question) => {
        if (question.id === questionId) {
          question.answers = question.answers.filter(
            (answer) => answer.id !== answerId
          );
        }
        return question;
      });
      setQuestions(newQuestions);
    }
  };
  return (
    <>
      <div className="question-container">
        <div className="title">Manage Questions</div>
        <div className="add-new-question">
          <div className="col-6 form-group">
            <label className="mb-2">Select Quiz</label>
            <Select
              value={selectedQuiz}
              onChange={setSelectedQuiz}
              options={options}
              SSS
            />
          </div>
          <div className="mt-3 mb-2 fs-5 fw-normal">Add questions: </div>
          {questions &&
            questions.length > 0 &&
            questions.map((question, index) => {
              return (
                <div className="q-main mb-4" key={question.id}>
                  <div className="question-content">
                    <div className="form-floating description">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Description"
                        value={question.description}
                      />
                      <label>Question {index + 1} description</label>
                    </div>
                    <div className="group-uploaded">
                      <label className="label-upload">
                        <RiImageAddFill />
                      </label>
                      <input type="file" hidden />
                      <span>0 file is uploaded</span>
                    </div>
                    <div className="btn-add">
                      <span>
                        <BsPatchPlus
                          className="icon-add"
                          onClick={() => handleAddRemoveQuestion("ADD", "")}
                        />
                      </span>
                      {questions.length > 1 && (
                        <span>
                          <BsPatchMinus
                            className="icon-remove"
                            onClick={() =>
                              handleAddRemoveQuestion("REMOVE", question.id)
                            }
                          />
                        </span>
                      )}
                    </div>
                  </div>
                  {question.answers &&
                    question.answers.length > 0 &&
                    question.answers.map((answer, index) => {
                      return (
                        <div
                          key={answer.id}
                          className="answers-content flex-row"
                        >
                          <div className="col-6 input-answer">
                            <input
                              className="form-check-input isCorrect"
                              type="checkbox"
                            />
                            <div className="form-floating answer-name">
                              <input
                                value={answer.description}
                                type="text"
                                className="form-control "
                                placeholder="Answer"
                              />
                              <label>Answer {index + 1}</label>
                            </div>
                          </div>
                          <div className="btn-group">
                            <span>
                              <AiFillPlusSquare
                                className="icon-add"
                                onClick={() => handleAddRemoveAnswer("ADD",question.id,'')}
                              />
                            </span>
                            {question.answers.length > 1 && (
                              <span>
                                <AiFillMinusCircle
                                  className="icon-remove"
                                  onClick={() =>handleAddRemoveAnswer("REMOVE",question.id, answer.id)}
                                />
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};
export default Questions;
