import { useEffect, useState } from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { getDataQuiz, postSubmitQuiz } from "../../services/apiService";
import _ from "lodash";
import "./DetailQuiz.scss";
import Question from "./Question";
import { toast } from "react-toastify";
import ModalResult from "./ModalResult";
import RightContent from "./Content/RightContent";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { useTranslation } from "react-i18next";

const DetailQuiz = (props) => {
  const params = useParams();
  const quizId = params.id;
  const location = useLocation();
  const {t} = useTranslation();
  const [dataQuiz, setDataQuiz] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isShowResult, setIsShowResult] = useState(false);
  const [dataModalResult, setDataModalResult] = useState({});
  const [isFinish, setIsFinish] = useState(false);

  useEffect(() => {
    const storedQuizData = sessionStorage.getItem(`quizData_${quizId}`);
    if (storedQuizData) {
      setDataQuiz(JSON.parse(storedQuizData));
    }else{
      fetchQuestion();
    }
  }, [quizId]);
  useEffect(() => { 
    handleVisibilityChange();
  }, [dataQuiz]);
  const handleVisibilityChange = () => {
      if (document.hidden) {
          if(dataQuiz && dataQuiz.length > 0){
            handleFinishQuiz(); // Gọi hàm để nộp bài
          }else{
            const storedQuizData = sessionStorage.getItem(`quizData_${quizId}`);
            setDataQuiz(JSON.parse(storedQuizData));
          }
      }
  };
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = ""; // Cảnh báo người dùng trước khi rời khỏi trang
    };

    useEffect(() => {
      window.addEventListener("beforeunload", handleBeforeUnload);
      document.addEventListener("visibilitychange", handleVisibilityChange);
      return () => {
        document.removeEventListener("visibilitychange", handleVisibilityChange);
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }, []);

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
          answers = _.orderBy(answers, ["id"], ["asc"]);

          return { questionId: key, answers, questionDescription, image };
        })
        .value();
      setDataQuiz(data);
      sessionStorage.setItem(`quizData_${quizId}`, JSON.stringify(data));
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
    sessionStorage.setItem(`quizData_${quizId}`, JSON.stringify(dataQuizClone));
  }
  const handleFinishQuiz = async () => {
    localStorage.removeItem(`endTime_${quizId}`);
    sessionStorage.removeItem(`quizData_${quizId}`);
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
    console.log(res);
    if(res && res.EC === 0){
      setIsFinish(true);
      setDataModalResult(res.DT);
      setIsShowResult(true);
    }else{
      toast.error(res.EM);
    }
  }

  return (
    <>
     <Breadcrumb className="quiz-detail-breadcrumb">
      <NavLink to='/' className="breadcrumb-item">{t('header.home')} </NavLink>
      <NavLink to='/users' className="breadcrumb-item">
        {t('header.u')}
      </NavLink>
      <Breadcrumb.Item active>{t('header.quiz')}</Breadcrumb.Item>
    </Breadcrumb>
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
        <div className="right-content">
          <RightContent 
            quizId={quizId}
            dataQuiz={dataQuiz} 
            handleFinishQuiz={handleFinishQuiz}
            setIndex={setCurrentQuestion}
            isFinish={isFinish}
          />
        </div>
      </div>
      <ModalResult show={isShowResult} setShow={setIsShowResult} result={dataModalResult}/>
    </>
  );
};
export default DetailQuiz;
