import { FaPlusCircle } from "react-icons/fa";
import "./ManageQuiz.scss";
import Select from "react-select";
import { useState } from "react";
import { set } from "nprogress";
import { postCreateQuiz } from "../../../../services/apiService";
import { toast } from "react-toastify";
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
  const [previewImage, setPreviewImage] = useState("");
  const handleUploadImage = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
    } else {
      // setPreviewImage("");
    }
  };

  const handleSubmitQuiz = async () => {
    if (!name) {
      toast.error("Name is required!");
      return;
    }
    if (!description) {
      toast.error("Description is required!");
      return;
    }
    const res = await postCreateQuiz(name, description, type, image);
    if(res && res.EC === 0){
      console.log(res);
      toast.success(res.EM);
      setName("");
      setDescription("");
      setType("EASY");
      setImage("");
      setPreviewImage("");
    }else{
      toast.error(res.EM);
    }
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
              defaultValue={options.find((option) => option.value === type)}
              onChange={(e) => setType(e.value)}
              options={options}
              placeholder="Quiz Type..."
              isSearchable
            />
          </div>
          <div className="more-actions my-3">
            <div className="upload-image ">
              <label htmlFor="uploadImage" className="form-label label-upload">
                <FaPlusCircle color="green" size={20} className="icon-upload" />
                Upload File Image
              </label>
              <input
                type="file"
                hidden
                id="uploadImage"
                accept="image/png, image/gif, image/jpeg"
                onChange={(e) => handleUploadImage(e)}
              />
            </div>
            <div className="img-preview">
              {previewImage ? (
                <img src={previewImage} alt="preview" />
              ) : (
                <span>Preview Image</span>
              )}
            </div>
            <div className="action-add">
              <button className="btn btn-warning"
              onClick={() => handleSubmitQuiz()}
              >Add Quiz</button>
            </div>
          </div>
        </fieldset>
      </div>
      <div className="list-detail">table</div>
    </div>
  );
};
export default ManageQuiz;
