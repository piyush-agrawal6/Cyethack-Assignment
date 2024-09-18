import { notification } from "antd";
import axios from "axios";
const URL = import.meta.env.VITE_APP_BASE_URL;

export const logout = async () => {
  try {
    await axios.get(`${URL}/auth/logout`, { withCredentials: true });
    localStorage.removeItem("key");
    sessionStorage.removeItem("items");
    sessionStorage.removeItem("item_id");
    notification.success({
      message: "Session Expired",
      description: "Please login again",
    });
    window.location.href = "/login";
  } catch (error) {
    console.log("Error during logout", error);
  }
};
