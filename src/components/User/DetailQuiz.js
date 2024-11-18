import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getDataQuiz } from "../../services/apiService";
import _ from "lodash";
import "./DetailQuiz.scss";
const DetailQuiz = (props) => {
  const params = useParams();
  const quizId = params.id;
  const location = useLocation();
  console.log(location);
  useEffect(() => {
    fetchQuestion();
  },[quizId])

  const fetchQuestion = async () => {
    const res = await getDataQuiz(quizId);
    if(res && res.EC === 0){
      let raw = res.DT;
      let data = _.chain(raw)
    // Group the elements of Array based on `color` property
    .groupBy("id")
    // `key` is group's name (color), `value` is the array of objects
    .map((value, key) => {
      let answers = [];
      let questionDescription, image = null;
      value.forEach((item,index) => {
        if(index === 0){
          questionDescription = item.description;
          image = item.image;
        }
        answers.push(item.answers);
      })
      return { questionId: key, answers,questionDescription, image }
    })
    .value();
    // console.log(data);
    }
  }

  return (
    <>
      <div className="detail-quiz-container">
          <div className="left-content">
            <div className="title">
              Quiz {quizId}: {location?.state?.quizTitle}
            </div>
            <div className="q-body">
              <img />
            </div>
            <div className="q-content">
              <div className="question">Question 1: How are you? </div>
              <div className="answers">
                <div className="a-child">A</div>
                <div className="a-child">B</div>
                <div className="a-child">C</div>
              </div>
            </div>
            <div className="footer">
                <button className="btn btn-secondary ms-1">Previous</button>
                <button className="btn btn-primary ms-4">Next</button>
            </div>
          </div>
          <div className="right-content">
              count down
          </div>
      </div>
      
    </>
  );
}
export default DetailQuiz;