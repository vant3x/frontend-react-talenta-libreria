import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./styles/NewBorrowedBookForm.css";
import appContext from "../../../../../context/app/appContext";
import { AppContextType } from "../../../../../interfaces/AppContextType";
import { Loader } from "../../../../../components/shared/Loader/Loader";
import Alert from "../../../../../components/shared/Alerts/Alert";
import axiosClient from "../../../../../config/axios";
import { User } from "../../../../../interfaces/User.interface";
import { BookDetail } from "../../../../../interfaces/BookDetail.interface";
import { BorrowedBook } from "../../../../../interfaces/BorrowedBooks.interface";
export interface NewBorrowedBookFormProps {}

const NewBorrowedBookForm: React.FC<NewBorrowedBookFormProps> = () => {
  const AppContext = useContext<AppContextType>(appContext);
  const { newBorrowedBook, borrowedBookMessage } = AppContext;

  const [loading, setLoading] = useState(false);
  const [cleanAlert, setCleanAlert] = useState(false);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [allBooks, setAllBooks] = useState<BookDetail[]>([]);
  const [bookAvailabilityState, setBookAvailability] = useState(true);

  const verifyBookAvailabilityAndUpdate = async (values: BorrowedBook) => {
    setLoading(true);
    const bookAvailability = await axiosClient.get(
      `/api/borrowed-books/check-book-availability/${values.bookId}`
    );

    if (bookAvailability.data) {
      newBorrowedBook(values);
	  setBookAvailability(true);

    } else {
		setBookAvailability(false);
    }

    setLoading(false);
  };

  const formik = useFormik({
    initialValues: {
      userId: "",
      bookId: "",
      borrowDate: "",
      returnDate: "",
    },
    validationSchema: Yup.object({
      userId: Yup.string().required("El usuario es obligatorio"),
      bookId: Yup.string().required("El libro es obligatorio"),
      borrowDate: Yup.date().required("La fecha de prestamo es obligatoria"),
      returnDate: Yup.date().required("El número de telefono es obligatorio"),
    }),
    onSubmit: async (values) => {
      verifyBookAvailabilityAndUpdate(values);
    },
  });

  const getUsers = async () => {
    try {
      setLoading(true);
      const usersData = await axiosClient.get("/api/users");
      setLoading(false);

      if (usersData && usersData.data) {
        setAllUsers(usersData.data as User[]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getBooks = async () => {
    try {
      setLoading(true);
      const booksData = await axiosClient.get("/api/books");
      setLoading(false);

      if (booksData && booksData.data) {
        setAllBooks(booksData.data as BookDetail[]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUsers();
    getBooks();
  }, []);

  useEffect(() => {
    setCleanAlert(true);
    const timer = setTimeout(() => {
      setCleanAlert(false);
      if (
        (borrowedBookMessage.status === 201 && !cleanAlert) ||
        (borrowedBookMessage.status === 200 && !cleanAlert)
      ) {
        //router("/");
      }
    }, 6000);
    return () => clearTimeout(timer);
  }, [borrowedBookMessage, bookAvailabilityState]);

  return (
    <div className="new__user-form">
      {borrowedBookMessage.status === 201 ||
      (borrowedBookMessage.status === 200 && cleanAlert) ? (
        <Alert message="Registro exitoso" type="success" />
      ) : null}

      {borrowedBookMessage.status === 500 && cleanAlert ? (
        <Alert message="No se pudo registrar el prestamo  :(" type="error" />
      ) : null}

      {!bookAvailabilityState && cleanAlert ? (
        <Alert message="No se pudo registrar el prestamo por que el libro no está disponible :(" type="error" />
      ) : null}

      <form onSubmit={formik.handleSubmit} className="borrowed__book__form">
        {loading && (
          <div className="center-loader">
            <Loader />
          </div>
        )}
        {!loading && (
          <div className="borrowed__book__form-container">
            <div className="borrowed__book__basic-info">
              <label htmlFor="name" className="borrowed__book__label">
                Nombre del usuario que va a realizar el prestamo: *
              </label>

              <select
                name="userId"
                value={formik.values.userId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete="name"
                required
                className="borrowed__book__input"
              >
                <option value="" disabled defaultValue="">
                  Seleccione un usuario
                </option>

                {allUsers.map((user) => (
                  <option value={user.id} key={user.id}>
                    {user.name} {user.lastname}{" "}
                  </option>
                ))}
              </select>

              {formik.touched.userId && formik.errors.userId ? (
                <Alert message={formik.errors.userId} type="error" />
              ) : null}
              <label htmlFor="bookId" className="borrowed__book__label">
                Selecciona el libro que se va a prestar
              </label>
              <select
                name="bookId"
                value={formik.values.bookId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete="name"
                required
                className="borrowed__book__input"
              >
                <option value="" disabled defaultValue="">
                  Seleccione un libro
                </option>

                {allBooks.map((book) => (
                  <option value={book.id} key={book.id}>
                    {book.title} de {book.author}
                  </option>
                ))}
              </select>

              {formik.touched.bookId && formik.errors.bookId ? (
                <Alert message={formik.errors.bookId} type="error" />
              ) : null}
            </div>
            <div className="borrowed__book__info">
              <label htmlFor="bookDate" className="newbook__label">
                Fecha de prestamo:
              </label>
              <input
                type="date"
                name="borrowDate"
                value={formik.values.borrowDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="newbook__input"
              />
              {formik.touched.borrowDate && formik.errors.borrowDate ? (
                <Alert message={formik.errors.borrowDate} type="error" />
              ) : null}

              <label htmlFor="bookDate" className="newbook__label">
                Fecha de devolución estimada, esta fecha se actualizará luego:
              </label>
              <input
                type="date"
                name="returnDate"
                value={formik.values.returnDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="newbook__input"
              />
              {formik.touched.returnDate && formik.errors.returnDate ? (
                <Alert message={formik.errors.returnDate} type="error" />
              ) : null}

              <br />

              <button type="submit" className="primary__button">
                Registrar prestamo
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default NewBorrowedBookForm;
