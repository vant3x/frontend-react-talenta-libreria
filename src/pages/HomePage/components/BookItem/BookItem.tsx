import React from "react";
import { BookDetail } from "../../../../interfaces/BookDetail.interface";
import "./styles/BookItem.css";
export interface BookDetailProps {
  bookInfo: BookDetail;
}

const BookItem: React.FC<BookDetailProps> = ({ bookInfo }) => {
  return (
    <>
      <article className="libro">
        <div className="libro__contenido">
          <h3 className="libro__nombre">{bookInfo.title}</h3>
          {bookInfo.image && (
            <img
              className="libro__imagen"
              src={bookInfo.image}
              alt="portada libro"
            />
          )}
             <p className="libro__author">
            {" "}
            <span className="libro__titulos">Fecha de publicación: </span> {bookInfo.bookDate}
          </p>
          <p className="libro__author">
            {" "}
            <span className="libro__titulos">Autor: </span> {bookInfo.author}
          </p>
          <a className="libro__enlace" href="">
            Ver libro
          </a>
        </div>
      </article>
    </>
  );
};

export default BookItem;
