import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getDataQuiz } from "../../services/apiService";
import _ from "lodash";
import "./DetailQuiz.scss";
import Question from "./Question";
const DetailQuiz = (props) => {
  const params = useParams();
  const quizId = params.id;
  const location = useLocation();

  const [dataQuiz, setDataQuiz] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);

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
          </div>
        </div>
        <div className="right-content">count down</div>
      </div>
    </>
  );
};
export default DetailQuiz;
