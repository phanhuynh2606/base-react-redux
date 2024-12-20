import { useState } from "react";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { toast } from "react-toastify";
import {postChangePassword} from "../../../services/apiService";
const ChangePassword = (props) => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowNewPassword, setIsShowNewPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState({ password: "", newPassword: "" });
  const handleChangePassword = async() => {
    let hasError = false;
    const newError = { password: "", newPassword: "" };
    //validate
    if (!password) {
      newError.password = "Password is required.";
      hasError = true;
    }
    if (!newPassword) {
      newError.newPassword = "New password is required.";
      hasError = true;
    }
    setError(newError);
    if (hasError) return;
    // submit API
    const res = await postChangePassword(password, newPassword);
    console.log(res);
    if (res && res.EC === 0) {
      toast.success(res.EM);
    }
    if (res && res.EC !== 0) {
      toast.error(res.EM);
    }
  };
  return (
    <div className="change-password-container">
      <div className="content-form col-4 mx-auto">
        <div className="form-group field-password">
          <label>
            Password <span className="required"> * </span>
          </label>
          <input
            type={isShowPassword ? "text" : "password"}
            name="password"
            className="form-control"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError((prev) => ({ ...prev, password: "" })); // Clear error on input
            }}
          />
          {isShowPassword ? (
            <span onClick={() => setIsShowPassword(false)} className="eye">
              <VscEyeClosed size={20} />
            </span>
          ) : (
            <span onClick={() => setIsShowPassword(true)} className="eye">
              <VscEye size={20} />
            </span>
          )}
        </div>
            {error.password && <div className="alert alert-danger p-1">{error.password}</div>}
        <div className="form-group field-password">
          <label>
            New Password <span className="required"> * </span>
          </label>
          <input
            type={isShowNewPassword ? "text" : "password"}
            name="password"
            className="form-control"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
              setError((prev) => ({ ...prev, newPassword: "" })); // Clear error on input
            }}
          />
          {isShowNewPassword ? (
            <span onClick={() => setIsShowNewPassword(false)} className="eye">
              <VscEyeClosed size={20} />
            </span>
          ) : (
            <span onClick={() => setIsShowNewPassword(true)} className="eye">
              <VscEye size={20} />
            </span>
          )}
        </div>
          {error.newPassword && (
            <div className="alert alert-danger p-1">{error.newPassword}</div>
          )}
        <div className="form-group">
          <button
            className="btn btn-outline-primary"
            onClick={() => handleChangePassword()}
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};
export default ChangePassword;
