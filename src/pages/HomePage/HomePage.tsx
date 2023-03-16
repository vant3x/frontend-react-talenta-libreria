import React, { useContext, useEffect, useState } from "react";
import axiosClient from "../../config/axios";
import appContext from "../../context/app/appContext";
import { AppContextType } from "../../interfaces/AppContextType";
import { BookDetail } from "../../interfaces/BookDetail.interface";
import { BookItem } from "./components/BookItem";
import { SearchBooksBar } from "./components/SearchBooksBar";
import "./styles/HomePage.css";
export interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {

  // context de la app
  const AppContext = useContext<AppContextType>(appContext);
  const { booksSearched, setBooksSearched } = AppContext;

  const [allBooks, setAllBooks] = useState<BookDetail[]>([]);
  const [loading, setLoading] = useState(false);

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
    <div className="homepage">
      <h2 className="libros__heading">Nuestra Colección</h2>
	  <SearchBooksBar/>
      <div className="libros__grid">
        {allBooks.length >= 1 &&
          allBooks.map((book) => <BookItem bookInfo={book} key={book.id} />)}
        {allBooks.length < 1 && <>No hay libros en el momento</>}
      </div>
    </div>
  );
};

export default HomePage;
