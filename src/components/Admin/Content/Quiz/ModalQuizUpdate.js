import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaPlusCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import _ from "lodash";
import { putUpdateQuiz } from "../../../../services/apiService";
const ModalQuizUpdate = (props) => {
  const {show,setShow,quizUpdate,setQuizUpdate} = props;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("EASY");
  const [image, setImage] = useState("");
  const [previewImageUpdate, setPreviewImageUpdate] = useState("");
  const handleClose = () => {
    setShow(false);
    setName("");
    setDescription("");
    setType("");
    setImage("");
    setPreviewImageUpdate("");
    setQuizUpdate({});
  };

  useEffect(() => {
    if(!_.isEmpty(quizUpdate)){
      setName(quizUpdate.name);
      setDescription(quizUpdate.description);
      setType(quizUpdate.difficulty);
      if(quizUpdate.image){
        setPreviewImageUpdate(`data:image/png;base64,${quizUpdate.image}`);
      }
    };
  },[props.quizUpdate])
  const handleUploadImage = (event) => {
    if(event.target && event.target.files && event.target.files[0]) {
      setPreviewImageUpdate(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    }else{
      // setPreviewImage("");
    }
  }
  const handleSubmitUpdateUser = async () => {
    const res = await putUpdateQuiz(quizUpdate.id,name,description,type,image);
    if(res && res.EC === 0){
      toast.success(res.EM);
      props.getListQuiz()
      handleClose();
    }else{
      toast.error(res.EM);
    }
  }
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        backdrop="static"
        className="model-add-user"
      >
        <Modal.Header closeButton>
          <Modal.Title>Update a Quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Description</label>
              <input
                type="text"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Type</label>
              <select
                className="form-select"
                onChange={(e) => setType(e.target.value)}
                value={type}
              >
                <option value="EASY">EASY</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HARD">HARD</option>
              </select>
            </div>
            <div className="col-md-12">
              <label htmlFor="uploadImageUpdate" className="form-label label-upload">
                <FaPlusCircle color="green" size={18} />
                Upload File Image
              </label>
              <input type="file" hidden id="uploadImageUpdate" 
                accept="image/png, image/gif, image/jpeg"
                onChange={(event) => handleUploadImage(event)}
              />
            </div>
            <div className="col-md-12 img-preview">
              {previewImageUpdate ?
                <img src={previewImageUpdate} alt="preview" />
               : 
                <span>Preview Image</span>
              }
              
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSubmitUpdateUser()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
export default ModalQuizUpdate;