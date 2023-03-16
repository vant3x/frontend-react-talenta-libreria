import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import appContext from "../../../../context/app/appContext";
import { AppContextType } from "../../../../interfaces/AppContextType";
import Alert from "../../../../components/shared/Alerts/Alert";
import { Loader } from "../../../../components/shared/Loader/Loader";
import "./../styles/NewAndEditUserForm.css";

export interface NewUserFormProps {}

const NewUserForm: React.FC<NewUserFormProps> = () => {
  const [loading, setLoading] = useState(false);
  const [cleanAlert, setCleanAlert] = useState(false);

  const AppContext = useContext<AppContextType>(appContext);
  const { newUser, userMessage } = AppContext;

  const router = useNavigate();

  // formulario y validacion con formik y yup
  const formik = useFormik({
    initialValues: {
      name: "",
      lastname: "",
      email: "",
      phone: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("El nombre es obligatorio"),
      lastname: Yup.string(),
      email: Yup.string()
        .required("El email es obligatorio")
        .email("No es un email válido"),
      phone: Yup.string().required("El número de telefono es obligatorio"),
    }),
    onSubmit: async (values) => {
		setLoading(true);
		await newUser(values);
		setLoading(false);
    },
  });

  useEffect(() => {
    setCleanAlert(true);
    const timer = setTimeout(() => {
      setCleanAlert(false);
      if (userMessage.status === 201 && !cleanAlert || userMessage.status === 200 && !cleanAlert) {
        //router("/");
      }
    }, 6000);
    return () => clearTimeout(timer);
  }, [userMessage]);

  return (
    <div className="new__user-form">
      {userMessage.status === 201 || (userMessage.status === 200 && cleanAlert) ? (
        <Alert message="Registro exitoso" type="success" />
      ) : null}

      {userMessage.status === 500 && cleanAlert ? (
        <Alert message="No se pudo registrar el usuario :(" type="error" />
      ) : null}
      <form onSubmit={formik.handleSubmit} className="newuser__form">
        {loading && (
          <div className="center-loader">
            <Loader />
          </div>
        )}
        {!loading && (
          <div className="newuser__form-container">
            <div className="newuser__basic-info">
              <label htmlFor="name" className="newuser__label">
                Nombre del usuario: *
              </label>
              <input
                type="text"
                id="name"
                className="newuser__input"
                placeholder="Ingresa el nombre del usuario"
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
              <label htmlFor="lastname" className="newuser__label">
                Apellido: 
              </label>
              <input
                type="text"
                id="lastname"
                placeholder="Ingresa el apellido"
                className="newuser__input"
                name="lastname"
                value={formik.values.lastname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete="lastname"
              />
              {formik.touched.lastname && formik.errors.lastname ? (
                <Alert message={formik.errors.lastname} type="error" />
              ) : null}
            </div>
            <div className="newuser__info">
              <label htmlFor="email" className="newuser__label">
                Email: *
              </label>
              <input
                type="emailt"
                id="email"
                className="newuser__input"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
			          {formik.touched.email && formik.errors.email ? (
                <Alert message={formik.errors.email} type="error" />
              ) : null}
              <label htmlFor="phone" className="newuser__label">
                Número de teléfono: *
              </label>
              <input
                type="tel"
                id="phone"
                className="newuser__input"
                placeholder="Ingresa el numero"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.phone && formik.errors.phone ? (
                <Alert message={formik.errors.phone} type="error" />
              ) : null}

              <br />

              <button type="submit" className="primary__button">
                Registrar  usuario
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default NewUserForm;
