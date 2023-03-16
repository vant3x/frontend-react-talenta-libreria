import {
  faEye,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Loader } from "../../../../components/shared/Loader/Loader";
import { BookDetail } from "../../../../interfaces/BookDetail.interface";
import { Tooltip } from "./../../../../components/shared/Tooltip";

import "./styles/TableBooks.css";

export interface TableBooksProps {
  data: BookDetail[];
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
}

const TableBooks: React.FC<TableBooksProps> = ({
  data,
  loading,
  handleSearch,
}) => {
  const router = useNavigate();

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
                        onClick={() => router(`/nuevo-prestamo/${item.id}`)}
                      >
                        Prestar
                      </button>
                    </td>
                    <td>
                      <Tooltip text="Ver este libro">
                        <button
                          onClick={() => router(`/actualizar-libro/${item.id}`)}
                        >
                          <FontAwesomeIcon
                            icon={faEye}
                            className="icon-margin"
                          />{" "}
                        </button>
                      </Tooltip>
                    </td>
                    <td>
                      <Tooltip text="Edita un libro">
                        <button
                          onClick={() => router(`/actualizar-libro/${item.id}`)}
                        >
                          <FontAwesomeIcon
                            icon={faPenToSquare}
                            className="icon-margin"
                          />
                        </button>
                      </Tooltip>
                    </td>
                    <td>
                      <Tooltip text="Elimina un libro">
                        <button className="table__buttons-delete">
                          {" "}
                          <FontAwesomeIcon
                            icon={faTrash}
                            className="icon-margin"
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
