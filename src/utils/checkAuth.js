import axios from "axios";

const URL = import.meta.env.VITE_APP_BASE_URL;

export const checkAuth = async () => {
  try {
    const response = await axios.get(`${URL}/auth/verify`, {
      withCredentials: true,
    });
    return response.data.isAuthenticated;
  } catch (error) {
    console.error("Error checking auth status:", error);
    return false;
  }
};
