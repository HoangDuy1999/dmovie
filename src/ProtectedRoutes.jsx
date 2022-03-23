import { Navigate, Outlet } from "react-router-dom";
import jwt_decode from "jwt-decode";

const useAuth = () => {
  const access_token = localStorage.getItem("access_token");
  console.log(access_token);
  try {
    const decoded = jwt_decode(access_token);
    console.log(decoded);
    let currentDate = new Date();

    // JWT exp is in seconds
    if (decoded.exp * 1000 < currentDate.getTime()) {
      console.log("Token expired.");
      return false;
    } else {
      console.log("Valid token");
      return true;
    }
  } catch (e) {
    console.log(e);
    return false;
  }
};

const ProtectedRoutes = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/account?type=login" />;
};

export default ProtectedRoutes;
