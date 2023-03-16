import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import appContext from "../../../../context/app/appContext";
import { AppContextType } from "../../../../interfaces/AppContextType";
import Alert from "../../../../components/shared/Alerts/Alert";
import { Loader } from "../../../../components/shared/Loader/Loader";
import "./../styles/NewAndEditUserForm.css";
import { User } from "../../../../interfaces/User.interface";
import axiosClient from "../../../../config/axios";

export interface EditUserFormProps {
  id: string;
}

const EditUserForm: React.FC<EditUserFormProps> = ({id}) => {
  const [loading, setLoading] = useState(false);
  const [cleanAlert, setCleanAlert] = useState(false);
  const [userById, setUserById] = useState<User>();

  const AppContext = useContext<AppContextType>(appContext);
  const { updateUser, userMessage } = AppContext;

  const router = useNavigate();

  const getUserkById = async () => {
    try {
      const bookByIdResponse = await axiosClient.get(`/api/users/${id}`);
      if (bookByIdResponse && bookByIdResponse.data) {
        setUserById(bookByIdResponse.data as User);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserkById();
  }, []);

  // formulario y validacion con formik y yup
  const formik = useFormik({
    initialValues: {
      name: userById?.name,
      lastname: userById?.lastname,
      email: userById?.email,
      phone: userById?.phone,
    },
    validationSchema: Yup.object({
      name: Yup.string(),
      lastname: Yup.string(),
      email: Yup.string()
        .email("No es un email válido"),
      phone: Yup.string(),
    }),
    onSubmit: async (values) => {
		setLoading(true);
    await updateUser(values, id);
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
      {userMessage.status === 201 && cleanAlert || (userMessage.status === 200 && cleanAlert) ? (
        <Alert message="Actualizo con exito" type="success" />
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
                defaultValue={userById?.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete="name"
                required
              />
        
              <label htmlFor="lastname" className="newuser__label">
                Apellido: 
              </label>
              <input
                type="text"
                id="lastname"
                placeholder="Ingresa el apellido"
                className="newuser__input"
                name="lastname"
                defaultValue={userById?.lastname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete="lastname"
              />
              
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
                defaultValue={userById?.email}
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
                defaultValue={userById?.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.phone && formik.errors.phone ? (
                <Alert message={formik.errors.phone} type="error" />
              ) : null}

              <br />

              <button type="submit" className="primary__button">
                Actualizar  usuario
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default EditUserForm;
