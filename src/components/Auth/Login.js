import { useState } from "react";
import "./Login.scss";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleLogin = () => {
    console.log("Email: ", email);
    console.log("Password: ", password);
  }

  return (
    <>
      <div className="login-container">
        <div className="header">
          Don't have an account? <a href="/signup">Sign up</a>
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
            <button className="btn btn-outline-primary" onClick={() => handleLogin()}>Login to Quiz</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
