import {
  faEye,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Loader } from "../../../../components/shared/Loader/Loader";
import axiosClient from "../../../../config/axios";
import { BookDetail } from "../../../../interfaces/BookDetail.interface";
import { Tooltip } from "./../../../../components/shared/Tooltip";

import "./styles/TableBooks.css";

export interface TableBooksProps {
  data: BookDetail[];
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
  getBooks: () => void;
}

const TableBooks: React.FC<TableBooksProps> = ({
  data,
  loading,
  handleSearch,
  getBooks
}) => {
  const router = useNavigate();

  const handleNewBorrowedBook = (bookId: string | number, bookInfo: BookDetail) => {
    const selectedBookInfo = { bookId, book: bookInfo };
    router(`/nuevo-prestamo/book/${bookId}`, { state: { selectedBookInfo } })
  }

  const deleteBook = async (id: number | string) => {
		await axiosClient.delete(`/api/books/${id}`);
		getBooks();
	}

  return (
    <>
      <div className="wrapper">
        <div className="container">
          <div className="table">
            <table cellSpacing="0" cellPadding="0">
              <thead>
                <tr>
                  <td colSpan={2}>
                    <p className="headers">Lista de libros</p>{" "}
                  </td>
                  <td colSpan={3}>
                    <input
                      className="search campo"
                      onChange={(e) => handleSearch(e)}
                      placeholder="Buscar por título o autor..."
                    />
                  </td>
                  <td colSpan={2}>
                    <NavLink to="/registrar-libro">
                      <button className="secondary__button">
                        Registrar un nuevo libro
                      </button>
                    </NavLink>
                  </td>
                </tr>
                <tr>
                  <td>Nro</td>

                  <td>Título</td>
                  <td>Autor</td>
                  <td>Fecha de publicación</td>
                  <td>Editorial</td>
                  <td>ISBN</td>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? "" : "primary"}>
                    <td>{index + 1}</td>

                    <td>{item.title}</td>
                    <td>{item.author}</td>
                    <td>{item.bookDate}</td>
                    <td>{item.bookPublisher}</td>
                    <td>{item.ISBN}</td>
                    <td>
                      <button
                      className="table__buttons-borrowed_book"
                        onClick={() => handleNewBorrowedBook(item.id, item)}
                      >
                        Prestar
                      </button>
                    </td>
                    <td>
                      <Tooltip text="Ver este libro">
                        <button
                        className="table__buttons-view"
                          onClick={() => router(`/actualizar-libro/${item.id}`)}
                        >
                          <FontAwesomeIcon
                            icon={faEye}
                          />{" "}
                        </button>
                      </Tooltip>
                    </td>
                    <td>
                      <Tooltip text="Edita un libro">
                        <button
                        className="table__buttons-edit"
                          onClick={() => router(`/actualizar-libro/${item.id}`)}
                        >
                          <FontAwesomeIcon
                            icon={faPenToSquare}
                          />
                        </button>
                      </Tooltip>
                    </td>
                    <td>
                      <Tooltip text="Elimina un libro">
                        <button className="table__buttons-delete" onClick={()=> deleteBook(item?.id)}>
                      
                          <FontAwesomeIcon
                            icon={faTrash}
                          />
                        </button>
                      </Tooltip>
                    </td>
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

export default TableBooks;
