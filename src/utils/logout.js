import axios from "axios";
import { showNotification } from "./notification";
const URL = import.meta.env.VITE_APP_BASE_URL;

export const logout = async () => {
  try {
    await axios.get(`${URL}/auth/logout`, { withCredentials: true });
    localStorage.removeItem("key");
    sessionStorage.removeItem("items");
    sessionStorage.removeItem("item_id");
    showNotification("error", "Session expired", "Please refresh your session");
    // window.location.href = "/login";
  } catch (error) {
    console.log("Error during logout", error);
  }
};
