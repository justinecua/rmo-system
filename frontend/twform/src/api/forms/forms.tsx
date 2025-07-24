import axios from "axios";
import { FORMTYPES_URL } from "../urls";

axios.defaults.withCredentials = true;

export const get_formTypes = async () => {
  const response = await axios.get(FORMTYPES_URL, { withCredentials: true });
  return response.data;
};
