import { useRef } from "react";
import CountDown from "./CountDown";

const RightContent = (props) => {
  const { dataQuiz,setIndex } = props;
  const refDiv = useRef([]);
  const onTimeUp = () => {
    props.handleFinishQuiz();
  };
  const getClassQuestion = (index,question) => {
    if(question && question.answers.length > 0){
      const isSelected = question.answers.some((answer) => answer.isSelected);
      if(isSelected){
        refDiv.current[index].classList.add("selected");
      }else{
        if(refDiv.current[index] && refDiv.current[index].classList.contains("selected")){
          refDiv.current[index].className = "question clicked";
        }
      }
    }
    if(index === 0){
      return "question clicked";
    }
    return "question";
  }
  const handleClickQuestion = (question,index) => {
    setIndex(index)
    if(refDiv.current && refDiv.current[index]){
      refDiv.current.map((item) => {
        item.classList.remove("clicked");
        return item;
      });
      refDiv.current[index].classList.add("clicked");
    }
  }
  return (
    <>
      <div key="main-timer" className="main-timer">
        <CountDown onTimeUp={onTimeUp}/>
      </div>
      <div className="main-question">
        {dataQuiz &&
          dataQuiz.length > 0 &&
          dataQuiz.map((item, index) => {
            return (
              <div key={item.questionId} className={getClassQuestion(index,item)}
                onClick={() =>handleClickQuestion(item,index) }
                ref={element => refDiv.current[index] = element}
              >
                {index + 1}
              </div>
            );
          })}
      </div>
    </>
  );
};
export default RightContent;
