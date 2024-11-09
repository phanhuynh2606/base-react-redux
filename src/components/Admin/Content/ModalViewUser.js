import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaPlusCircle } from "react-icons/fa";
import _ from "lodash";
const ModalViewUser = (props) => {
  const {show,setShow,userView} = props;

  const handleClose = () => {
    setShow(false);
  };
  // const handleShow = () => setShow(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("USER");
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    if(!_.isEmpty(userView)){
      setEmail(userView.email);
      setUsername(userView.username);
      setRole(userView.role);
      if(userView.image){
        setPreviewImage(`data:image/png;base64,${userView.image}`);
      }
    };
  }, [userView]);

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
          <Modal.Title>Update a User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                disabled
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                disabled
                placeholder="Password was hidden"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Role</label>
              <select
                className="form-select"
                onChange={(e) => setRole(e.target.value)}
                value={role}
                disabled
              >
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>
            <div className="col-md-12">
              <label htmlFor="uploadImage" className="form-label label-upload">
                <FaPlusCircle color="green" size={18} />
                Upload File Image
              </label>
              <input type="file" hidden id="uploadImage" disabled
                accept="image/png, image/gif, image/jpeg"
              />
            </div>
            <div className="col-md-12 img-preview">
              {previewImage ?
                <img src={previewImage} alt="preview" />
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
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalViewUser;
