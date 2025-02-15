import api from "./api";

export const register = (data: object) => {
  return api.post("/collections/users/records", data);
};

export const login = (data: object) => {
  return api.post("/collections/users/auth-with-password", data);
};
