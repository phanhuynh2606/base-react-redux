
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ModalResult = (props) => {
  const {show,setShow,result} = props;

  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="md"
        backdrop="static"
        className="model-add-user"
      >
        <Modal.Header closeButton>
          <Modal.Title>Your Test Result</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>Total Question : <b style={{fontSize:'17px'}}>{result.countTotal}</b> </div>
          <div>Total Correct Answer : <b style={{fontSize:'17'}}>{result.countCorrect}</b></div>
          <div>
            Result : <b style={{fontSize:'18px'}}>{result.countCorrect}/{result.countTotal} </b>question
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" >
            Show Answers
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalResult;
