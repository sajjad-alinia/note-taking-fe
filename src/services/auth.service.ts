import api from "./api";

export const register = (data: object) => {
  return api.post("/collections/users/records", data);
};
