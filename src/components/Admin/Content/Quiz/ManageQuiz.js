import { FaPlusCircle } from "react-icons/fa";
import "./ManageQuiz.scss";
import Select from "react-select";
import { useEffect, useState } from "react";
import {
  getAllQuizForAdmin,
  postCreateQuiz,
} from "../../../../services/apiService";
import { toast } from "react-toastify";
import TableQuiz from "./TableQuiz";
import Accordion from "react-bootstrap/Accordion";
import QuizQA from "./QuizQA";
import AssignQuiz from "./AssignQuiz";

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
  const [listQuiz, setListQuiz] = useState([]);

  useEffect(() => {
    getListQuiz();
  }, []);
  const translateText = async (text, targetLang) => {
    const response = await fetch(
      `https://lingva.ml/api/v1/${targetLang}/en/${encodeURIComponent(text)}`
    );
    const data = await response.json();
    return data.translation;
  };

  const getListQuiz = async () => {
    const res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      setListQuiz(res.DT);
      // const cacheKey = `translated_quizzes_en`;
      // const cachedData = localStorage.getItem(cacheKey);

      // if (cachedData) {
      //   setListQuiz(JSON.parse(cachedData));
      //   return;
      // }
      // console.log(await translateText("Xin Chào", "en"));
      // const titles = res.DT.map((quiz) => quiz.description);
      // const translatedTitles = await translateText(titles, "en");
      // const arrTranslatedTitles = translatedTitles.split(",");
      // console.log(arrTranslatedTitles);
      // const translatedQuiz = res.DT.map((quiz, index) => ({
      //   ...quiz,
      //   description: arrTranslatedTitles[index],
      // }));
      // console.log(translatedQuiz);
      // localStorage.setItem(cacheKey, JSON.stringify(translatedQuiz));
      // setListQuiz(translatedQuiz);
    }
  };

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
    if (res && res.EC === 0) {
      setListQuiz([res.DT, ...listQuiz]);
      toast.success(res.EM);
      setName("");
      setDescription("");
      setType("EASY");
      setImage("");
      setPreviewImage("");
    } else {
      toast.error(res.EM);
    }
  };
  return (
    <div className="quiz-container">
      <Accordion defaultActiveKey="1">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Manage Quiz</Accordion.Header>
          <Accordion.Body>
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
                    defaultValue={options.find(
                      (option) => option.value === type
                    )}
                    onChange={(e) => setType(e.value)}
                    options={options}
                    placeholder="Quiz Type..."
                    isSearchable
                  />
                </div>
                <div className="more-actions my-3">
                  <div className="upload-image ">
                    <label
                      htmlFor="uploadImage"
                      className="form-label label-upload"
                    >
                      <FaPlusCircle
                        color="green"
                        size={20}
                        className="icon-upload"
                      />
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
                    <button
                      className="btn btn-warning"
                      onClick={() => handleSubmitQuiz()}
                    >
                      Add Quiz
                    </button>
                  </div>
                </div>
              </fieldset>
            </div>
            <div className="list-detail mt-3 p-2">
              <TableQuiz
                listQuiz={listQuiz}
                setListQuiz={setListQuiz}
                getListQuiz={getListQuiz}
              />
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Update Q/A Quiz</Accordion.Header>
          <Accordion.Body>
            <QuizQA />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Assign to Users</Accordion.Header>
          <Accordion.Body>
            <AssignQuiz />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};
export default ManageQuiz;
