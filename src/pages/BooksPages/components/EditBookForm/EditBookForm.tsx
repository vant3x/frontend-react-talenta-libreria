import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { NavLink, useNavigate } from "react-router-dom";

import { Loader } from "../../../../components/shared/Loader/Loader";

import Alert from "../../../../components/shared/Alerts/Alert";
import appContext from "../../../../context/app/appContext";
import { BookDetail } from "../../../../interfaces/BookDetail.interface";
import axiosClient from "../../../../config/axios";
import "./../styles/NewBookForm.css";
import { AxiosResponse } from "axios";

export interface EditBookFormProps {
  id: string;
}

const EditBookForm: React.FC<EditBookFormProps> = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const [bookById, setBookById] = useState<BookDetail>({
    title: "",
    author: "",
    bookPublisher: "",
    bookDate: "",
    ISBN: "",
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [cleanAlert, setCleanAlert] = useState(false);

  const AppContext = useContext(appContext);
  const { updateBook, setBook, book, message } = AppContext;

  const router = useNavigate();

  const getBookById = async () => {
    try {
      const bookByIdResponse = await axiosClient.get(`/api/books/${id}`);
      if (bookByIdResponse && bookByIdResponse.data) {
        setBookById(bookByIdResponse.data as BookDetail);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getBookById();
  }, []);

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file: File | null = event.target.files ? event.target.files[0] : null;
    setSelectedFile(file);
  };

  const handleEditBook = async (book: BookDetail) => {
    const formData = new FormData();
    if (book) {
      Object.entries(book)
        .filter(([key, value]) => value)
        .forEach(([key, value]) => formData.append(key, value));
      if (selectedFile) {
        formData.append("image", selectedFile);
      }
      setLoading(true);
      await updateBook(formData, id);
      setLoading(false);
    }
  };

  // formulario y validacion con formik y yup
  const formik = useFormik({
    initialValues: {
      title: bookById?.title,
      author: bookById?.author,
      bookPublisher: bookById.bookPublisher,
      bookDate: bookById.bookDate,
      ISBN: bookById.ISBN,
    },
    validationSchema: Yup.object({
      title: Yup.string(),
      author: Yup.string(),
      bookPublisher: Yup.string(),
      bookDate: Yup.date(),
      ISBN: Yup.string(),
    }),
    onSubmit: (values) => {
      console.log(values);
      handleEditBook(values);
    },
  });

  useEffect(() => {
    setCleanAlert(true);
    const timer = setTimeout(() => {
      setCleanAlert(false);
      if (
        (message.status === 201 && !cleanAlert) ||
        (message.status === 200 && !cleanAlert)
      ) {
        //router("/");
      }
    }, 6000);
    return () => clearTimeout(timer);
  }, [message]);

  return (
    <div className="new__book-form">
      {message.status === 201 || (message.status === 200 && cleanAlert) ? (
        <Alert message="Se actualizó con exito" type="success" />
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
                defaultValue={bookById?.title}
                onChange={formik.handleChange}
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
                defaultValue={bookById?.author}
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
                defaultValue={bookById?.bookPublisher}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label htmlFor="bookDate" className="newbook__label">
                Fecha de publicación:
              </label>
              <input
                type="date"
                name="bookDate"
                value={bookById.bookDate?.toString()}
                onChange={formik.handleChange}
                className="newbook__input"
              />
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
                defaultValue={bookById.ISBN}
                onChange={formik.handleChange}
                required
              />

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
                Actualizar libro
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default EditBookForm;
