import React, { useEffect, useState } from "react";
import axiosClient from "../config/axios";
import { useNavigate } from "react-router-dom";

const useAuthChecker = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [error, setError] = useState<null | string>(null);
  const router = useNavigate();

  useEffect(() => {
    const requestInterceptor = axiosClient.interceptors.response.use(
      (response) => response,
      (error) => {
        if (
          error.response &&
          error.response.status === 401 &&
          localStorage.getItem("token")
        ) {
          setError("Sesión expirada o error de autenticación");
          setTimeout(() => {
            localStorage.removeItem("token");
            router("/login");
          }, 4000);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosClient.interceptors.response.eject(requestInterceptor);
    };
  }, []);

  return error;
};

export default useAuthChecker;
