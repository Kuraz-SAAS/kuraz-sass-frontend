import Axios from "./Axios";

export const csrfCatch = async () => {
  const response = await Axios.get("/sanctum/csrf-cookie");

  return response;
};
