import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDataQuiz } from "../../services/apiService";
import _ from "lodash";

const DetailQuiz = () => {
  const params = useParams();
  const quizId = params.id;

  useEffect(() => {
    fetchQuestion();
  },[quizId])

  const fetchQuestion = async () => {
    const res = await getDataQuiz(quizId);
    if(res && res.EC === 0){
      let raw = res.DT;
    }
  }

  return (
    <>
    
    </>
  );
}
export default DetailQuiz;