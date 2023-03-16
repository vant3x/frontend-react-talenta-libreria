import React, { useReducer } from "react";
import appContext from "./appContext";
import appReducer from "./appReducer";

import {
  SHOW_ALERTS,
  REMOVE_ALERTS,
  NEW_BOOK,
  NEW_BOOK_SUCCESS,
  NEW_BOOK_ERROR,
  UPDATE_BOOK,
  UPDATE_BOOK_SUCCESS,
  UPDATE_BOOK_ERROR,
  SET_BOOKS_SEARCHED,
  NEW_USER,
  NEW_USER_ERROR,
  NEW_USER_SUCCESS,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  NEW_BORROWED_BOOK,
  NEW_BORROWED_BOOK_SUCCESS,
  NEW_BORROWED_BOOK_ERROR,
  RETURN_BORROWED_BOOK,
  RETURN_BORROWED_BOOK_SUCCESS,
  RETURN_BORROWED_BOOK_ERROR,
  RESET_STATE,
  SET_BOOK,
} from "../../types";
import axiosClient from "../../config/axios";
import { BookDetail } from "../../interfaces/BookDetail.interface";
import { AxiosError } from "axios";
import { User } from "../../interfaces/User.interface";
import { BorrowedBook } from "../../interfaces/BorrowedBooks.interface";
import { returnBorrowedBookData } from "../../interfaces/return-borrowed-book.interface";

type Props = {
  children: React.ReactNode;
}

type ErrorResponse = {
  error: string
  status: number
};

const AppState = ({ children }: Props) => {
  const initialState = {
    message: {},
    userMessage: {},
    book: {},
    user: {},
    borrowedBookMessage: {},
    borrowedBook: {},
    loading: false,
    alertMessage: null,
    booksSearched: []
  };

  // crear dispatch y state
  const [state, dispatch] = useReducer(appReducer, initialState);

  // toast alerts
  const showAlert = (msg: string) => {
    dispatch({
      type: SHOW_ALERTS,
      payload: msg,
    });

    setTimeout(() => {
      dispatch({
        type: REMOVE_ALERTS,
      });
    }, 5000);
  };

  const newBook = async (formData: FormData) => {
    dispatch({
      type: NEW_BOOK,
    });

    try {
      const response = await axiosClient.post("/api/books", formData);

      dispatch({
        type: NEW_BOOK_SUCCESS,
        payload: {
          data: response.data.message,
          status: response.status,
        },
      });
    } catch (error: any) {
        console.log('eror formdata')
      const payload: ErrorResponse = {
        error: error.response.data.message,
        status: error.response.status,
      };
      dispatch({
        type: NEW_BOOK_ERROR,
        payload,
      });
    }
  };

  const updateBook = async (formData: FormData, id: string) => {
    dispatch({
      type: UPDATE_BOOK,
    });

    try {
      const response = await axiosClient.put(`/api/books/${id}`, formData);
      dispatch({
        type: UPDATE_BOOK_SUCCESS,
        payload: {
          data: response.data.message,
          status: response.status,
        },
      });
    } catch (error: any) {
      const payload = {
        error: error.response.data.message,
        status: error.response.status,
      };
      dispatch({
        type: UPDATE_BOOK_ERROR,
        payload,
      });
    }
  };
  const resetState = () => {
    dispatch({
      type: RESET_STATE,
    });
  };

  //  Agregue el book
  const setBook = (book: Partial<BookDetail>) => {
    dispatch({
      type: SET_BOOK,
      payload: book,
    });
  };


  // set books de la busqueda
  const setBooksSearched = (books: BookDetail[]) => {
      dispatch({
        type: SET_BOOKS_SEARCHED,
        payload: books
      })
  }

  //  users
  const newUser = async (userData: User) => {
    dispatch({
      type: NEW_USER,
    });

    try {
      const response = await axiosClient.post("/api/users/new-user", userData);
      dispatch({
        type: NEW_USER_SUCCESS,
        payload: {
          data: response.data.message,
          status: response.status,
        },
      });
    } catch (error: any) {
      const payload: ErrorResponse = {
        error: error.response.data.message,
        status: error.response.status,
      };
      dispatch({
        type: NEW_USER_ERROR,
        payload,
      });
    }
  };

  const updateUser = async (userData: User, id: string)  => {
    dispatch({
      type: UPDATE_USER,
    });

    try {
      const response = await axiosClient.put(`/api/users/${id}`, userData);
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: {
          data: response.data.message,
          status: response.status,
        },
      });
    } catch (error: any) {
      const payload = {
        error: error.response.data.message,
        status: error.response.status,
      };
      dispatch({
        type: UPDATE_USER_ERROR,
        payload,
      });
    }
  };

  const newBorrowedBook = async (borrowedBook: BorrowedBook) => {
    dispatch({
      type: NEW_BORROWED_BOOK,
    });

    try {
      const response = await axiosClient.post("/api/borrowed-books/new-borrowed-book", borrowedBook);
      dispatch({
        type: NEW_BORROWED_BOOK_SUCCESS,
        payload: {
          data: response.data.message,
          status: response.status,
        },
      });
    } catch (error: any) {
      const payload: ErrorResponse = {
        error: error.response.data.message,
        status: error.response.status,
      };
      dispatch({
        type: NEW_BORROWED_BOOK_ERROR,
        payload,
      });
    }
  };

  const returnBorrowedBook = async (borrowedBook: returnBorrowedBookData, id: string | number) => {
    dispatch({
      type: RETURN_BORROWED_BOOK,
    });

    try {
      const response = await axiosClient.put(`/api/borrowed-books/return-borrowed-book/${id}`, borrowedBook);
      dispatch({
        type: RETURN_BORROWED_BOOK_SUCCESS,
        payload: {
          data: response.data.message,
          status: response.status,
        },
      });
    } catch (error: any) {
      const payload: ErrorResponse = {
        error: error.response.data.message,
        status: error.response.status,
      };
      dispatch({
        type: RETURN_BORROWED_BOOK_ERROR,
        payload,
      });
    }
  };

  return (
    <appContext.Provider
      value={{
        loading: state.loading,
        message: state.message,
        userMessage: state.userMessage,
        book: state.book,
        user: state.user,
        borrowedBook: state.borrowedBook,
        alertMessage: state.alertMessage,
        booksSearched: state.booksSearched,
        borrowedBookMessage: state.borrowedBookMessage,       
        showAlert,
        newBook,
        updateBook,
        newUser,
        updateUser,
        newBorrowedBook,
        returnBorrowedBook,
        setBooksSearched,
        resetState,
        setBook,
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export default AppState;
