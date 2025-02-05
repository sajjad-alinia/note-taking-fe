import axios from "axios";
// toast
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: "http://127.0.0.1:8090/api",
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);
    if (error.response) {
      if (error.response.status == 400) {
        toast.error(error.response.data.message);
      }
      if (error.response.status == 403) {
        toast.warning(error.response.data.message);
      }
      if (error.response.status == 401) {
        localStorage.removeItem("token");
      }
      if (error.response.status == 500) {
        toast.error(error.response.data.message);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
