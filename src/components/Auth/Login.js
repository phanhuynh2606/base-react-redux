import { useState } from "react";
import "./Login.scss";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../services/apiService";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { doLogin } from "../../redux/action/userAction";
import { FaSpinner } from "react-icons/fa6";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleLogin = async () => {
    //validate
    if (!validateEmail(email)) {
      toast.error("Email is invalid");
      return;
    }
    if (!password) {
      toast.error("Password is invalid");
      return;
    }
    setLoading(true);
    // submit API
    const res = await postLogin(email, password);
    if (res && res.EC === 0) {
      dispatch(doLogin(res));
      toast.success(res.EM);
      setLoading(false);
      navigate("/");
    }
    if (res && res.EC !== 0) {
      setLoading(false);
      toast.error(res.EM);
    }
  };
  document.addEventListener("keydown",(e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  });

  return (
    <>
      <div className="login-container">
        <div className="header">
          <span>Don't have an account?</span>
          <button onClick={() => navigate("/signup")}>Sign up</button>
        </div>
        <div className="title col-4 mx-auto">Quiz</div>
        <div className="welcome col-4 mx-auto">Hello, Who's this?</div>
        <div className="content-form col-4 mx-auto">
          <div className="form-group">
            <label>Email</label>
            <input
              type="text"
              name="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <span className="forgot-password">Forgot Password?</span>
          </div>
          <div className="form-group">
            <button
              className="btn-submit"
              onClick={() => handleLogin()}
              disabled={loading}
            >
              <div className="action">
                {loading &&<FaSpinner className="loader-icon" size={18}/>}
                <span>Login to Quiz</span>
              </div>
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

export default Login;
