import {  faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { NewUserForm } from "../components/NewUserForm";
import "./styles/CreateUsersPage.css";
export interface CreateUsersPageProps {}

const CreateUsersPage: React.FC<CreateUsersPageProps> = () => {
  return (
    <>
      <h2 className="libros__heading">
        <FontAwesomeIcon icon={faUserPlus} className="icon-margin" /> Registra un
        nuevo usuario
      </h2>
      <NewUserForm />
    </>
  );
};

export default CreateUsersPage;
