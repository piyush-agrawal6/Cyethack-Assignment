import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { loginSuccess } from "../redux/auth/action";
import { useNavigate, useLocation } from "react-router-dom"; // Use the hook for navigation

let URL = import.meta.env.VITE_APP_BASE_URL;

const AuthChecker = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate hook
  const location = useLocation(); // Get current location (route)

  useEffect(() => {
    // List of public routes that don't require authentication
    const publicRoutes = ["/login", "/signup"];

    // Check if the current route is a public route
    const isPublicRoute = publicRoutes.includes(location.pathname);

    // If it's a public route, skip the auth check
    if (isPublicRoute) return;

    const checkAuth = async () => {
      try {
        const response = await axios.get(`${URL}/auth/verify`, {
          withCredentials: true,
        });
        dispatch(
          loginSuccess({ user: response.data.user, token: response.data.token })
        );
      } catch (error) {
        console.error("Authentication failed, redirecting to login.");
        navigate("/login"); 
      }
    };

    checkAuth();
  }, [dispatch, navigate, location.pathname]); 

  return null;
};

export default AuthChecker;
