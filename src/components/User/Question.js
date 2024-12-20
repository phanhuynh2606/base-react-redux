import _ from "lodash";
import { useState } from "react";
import Viewer from "react-viewer";
import { IoIosClose, IoIosCheckmark } from "react-icons/io";
const Question = (props) => {
  const [isPreviewImage, setIsPreviewImage] = useState(false);
  const { data, index,handleCheckBox,isShowAnswer } = props;
  if (_.isEmpty(data)) {
    return <div>Loading...</div>;
  }

  const handleOnchangeCheckBox = (e,answerId,questionId) => {
    handleCheckBox(answerId,questionId);
  }

  return (
    <>
    {data.image ? 
    <div className="q-image">
        <img
          alt="question"
          src={`data:image/jpeg;base64,${data.image}`}
          className="card-img-top"
          onClick={() => setIsPreviewImage(true)}
        />
          {isPreviewImage && (
                    <Viewer
                    visible={isPreviewImage}
                    onClose={() => {setIsPreviewImage(false);}}
                    images={[{ src: `data:image/jpeg;base64,${data.image}`,alt:`Question Image` }] }
                    zIndex={9999}
                    noNavbar={true}
                  />
                  )}
      </div> : <div className="q-image">
      </div>}
      
      <div className="question">
        Question {index + 1}: {data.questionDescription}{" "}
      </div>
      <div className="answer">
        {data.answers &&
          data.answers.length > 0 &&
          data.answers.map((answer, index) => {
            return (
              <div key={`answer-${index}`} className="a-child">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`a-${index}`}
                  checked={answer.isSelected}
                  disabled={isShowAnswer}
                  onChange={(e) =>handleOnchangeCheckBox(e,answer.id,data.questionId)}
                />
                <label className="form-check-label ms-1" htmlFor={`a-${index}`}>
                  {answer.description}
                </label>
                {isShowAnswer=== true && 
                  <>  
                      {answer.isSelected === true && !answer.isCorrect 
                      && <IoIosClose size={31}  className='incorrect' />}
                      {answer.isCorrect === true 
                      && <IoIosCheckmark className='correct' size={31} />}
                  </>
                }
              </div>
            );
          })}
      </div>
    </>
  );
};
export default Question;
