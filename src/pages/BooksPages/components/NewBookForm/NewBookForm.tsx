import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { NavLink, useNavigate } from "react-router-dom";

import { Loader } from "../../../../components/shared/Loader/Loader";

import "./../styles/NewBookForm.css";
import Alert from "../../../../components/shared/Alerts/Alert";
import appContext from "../../../../context/app/appContext";
import { BookDetail } from "../../../../interfaces/BookDetail.interface";
import axiosClient from "../../../../config/axios";
export interface NewBookFormProps {}

const NewBookForm: React.FC<NewBookFormProps> = () => {
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [cleanAlert, setCleanAlert] = useState(false);

  const AppContext = useContext(appContext);
  const { newBook, setBook, book, message } = AppContext;

  const router = useNavigate();

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file: File | null = event.target.files ? event.target.files[0] : null;
    setSelectedFile(file);
  };

  const handleNewBook = async (book: BookDetail) => {
    const formData = new FormData();
    setLoading(true);
    if (book) {
      Object.entries(book)
        .filter(([key, value]) => value)
        .forEach(([key, value]) => formData.append(key, value));
      if (selectedFile) {
        formData.append("image", selectedFile);
      }
      await newBook(formData);
      setLoading(false);
    }
  };

  // formulario y validacion con formik y yup
  const formik = useFormik({
    initialValues: {
      title: "",
      author: "",
      bookPublisher: "",
      bookDate: "",
      ISBN: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("El título del libro es obligatorio"),
      author: Yup.string().required("El nombre del autor es obligatorio"),
      bookPublisher: Yup.string(),
      bookDate: Yup.date().required("La fecha de publicación es obligatoria"),
      ISBN: Yup.string().required("El ISBN es obligatorio"),
    }),
    onSubmit: (values) => {
      handleNewBook(values);
    },
  });

  useEffect(() => {
    setCleanAlert(true);
    const timer = setTimeout(() => {
      setCleanAlert(false);
      if (message.status === 201 && !cleanAlert || message.status === 200 && !cleanAlert) {
        //router("/");
      }
    }, 6000);
    return () => clearTimeout(timer);
  }, [message]);

  return (
    <div className="new__book-form">
      {message.status === 201 || (message.status === 200 && cleanAlert) ? (
        <Alert message="Registro exitoso" type="success" />
      ) : null}

      {message.status === 500 && cleanAlert ? (
        <Alert message="No se pudo registrar el libro :(" type="error" />
      ) : null}
      <form onSubmit={formik.handleSubmit} className="newbook__form">
        {loading && (
          <div className="center-loader">
            <Loader />
          </div>
        )}
        {!loading && (
          <div className="newbook__form-container">
            <div className="newbook__basic-info">
              <label htmlFor="title" className="newbook__label">
                Nombre del libro: *
              </label>
              <input
                type="text"
                id="title"
                className="newbook__input"
                placeholder="Ingresa el nombre del libro"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete="title"
                required
              />
              {formik.touched.title && formik.errors.title ? (
                <Alert message={formik.errors.title} type="error" />
              ) : null}
              <label htmlFor="author" className="newbook__label">
                Autor: *
              </label>
              <input
                type="text"
                id="author"
                placeholder="Ingresa el nombre del autor"
                className="newbook__input"
                name="author"
                value={formik.values.author}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete="author"
                required
              />
              {formik.touched.author && formik.errors.author ? (
                <Alert message={formik.errors.author} type="error" />
              ) : null}
              <label htmlFor="bookPublisher" className="newbook__label">
                Editorial: (opcional)
              </label>
              <input
                type="text"
                id="bookPublisher"
                className="newbook__input"
                name="bookPublisher"
                value={formik.values.bookPublisher}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label htmlFor="bookDate" className="newbook__label">
                Fecha de publicación:
              </label>
              <input
                type="date"
                name="bookDate"
                value={formik.values.bookDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="newbook__input"
              />
              {formik.touched.bookDate && formik.errors.bookDate ? (
                <Alert message={formik.errors.bookDate} type="error" />
              ) : null}
            </div>
            <div className="newbook__auth-info">
              <label htmlFor="isbn" className="newbook__label">
                ISBN: *
              </label>
              <input
                type="text"
                id="isbn"
                className="newbook__input"
                placeholder="Ingresa el ISBN del libro"
                name="ISBN"
                value={formik.values.ISBN}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                maxLength={13}
              />
              {formik.touched.ISBN && formik.errors.ISBN ? (
                <Alert message={formik.errors.ISBN} type="error" />
              ) : null}

              <br />
              <label htmlFor="image" className="newbook__label">
                Selecciona una imagen de portada:
              </label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleFileInputChange}
              />

              <button type="submit" className="primary__button">
                Registrar libro
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default NewBookForm;
