import React from "react";
import "./styles/NotFoundPage.css";
export interface NotFoundPageProps {}

const NotFoundPage: React.FC<NotFoundPageProps> = () => {
  return (
    <div className="notfoundpage">
      {" "}
      <h2 className="libros__heading">No existe esta página :(</h2>
    </div>
  );
};

export default NotFoundPage;
