import { faBook, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../../config/axios";
import { BorrowedBook } from "../../../interfaces/BorrowedBooks.interface";
import { TableBorrowedBooks } from "./components/TableBorrowedBooks";
import "./styles/ListBorrowedBooksPage.css";

export interface ListBorrowedBooksPageProps {}

const ListBorrowedBooksPage: React.FC<ListBorrowedBooksPageProps> = () => {
	const [loading, setLoading] = useState(false);
	const [allBorrowedBooks, setAllBorrowedBooks] = useState<BorrowedBook[]>([]);

	const router = useNavigate();


	const getBorrowedBooks = async () => {
		try {
		  setLoading(true);
		  const borrowedBooksData = await axiosClient.get("/api/borrowed-books");
		  setLoading(false);
	
		  if (borrowedBooksData && borrowedBooksData.data) {
			setAllBorrowedBooks(borrowedBooksData.data as BorrowedBook[]);
		  }
		} catch (err) {
		  console.log(err);
		}
	  };
	
	  useEffect(() => {
		getBorrowedBooks()
	  }, []);
	  

	return (
    <div className="list__borrowed__books">
      <h2 className="libros__heading">
        <FontAwesomeIcon icon={faBook} className="icon-margin" /> Gestionar los prestamos de libros
      </h2>
	  <button
        onClick={() => router("/nuevo-prestamo")}
        className="normal__button"
      >      <FontAwesomeIcon icon={faUserPlus} className="icon-margin" />   Gestionar prestamo        

      </button>
	  <TableBorrowedBooks data={allBorrowedBooks} loading={loading} />
    </div>
  );
};

export default ListBorrowedBooksPage;
