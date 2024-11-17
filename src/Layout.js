import App from "./App";
import User from "./components/User/User";
import Admin from "./components/Admin/Admin";
import HomePage from "./components/Home/HomePage";
import ManagerUser from "./components/Admin/Content/ManagerUser";
import DashBoard from "./components/Admin/Content/DashBoard";
import Login from "./components/Auth/Login";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./components/Auth/Register";
import ListQuiz from "./components/User/ListQuiz";
import DetailQuiz from "./components/User/DetailQuiz";
import NotFound from "./components/Home/NotFound";

const Layout = (props) => {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="users" element={<ListQuiz />} />
        </Route>

        <Route path="admin" element={<Admin />}>
          <Route index element={<DashBoard />} />
          <Route path="manage-users" element={<ManagerUser />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={"light"}
      />
    </>
  );
};

export default Layout;
