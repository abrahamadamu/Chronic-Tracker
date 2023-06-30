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

newAxios.interceptors.response.use(
  (config) => config,
  (error) => {
    if (error.response.status === 401) {
      window.location.replace("/login");
    }

    return Promise.reject(error);
  }
);

export default newAxios;
