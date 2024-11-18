import _ from "lodash";

const Question = (props) => {
  const { data, index } = props;
  console.log(data);
  if (_.isEmpty(data)) {
    return <div>Loading...</div>;
  }
  return (
    <>
    {data.image && <div className="q-image">
        <img
          src={`data:image/jpeg;base64,${data.image}`}
          className="card-img-top"
        />
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
                  value=""
                  id={`a-${index}`}
                />
                <label className="form-check-label" htmlFor={`a-${index}`}>
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
