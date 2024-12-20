import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../../services/apiService";
import { toast } from "react-toastify";
import { updateInforProfile } from "../../../redux/action/userAction";
const MainInfor = (props) => {
  const user = useSelector((state) => state.user.account);
  const [username, setUsername] = useState(user.username);
  const [image, setImage] = useState(`data:image/png;base64,${user.image}`);
  const dispatch = useDispatch();
  const [nameImage, setNameImage] = useState("");
  const [fileImage, setFileImage] = useState(null);
  const temp_image = "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
});
  const handleChangeImage = (e) => {
    if(e.target.files && e.target.files[0]){
        setFileImage(e.target.files[0]);
        setImage(URL.createObjectURL(e.target.files[0]));
        setNameImage(e.target.files[0].name);
    }
  }
  const handleUpdateProfile = async() => {
    const res = await updateProfile(username,fileImage);
    if(res && res.EC === 0){
      let base64Image = "";
      if(fileImage){
        const base64ImageWithPrefix = await toBase64(fileImage);
        base64Image = base64ImageWithPrefix.replace(/^data:image\/[a-zA-Z]+;base64,/, '');
      }
    // Loại bỏ phần "data:image/jpeg;base64,"
      toast.success(res.EM);
      dispatch(updateInforProfile(base64Image,username));
    }else{
      toast.error(res.EM);
    }
  }
  return (
    <>
      <div className="container rounded bg-white main-infor-container">
        <div className="row infor-user">
            <div className="d-flex justify-content-center align-items-center col-12">
                <h4 className="text-center">Profile Settings</h4>
              </div>
          <div className="col-md-6 border-right left-infor">
            <div className="d-flex flex-column align-items-center text-center py-1">
              <img
                className="rounded-circle mt-2"
                width="140px"
                height="140px"
                src={image ? image : temp_image}
              />
              <span className="name-image mt-2">{nameImage ? nameImage: ""}</span>
              <label htmlFor="file-image" className="cssbuttons-io-button">
                <FaCloudUploadAlt size={18} className="icon-upload"/>
                <span>Upload</span>
              </label>
              <input type="file" id="file-image" hidden accept="image/*" onChange={(e) => handleChangeImage(e)}/>
              
              <span className="text-black-50">{user ? user.email:"Email"}</span>
              <span> </span>
            </div>
          </div>
          <div className="col-md-6 border-right right-infor">
                <div className="col-md-8">
                  <label className="labels">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    value={user ? username:"Username"}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              <div className="mt-5 text-center col-6">
                <button className="btn btn-primary profile-button" type="button"
                  onClick={() => handleUpdateProfile()}
                >
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
    </>
  );
};
export default MainInfor;
