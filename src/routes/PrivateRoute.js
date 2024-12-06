import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = (props) => {
  const isAutenticated = useSelector(state => state.user.isAuthenticated);
  if (!isAutenticated) {
    
    return <Navigate to="/login" />;
  }
  return (
    <>
      {props.children}
    </>
  )
}
export default PrivateRoute;