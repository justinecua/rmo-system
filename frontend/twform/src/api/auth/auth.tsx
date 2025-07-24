import axios from "axios";
import {
  LOGIN_URL,
  REGISTER_URL,
  LOGOUT_URL,
  COURSES_URL,
  AUTHENTICATED_URL,
} from "../urls";

axios.defaults.withCredentials = true;

export const login = async (email, password) => {
  const response = await axios.post(
    LOGIN_URL,
    { email, password },
    { withCredentials: true }
  );
  return response.data;
};

export const get_notes = async () => {
  const response = await axios.get(COURSES_URL, { withCredentials: true });
  return response.data;
};

export const logout = async () => {
  const response = await axios.post(LOGOUT_URL, {}, { withCredentials: true });
  return response.data;
};

export const register = async (username, email, password) => {
  const response = await axios.post(
    REGISTER_URL,
    { username, email, password },
    { withCredentials: true }
  );
  return response.data;
};

export const authenticated_user = async () => {
  const response = await axios.get(AUTHENTICATED_URL, {
    withCredentials: true,
  });
  return response.data;
};
