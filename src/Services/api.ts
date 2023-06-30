import axios from "axios";
import Auth from "./auth";

import { backend } from "Config/data";

const newAxios = axios.create({ baseURL: backend });

newAxios.interceptors.request.use((config) => {
  const accessToken = Auth.readAccessToken();
  if (accessToken) {
    config.headers.Authorization = "Bearer " + accessToken;
  }

  return config;
});

export default newAxios;
