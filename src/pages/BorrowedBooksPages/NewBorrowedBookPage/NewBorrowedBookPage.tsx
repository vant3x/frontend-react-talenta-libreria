import { faBook, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";
import { NewBorrowedBookForm } from "./components/NewBorrowedBookForm";
import "./styles/NewBorrowedBookPage.css";
export interface NewBorrowedBookPageProps {}

const NewBorrowedBookPage: React.FC<NewBorrowedBookPageProps> = () => {
  const router = useNavigate();

  return (
    <>
      <h2 className="libros__heading">
        <FontAwesomeIcon icon={faBook} className="icon-margin" /> Haz un
        prestamo
      </h2>

      <NewBorrowedBookForm />
    </>
  );
};

export default NewBorrowedBookPage;
