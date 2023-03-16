import React, { useState, useContext, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { NavLink, useNavigate } from "react-router-dom";

import authContext from "../../context/auth/authContext";
import { AuthContextType } from "../../interfaces/AuthContextType";

import Alert from "../../components/shared/Alerts/Alert";
import "./styles/LoginPage.css";
import { Loader } from "../../components/shared/Loader/Loader";

export interface LoginPageProps {}

const LoginPage: React.FC<LoginPageProps> = () => {
  // definir el context
  const AuthContext = useContext<AuthContextType>(authContext);
  const { message, auth, login, errorSession } = AuthContext;

  const [loading, setLoading] = useState(false);

  const router = useNavigate();

  // formulario y validacion con formik y yup
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("No es un email válido")
        .required("El email es obligatorio"),
      password: Yup.string().required("La contraseña es obligatoria"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      await login(values);
      setLoading(false);
      console.log(values);
    },
  });

  useEffect(() => {
    if (auth) {
      router("/");
    }
  }, [auth]);

  return (
    <div className="login">
      <h2 className="libros__heading">
        Inicia sesión en tu cuenta de administrador
      </h2>
      <form onSubmit={formik.handleSubmit} className="login__form">
        {loading && (
          <div className="center-loader">
            <Loader />
          </div>
        )}
        {!loading && (
          <div className="login__form-container">
            {message ? <Alert message={message} type="error" /> : null}

            <div className="login__auth-info">
              {errorSession && errorSession.statusCode === 401 ? (
                <Alert type="error" message="Error con la sesión" />
              ) : null}

              {errorSession && errorSession.statusCode === 403 ? (
                <Alert type="error" message="Error con la sesión" />
              ) : null}
              <label htmlFor="email" className="login__label">
                Email: *
              </label>
              <input
                type="email"
                id="email"
                className="login__input"
                placeholder="tuemail@email.com"
                name="email"
                autoComplete="email"
                autoFocus
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.email && formik.errors.email ? (
                <Alert message={formik.errors.email} type="error" />
              ) : null}
              <label htmlFor="password" className="login__label">
                Password: *
              </label>
              <input
                type="password"
                id="password"
                placeholder="Ingresa tu contraseña"
                className="login__input"
                autoComplete="current-password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.password && formik.errors.password ? (
                <Alert message={formik.errors.password} type="error" />
              ) : null}
              <button type="submit" className="login__button">
                Iniciar Sesión
              </button>
              <NavLink to="/signup">¿No tienes una cuenta? Regístrate</NavLink>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default LoginPage;
