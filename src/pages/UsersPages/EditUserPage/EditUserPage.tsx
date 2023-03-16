import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useParams } from "react-router-dom";
import EditUserForm from "../components/EditUserForm/EditUserForm";
import "./styles/EditUserPage.css";
export interface EditUserPageProps {}

const EditUserPage: React.FC<EditUserPageProps> = () => {
  const params = useParams<{ id?: string }>();

  return (
    <>
      <h2 className="libros__heading">
        <FontAwesomeIcon icon={faUserPlus} className="icon-margin" /> Edita este
        usuario
      </h2>
      {params?.id && <EditUserForm id={params.id} />}{" "}
    </>
  );
};
export default EditUserPage;
