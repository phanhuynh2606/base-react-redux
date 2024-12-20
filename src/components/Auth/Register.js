import { useState } from "react";
import "./Login.scss";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import {  postRegister } from "../../services/apiService";
import { toast } from "react-toastify";
import { VscEye,VscEyeClosed  } from "react-icons/vsc";
import { useTranslation } from "react-i18next";
import Language from "../Header/Language";
const Register = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const navigate = useNavigate();
  const {t} = useTranslation();
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
          <span>{t('login.text')}</span>
          <button onClick={() => navigate('/login')}>{t('header.login')}</button>
          <Language/>
        </div>
        <div className="title col-4 mx-auto">Quiz</div>
        <div className="welcome col-4 mx-auto">{t("signup.title")}</div>
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
            <label>{t("signup.password")} <span className="required"> * </span></label>
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
            <label>{t("signup.username")} </label>
            <input
              type="text"
              name="username"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <span className="forgot-password">{t("login.forgot")}</span>
          </div>
          <div className="form-group">
            <button
              className="btn btn-outline-primary"
              onClick={() => handleRegister()}
            >
              {t("signup.signup")}
            </button>
          </div>
          <div className="back">
            <span onClick={() => navigate("/")}>
              <IoMdArrowBack />
              {t("login.back")}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
