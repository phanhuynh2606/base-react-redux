import _ from "lodash";

const Question = (props) => {
  const { data, index,handleCheckBox } = props;
  console.log(data);
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
          src={`data:image/jpeg;base64,${data.image}`}
          className="card-img-top"
        />
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
                  onChange={(e) =>handleOnchangeCheckBox(e,answer.id,data.questionId)}
                />
                <label className="form-check-label ms-1" htmlFor={`a-${index}`}>
                  {answer.description}
                </label>
              </div>
            );
          })}
      </div>
    </>
  );
};
export default Question;
