import { useState } from "react";
import "./Login.scss";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import {  postRegister } from "../../services/apiService";
import { toast } from "react-toastify";
import { VscEye,VscEyeClosed  } from "react-icons/vsc";
const Register = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleRegister = async () => {
    //validate
    if (!validateEmail(email)) {
      toast.error("Email is invalid");
      return;
    }
    if (!password) {
      toast.error("Password is invalid");
      return;
    }
    // submit API
    const res = await postRegister(email, password,username);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      navigate("/login");
    }
    if (res && res.EC !== 0) {
      toast.error(res.EM);
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="header">
          <span>Already have an account?</span>
          <button onClick={() => navigate('/login')}>Log in</button>
        </div>
        <div className="title col-4 mx-auto">Quiz</div>
        <div className="welcome col-4 mx-auto">Start your journey?</div>
        <div className="content-form col-4 mx-auto">
          <div className="form-group">
            <label>Email<span className="required"> * </span></label>
            <input
              type="text"
              name="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group field-password">
            <label>Password <span className="required"> * </span></label>
            <input
              type={isShowPassword ? "text" : "password"}
              name="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {isShowPassword ? 
              <span onClick={() => setIsShowPassword(false)} className="eye"><VscEyeClosed size={20}/>
              </span> : 
              <span onClick={() => setIsShowPassword(true)} className="eye"><VscEye size={20}/></span>
              }
          </div>
          <div className="form-group">
            <label>Username </label>
            <input
              type="text"
              name="username"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <span className="forgot-password">Forgot Password?</span>
          </div>
          <div className="form-group">
            <button
              className="btn btn-outline-primary"
              onClick={() => handleRegister()}
            >
              Create my free account
            </button>
          </div>
          <div className="back">
            <span onClick={() => navigate("/")}>
              <IoMdArrowBack />
              Go to Homepage
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
