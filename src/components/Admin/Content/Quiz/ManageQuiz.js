import { FaPlusCircle } from "react-icons/fa";
import "./ManageQuiz.scss";
import Select from "react-select";
import { useState } from "react";
const options = [
  { value: "EASY", label: "EASY" },
  { value: "MEDIUM", label: "MEDIUM" },
  { value: "HARD", label: "HARD" },
];
const ManageQuiz = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("EASY");
  const [image, setImage] = useState("");
  const handleUploadImage = (e) => {
    setImage(e.target.files[0]);
  }
  return (
    <div className="quiz-container">
      <div className="title">Manage Quiz</div>
      <div className="add-new">
        <fieldset className="border rounded-3 p-3">
          <legend className="float-none w-auto px-3">Add New Quiz</legend>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Your quiz name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label>Name</label>
          </div>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <label>Description</label>
          </div>
          <div className="my-4">
          <Select
              value={type}
              onChange={(e) => setType(e.value)}
              options={options}
              placeholder='Quiz Type...'
            />
          </div>
          <div className="more-actions my-3">
          <label htmlFor="uploadImage" className="form-label label-upload">
                <FaPlusCircle color="green" size={20} className="icon-upload"/>
                Upload File Image
              </label>
              <input type="file" hidden id="uploadImage" 
                accept="image/png, image/gif, image/jpeg"
                onChange={(e) => handleUploadImage(e)}
              />
          </div>
        </fieldset>
      </div>
      <div className="list-detail">table</div>
    </div>
  );
};
export default ManageQuiz;
