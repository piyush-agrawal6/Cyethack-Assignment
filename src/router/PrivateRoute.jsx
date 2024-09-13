import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getCookie } from "../utils/cookies";

const PrivateRoute = ({ children }) => {
  const { token } = useSelector((store) => store.auth);
  const savedToken = getCookie("authToken");

  return token || savedToken ? children : <Navigate to="/dashboard" />;
};

export default PrivateRoute;
