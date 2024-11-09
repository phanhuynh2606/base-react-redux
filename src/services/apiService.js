
import axios from "../utils/axiosCustomize.";

const  postCreateUser = async (email,password,username,role,image) => {
  const data = new FormData();
    data.append("email", email);
    data.append("password", password);
    data.append("username", username);
    data.append("role", role);
    data.append("userImage", image);
    return await axios.post("api/v1/participant", data);
}
const getAllUsers = async () => {
  return await axios.get("api/v1/participant/all");
}
export {postCreateUser, getAllUsers};