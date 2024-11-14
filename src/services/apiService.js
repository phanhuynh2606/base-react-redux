
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
const getUsersWithPaginate = async (page,limit) => {
  return await axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
}

const  putUpdateUser = async (id,username,role,image) => {
  const data = new FormData();
    data.append("id", id);
    data.append("username", username);
    data.append("role", role);
    data.append("userImage", image);
    return  await axios.put("api/v1/participant", data);
}

const deleteUser = async (userId) => {
  return await axios.delete(`api/v1/participant`,{data: {id:userId}});
}
const postLogin = async (email,password) => {
  return await axios.post("api/v1/login",{email,password,delay:2000});
}
const postRegister = async (email,password,username) => {
  return await axios.post("api/v1/register",{email,password,username});
}
export {postCreateUser, getAllUsers,putUpdateUser,deleteUser,getUsersWithPaginate,postLogin,postRegister};