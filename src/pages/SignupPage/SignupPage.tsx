import React, { useState, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { NavLink } from "react-router-dom";

import authContext from "../../context/auth/authContext";
import { AuthContextType } from "../../interfaces/AuthContextType";

import Alert from "../../components/shared/Alerts/Alert";
import "./styles/SignupPage.css";
import { Loader } from "../../components/shared/Loader/Loader";

export interface SignupPageProps {}

const SignupPage: React.FC<SignupPageProps> = () => {
  // definir el context
  const AuthContext = useContext<AuthContextType>(authContext);
  const { message, auth, signup, errorSession, signupStatus } = AuthContext;

  const [loading, setLoading] = useState(false);

  // formulario y validacion con formik y yup
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
      lastname: "",
      phone: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("El nombre es obligatorio"),
      lastname: Yup.string(),
      phone: Yup.string(),
      email: Yup.string()
        .email("No es un email válido")
        .required("El email es obligatorio"),
      password: Yup.string().required("La contraseña es obligatoria"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      await signup(values);
      setLoading(false);
    },
  });

  return (
    <div className="signup">
      <h2 className="libros__heading">Crea tu cuenta de administrador</h2>
      <form onSubmit={formik.handleSubmit} className="signup__form">
        {loading && (
          <div className="center-loader">
            <Loader />
          </div>
        )}
        {!loading && (
          <div className="signup__form-container">
            <div className="signup__basic-info">
              <label htmlFor="nombre" className="signup__label">
                Nombre:
              </label>
              <input
                type="text"
                id="nombre"
                className="signup__input"
                placeholder="Ingresa tu nombre"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete="name"
                required
              />
              {formik.touched.name && formik.errors.name ? (
                <Alert message={formik.errors.name} type="error" />
              ) : null}
              <label htmlFor="apellido" className="signup__label">
                Apellido:
              </label>
              <input
                type="text"
                id="apellido"
                placeholder="Ingresa tu apellido"
                className="signup__input"
                name="lastname"
                value={formik.values.lastname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete="lastname"
                required
              />
              <label htmlFor="telefono" className="signup__label">
                Teléfono: (opcional)
              </label>
              <input
                type="tel"
                id="telefono"
                className="signup__input"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete="phone"
              />
              {signupStatus === 201 && (
                <Alert message="Registro exitoso" type="success" />
              )}
            </div>
            <div className="signup__auth-info">
              <label htmlFor="email" className="signup__label">
                Email: *
              </label>
              <input
                type="email"
                id="email"
                className="signup__input"
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
              <label htmlFor="password" className="signup__label">
                Password: *
              </label>
              <input
                type="password"
                id="password"
                placeholder="Ingresa tu contraseña"
                className="signup__input"
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
              <button type="submit" className="signup__button">
                Registrarse
              </button>
              <NavLink to="/login" >¿Ya tienes una cuenta? Inicia Sesión</NavLink>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default SignupPage;
