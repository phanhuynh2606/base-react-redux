import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getDataQuiz, postSubmitQuiz } from "../../services/apiService";
import _ from "lodash";
import "./DetailQuiz.scss";
import Question from "./Question";
import { toast } from "react-toastify";
import ModalResult from "./ModalResult";
const DetailQuiz = (props) => {
  const params = useParams();
  const quizId = params.id;
  const location = useLocation();

  const [dataQuiz, setDataQuiz] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isShowResult, setIsShowResult] = useState(false);
  const [dataModalResult, setDataModalResult] = useState({});
  useEffect(() => {
    fetchQuestion();
  }, [quizId]);

  const fetchQuestion = async () => {
    const res = await getDataQuiz(quizId);
    if (res && res.EC === 0) {
      let raw = res.DT;
      let data = _.chain(raw)
        // Group the elements of Array based on `color` property
        .groupBy("id")
        // `key` is group's name (color), `value` is the array of objects
        .map((value, key) => {
          let answers = [];
          let questionDescription,
            image = null;
          value.forEach((item, index) => {
            if (index === 0) {
              questionDescription = item.description;
              image = item.image;
            }
            item.answers.isSelected = false;
            answers.push(item.answers);
          });
          return { questionId: key, answers, questionDescription, image };
        })
        .value();
      setDataQuiz(data);
    }
  };
  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };
  const handleNext = () => {
    if (currentQuestion < dataQuiz.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleCheckBox = (answerId, questionId) => {
    let dataQuizClone = _.cloneDeep(dataQuiz);
    let question = dataQuizClone.find((item) => +item.questionId === +questionId);
    if(question && question.answers){
      let answer = question.answers.find((item) => +item.id === +answerId);
      if(answer){
        answer.isSelected = !answer.isSelected;
      }
    }
    setDataQuiz(dataQuizClone);

  }
  const handleFinishQuiz = async () => {
    let payload = {};
    if(dataQuiz && dataQuiz.length > 0){
      payload = {
        quizId: +quizId,
        answers: dataQuiz.map((item) => {
          return {
            questionId: +item.questionId,
            userAnswerId: item.answers.filter((answer) => answer.isSelected).map((answer) => answer.id)
          }
        })
      }
    }
    // call API
    const res = await postSubmitQuiz(payload);
    if(res && res.EC === 0){
      setDataModalResult(res.DT);
      setIsShowResult(true);
    }else{
      toast.error(res.EM);
    }
  }

  return (
    <>
      <div className="detail-quiz-container">
        <div className="left-content">
          <div className="title">
            Quiz {quizId}: {location?.state?.quizTitle}
          </div>
          <div className="q-body">{/* <img /> */}</div>
          <div className="q-content">
            <Question
              index={currentQuestion}
              handleCheckBox={handleCheckBox}
              data={
                dataQuiz && dataQuiz.length > 0 ? dataQuiz[currentQuestion] : []
              }
            />
          </div>
          <div className="footer">
            <button
              className="btn btn-secondary ms-1"
              onClick={() => handlePrev()}
            >
              Previous
            </button>
            <button
              className="btn btn-primary ms-4"
              onClick={() => handleNext()}
            >
              Next
            </button>
            <button
              className="btn btn-warning ms-4"
              onClick={() => handleFinishQuiz()}
            >
              Finish
            </button>
          </div>
        </div>
        <div className="right-content">count down</div>
      </div>
      <ModalResult show={isShowResult} setShow={setIsShowResult} result={dataModalResult}/>
    </>
  );
};
export default DetailQuiz;
