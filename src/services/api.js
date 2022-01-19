import axios from "axios";
import * as jwtDecode from "jwt-decode";
import { API_BASE_URL, ACCESS_TOKEN } from "./constantes";

export const getToken = () => localStorage.getItem(ACCESS_TOKEN);

const getTokenDecoded = () => {
  let tokenDecoded;

  try {
    tokenDecoded = jwtDecode(getToken());
  } catch (err) {
    localStorage.removeItem(ACCESS_TOKEN);
    return "";
  }

  return tokenDecoded;
};

export const isAuthenticated = () => {
  if (getToken() !== null) {
    const tokenDecoded = getTokenDecoded();

    if (tokenDecoded instanceof Object) {
      const now = new Date().getTime();
      return tokenDecoded.exp > now / 1000;
    }
  }

  return false;
};

export const api = () => {
  const api1 = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      "content-type": "application/json",
    },
  });

  // Add a request interceptor
  api1.interceptors.request.use(
    (config) => {
      const token = getToken();

      if (token != null) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  api1.interceptors.response.use(
    (response) => {
      // Any status code that lie within the range of 2xx cause this function to trigger
      return response.data;
    },
    (error) => {
      if (error?.response?.data && error?.response?.status) {
        if (error.response.status === 500) {
        }
      }
      return Promise.reject(error);
    }
  );

  return api1;
};

