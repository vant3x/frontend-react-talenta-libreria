import { faBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AxiosResponse } from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";
import axiosClient from "../../../config/axios";
import appContext from "../../../context/app/appContext";
import { AppContextType } from "../../../interfaces/AppContextType";
import { BookDetail } from "../../../interfaces/BookDetail.interface";
import { TableBooks } from "../components/TableBooks";
import useBookSearch from "../../../hooks/useBooksSearch";
import "./styles/ListBooksPage.css";

export interface ListBooksPageProps {}

const ListBooksPage: React.FC<ListBooksPageProps> = () => {
  // context de la app
  const AppContext = useContext<AppContextType>(appContext);
  const { booksSearched, setBooksSearched } = AppContext;
  const [allBooks, setAllBooks] = useState<BookDetail[]>([]);
  const [loading, setLoading] = useState(false);

  // hook de busqueda
  const optimizedFnSearchs = useBookSearch();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;
    optimizedFnSearchs(search);
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
    getBooks();
  }, []);

  useEffect(() => {
    return setAllBooks(booksSearched);
  }, [booksSearched]);

  return (
    <>
      <h2 className="libros__heading">
        <FontAwesomeIcon icon={faBook} className="icon-margin" /> Gestionar
        libros{" "}
      </h2>
      <div className="libros_containers	"></div>
      <TableBooks
        data={allBooks}
        loading={loading}
        handleSearch={handleInputChange}
      />
    </>
  );
};

export default ListBooksPage;
