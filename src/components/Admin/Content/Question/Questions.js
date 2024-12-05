import { useEffect, useState } from "react";
import Select from "react-select";
import { v4 as uuidv4 } from "uuid";
import Viewer from "react-viewer";
import "./Questions.scss";
import { BsPatchPlus, BsPatchMinus } from "react-icons/bs";
import { AiFillPlusSquare, AiFillMinusCircle } from "react-icons/ai";
import { RiImageAddFill } from "react-icons/ri";
import _ from "lodash";
import { getAllQuizForAdmin, postCreateAnswerForQuestion, postCreateQuestionForQuiz } from "../../../../services/apiService";
import {toast} from 'react-toastify';
const Questions = (props) => {
  const initQuestion = [
    {
      id: uuidv4(),
      description: "",
      imageFile: "",
      imageName: "",
      isValidated: false,
      answers: [
        {
          id: uuidv4(),
          description: "",
          isCorrect: false,
          isValidated: false,
        },
      ],
    },
  ]
  const [questions, setQuestions] = useState(initQuestion);
  const [isPreviewImage, setIsPreviewImage] = useState(false);
  const [dataImages, setDataImages] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [listQuiz, setListQuiz] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState({});

  useEffect(() =>{
    getListQuiz()
  },[])
  const getListQuiz = async () => {
    const res = await getAllQuizForAdmin();
    if(res && res.EC === 0){
      let newQuiz = res.DT.map((quiz) =>{
        return {
          value: quiz.id,
          label: `${quiz.id} - ${quiz.name}`
        }
      })
      setListQuiz(newQuiz);
    }
  }

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
  const handleAddRemoveAnswer = (type, questionId, answerId) => {
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
  const handleOnChange = (type, id, value) => {
    let questionClone = _.cloneDeep(questions);
    if (type === "QUESTION") {
      let newQuestions = questionClone.map((q) => {
        if (q.id === id) {
          q.description = value;
        }
        return q;
      });
      setQuestions(newQuestions);
    }
  };
  const handleOnChangeFileQuestion = (id, e,index) => {
    let questionClone = _.cloneDeep(questions);
    let newQuestions = questionClone.map((q) => {
      if (q.id === id && e.target && e.target.files && e.target.files[0]) {
        q.imageFile = e.target.files[0];
        q.imageName = e.target.files[0].name;
        if(dataImages.length > 0 && dataImages[index]){
          dataImages[index] = { src: `${URL.createObjectURL(e.target.files[0])}`, alt: `${e.target.files[0].name}` };
        }else{
          setDataImages([...dataImages,{ src: `${URL.createObjectURL(e.target.files[0])}`, alt: `${e.target.files[0].name}` }]);
        }
      }
      return q;
    });
    setQuestions(newQuestions);
  };
  console.log(dataImages);
  const handleAnswerQuestion = (type, answerId, questionId, value) => {
    let questionClone = _.cloneDeep(questions);
    const questionSelected = questionClone.find(
      (question) => question.id === questionId
    );
    if (questionSelected) {
      questionSelected.answers = questionSelected.answers.map((answer) => {
        if (answer.id === answerId) {
          if (type === "CHECKBOX") {
            answer.isCorrect = value;
          }
          if (type === "INPUT") {
            answer.description = value;
          }
        }
        return answer;
      });
      setQuestions(questionClone);
    }
  };
  const handleSubmitQuestionsForQuiz = async () => {
    //submit questions
    // await Promise.all(questions.map( async (question) =>{
    //    const q = await postCreateQuestionForQuiz(+selectedQuiz.value,question.description,question.imageFile);
    //    //Submit answers
    //    await Promise.all(question.answers.map(async (answer) =>{
    //       await postCreateAnswerForQuestion(q.DT.id,answer.description,answer.isCorrect);
    //    }))
    // }))
    if(_.isEmpty(selectedQuiz)){
      toast.error("Please select a quiz to add questions");
      return;
    }
    //validate answers
    const updatedQuestions = _.cloneDeep(questions);
    for(let i = 0; i < updatedQuestions.length; i++){
      if(updatedQuestions[i].description.trim() === ""){
        updatedQuestions[i].isValidated = true;
        setQuestions(updatedQuestions);
        toast.error(`Question ${i+1} is empty`);
        return;
      }else{
        updatedQuestions[i].isValidated = false;
        setQuestions(updatedQuestions);
      }
      let countCorrect = 0;
      for(let j = 0; j < updatedQuestions[i].answers.length; j++){
        if(updatedQuestions[i].answers[j].description.trim() === ""){
          updatedQuestions[i].answers[j].isValidated = true;
          setQuestions(updatedQuestions);
          toast.error(`Answer ${j+1} of question ${i+1} is empty`);
          return;
        }else{
          updatedQuestions[i].answers[j].isValidated = false;
          setQuestions(updatedQuestions);
          if(updatedQuestions[i].answers[j].isCorrect){
            countCorrect++;
          }
        }
      }
      if(countCorrect === 0){
        toast.error(`Question ${i+1} has no correct answer`);
        return;
      }
    }
    let successCount = 0;
    let failCount = 0;
    let count = questions.reduce((acc,question) => acc + question.answers.length,0);
    console.log(count);
    for(const question of questions){
      try {
        const q = await postCreateQuestionForQuiz(+selectedQuiz.value,question.description,question.imageFile);
        console.log(q);
        if(q.EC !== 0){
          toast.error("Create question failed");
          throw new Error("Create question failed");
        }
      for(const answer of question.answers){
        try {
          const response = await postCreateAnswerForQuestion(q.DT.id,answer.description,answer.isCorrect);
          if(!response){
            throw new Error("Create answer failed");
          }
          successCount++;
        } catch (error) {
          failCount++;
        }
      }
      } catch (error) {
        failCount++;
      }
      
    }
    if(successCount === count){
      toast.success(`Create ${questions.length} question successfully`);
      setQuestions(initQuestion);
    }else{
      toast.error(`Create questions failed: ${failCount} questions failed`);
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
              options={listQuiz}
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
                        className={`form-control ${question.isValidated ? "is-invalid" : ""}`}
                        placeholder="Description"
                        
                        onChange={(e) =>
                          handleOnChange(
                            "QUESTION",
                            question.id,
                            e.target.value
                          )
                        }
                        value={question.description}
                      />
                      <label>Question {index + 1} description</label>
                    </div>
                    <div className="group-uploaded">
                      <label
                        className="label-upload"
                        htmlFor={`uploadFileQuestion-${question.id}`}
                      >
                        <RiImageAddFill />
                      </label>
                      <input
                        type="file"
                        hidden
                        id={`uploadFileQuestion-${question.id}`}
                        onChange={(e) =>
                          handleOnChangeFileQuestion(question.id, e,index)
                        }
                      />
                      {question.imageName ? (
                        <span className="previewImage" onClick={() =>{
                          setIsPreviewImage(true);
                          setActiveIndex(index);
                        }}>{question.imageName}</span>
                      ) : (
                        <span>0 file is uploaded</span>
                      )}
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
                              checked={answer.isCorrect}
                              onChange={(e) =>
                                handleAnswerQuestion(
                                  "CHECKBOX",
                                  answer.id,
                                  question.id,
                                  e.target.checked
                                )
                              }
                            />
                            <div className="form-floating answer-name">
                              <input
                                value={answer.description}
                                type="text"
                                className={`form-control ${answer.isValidated ? "is-invalid" : ""}`}
                                placeholder="Answer"
                                onChange={(e) =>
                                  handleAnswerQuestion(
                                    "INPUT",
                                    answer.id,
                                    question.id,
                                    e.target.value
                                  )
                                }
                              />
                              <label>Answer {index + 1}</label>
                            </div>
                          </div>
                          <div className="btn-group">
                            <span>
                              <AiFillPlusSquare
                                className="icon-add"
                                onClick={() =>
                                  handleAddRemoveAnswer("ADD", question.id, "")
                                }
                              />
                            </span>
                            {question.answers.length > 1 && (
                              <span>
                                <AiFillMinusCircle
                                  className="icon-remove"
                                  onClick={() =>
                                    handleAddRemoveAnswer(
                                      "REMOVE",
                                      question.id,
                                      answer.id
                                    )
                                  }
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
          {questions && questions.length > 0 && (
            <div>
              <button
                className="btn btn-warning"
                onClick={() => handleSubmitQuestionsForQuiz()}
              >
                Save Questions
              </button>
            </div>
          )}
          {isPreviewImage && (
                    <Viewer
                    visible={isPreviewImage}
                    onClose={() => {setIsPreviewImage(false);}}
                    images={[...dataImages]}
                    zIndex={9999}
                    activeIndex={activeIndex}
                    className="viewer-image"
                  />
                  )}
        </div>
      </div>
    </>
  );
};
export default Questions;
