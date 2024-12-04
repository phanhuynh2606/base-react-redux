
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

const getQuizByUser = async () => {
  return await axios.get(`api/v1/quiz-by-participant`);
}
const getDataQuiz = async (quizId) => {
  return await axios.get(`api/v1/questions-by-quiz?quizId=${quizId}`);
}
const postSubmitQuiz = async (payload) => {
  console.log({...payload});
  return await axios.post(`api/v1/quiz-submit`,{...payload});
}
const postCreateQuiz = async (name,description,difficulty,image) =>{
  const data = new FormData();
    data.append("name", name);
    data.append("description", description);
    data.append("difficulty", difficulty);
    data.append("quizImage", image);
    return await axios.post("api/v1/quiz", data);
}

const getAllQuizForAdmin = async () => {
  return await axios.get(`api/v1/quiz/all`);
}
const deleteQuizByAdmin = async (quizId) => {
  return await axios.delete(`api/v1/quiz/${quizId}`);
}
const  putUpdateQuiz = async (id,name,description,type,image) => {
  const data = new FormData();
    data.append("id", id);
    data.append("name", name);
    data.append("description", description);
    data.append("difficulty", type);
    data.append("quizImage", image);
    return  await axios.put("api/v1/quiz", data);
}
const postCreateQuestionForQuiz = async (quizId,description,questionImage) =>{
    const data = new FormData();
    data.append("quiz_id", quizId);
    data.append("description", description);
    data.append("questionImage", questionImage);
    return await axios.post("api/v1/question", data);
}
const postCreateAnswerForQuestion = async (question_id,description,correct_answer) =>{

  return await axios.post("api/v1/answer", {
    description,correct_answer,question_id
  });
}
const postAssignQuiz = async (quizId,userId) => {
  return await axios.post(`api/v1/quiz-assign-to-user`,{quizId,userId});
}
const getQuizWithQA = async (quizId) => {
  return await axios.get(`api/v1/quiz-with-qa/${quizId}`);
}
export {postCreateUser, getAllUsers
        ,putUpdateUser,deleteUser
        ,getUsersWithPaginate,postLogin,postRegister
        ,getQuizByUser,getDataQuiz,postSubmitQuiz
        ,postCreateQuiz,getAllQuizForAdmin,deleteQuizByAdmin,putUpdateQuiz
        ,postCreateQuestionForQuiz,postCreateAnswerForQuestion,postAssignQuiz
        ,getQuizWithQA};