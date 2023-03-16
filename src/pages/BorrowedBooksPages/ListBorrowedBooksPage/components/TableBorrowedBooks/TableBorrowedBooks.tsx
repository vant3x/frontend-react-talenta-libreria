import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../../../../components/shared/Loader/Loader";
import { Tooltip } from "../../../../../components/shared/Tooltip";
import axiosClient from "../../../../../config/axios";
import appContext from "../../../../../context/app/appContext";
import { AppContextType } from "../../../../../interfaces/AppContextType";
import { BorrowedBook } from "../../../../../interfaces/BorrowedBooks.interface";
import "./styles/TableBorrowedBooks.css";

export interface TableBorrowedBooksProps {
  data: BorrowedBook[];
  handleSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
  getBorrowedBooks: () => void;
}

const TableBorrowedBooks: React.FC<TableBorrowedBooksProps> = ({
  loading,
  data,
  getBorrowedBooks
}) => {

  const AppContext = useContext<AppContextType>(appContext);
  const { returnBorrowedBook, borrowedBookMessage } = AppContext;


  const router = useNavigate();

  const deleteBorrowedBook = async (id: number | string) => {
    await axiosClient.delete(`/api/borrowed-books/delete/${id}`);
    getBorrowedBooks()

  };

  const returnAndUpdateBorrowedBook = async (id: number | string, bookId:  number | string ) => {
    const returnBook = {
        bookId,
        available: true,
        returnStatus: 'returned'
    }
    await returnBorrowedBook( returnBook, id);
    getBorrowedBooks()

  };

  const dateFormatter = (date: Date) => {
    const borrowDate = new Date(date);
    const dateString = borrowDate.toISOString().slice(0, 10);
    return dateString;
  };

  return (
    <>
      <div className="wrapper">
        <div className="container">
          <div className="table">
            <table cellSpacing="0" cellPadding="0">
              <thead className="header__borrowed__books">
                <tr>
                  <td colSpan={2}>
                    <p className="headers">Lista de prestamos</p>{" "}
                  </td>
                </tr>
                <tr className="header__borrowed__books">
                  <td>Nro</td>

                  <td>Libro prestado</td>
                  <td>Cliente</td>
                  <td>Fecha del prestamo: </td>
                  <td>Fecha de devolución: </td>
                  <td>Estado del prestamo: </td>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? "" : "primary"}>
                    <td>{index + 1}</td>

                    <td>
                      <p>
                        {" "}
                        <span className="title">Título:</span>{" "}
                        {item.book?.title}{" "}
                      </p>
                      <p>
                        {" "}
                        <span className="title">Autor:</span>{" "}
                        {item.book?.author}{" "}
                      </p>
                    </td>
                    <td>
                      <p>
                        {item.user?.name} {item.user?.lastname}
                      </p>
                      <a href={`mailto:${item.user?.email}`}>
                        {item.user?.email}
                      </a>
                    </td>
                    <td className="border">
                      {dateFormatter(item.borrowDate as Date)}
                    </td>
                    <td className="border">
                      {dateFormatter(item.returnDate as Date)}
                    </td>
                    <td>
                      {" "}
                      <span
                        className={`book__status ${
                          item.returnStatus === "pending"
                            ? "book__status-pending"
                            : "book__status-returned"
                        }`}
                      >
                        {item.returnStatus === "pending"
                          ? "Pendiente"
                          : "Devuelto"}
                      </span>{" "}
                    </td>
                    <td>
                      <button
                      className="table__buttons-return-book"
                          onClick={() => returnAndUpdateBorrowedBook(item.id, item.bookId) }
                          >
                        Devolver libro
                      </button>
                    </td>

                  {/*
                    <td>
                      <Tooltip text="Eliminar reserva">
                        <button
                          className="table__buttons-delete"
                          onClick={() => deleteBorrowedBook(item.id)}
                        >
                 
                          <FontAwesomeIcon
                            icon={faTrash}
                          
                          />
                        </button>
                      </Tooltip>
                    </td>
                  */}
                  </tr>
                ))}
              </tbody>
            </table>
            {loading && (
              <div className="center-loader">
                <Loader />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TableBorrowedBooks;
