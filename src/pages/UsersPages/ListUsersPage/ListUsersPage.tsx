import { faUser, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../../config/axios";
import { User } from "../../../interfaces/User.interface";
import { TableUsers } from "./components/TableUsers";
import "./styles/ListUsersPage.css";

export interface ListUsersPageProps {}

const ListUsersPage: React.FC<ListUsersPageProps> = () => {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const router = useNavigate();

  const getUsers = async () => {
    try {
      setLoading(true);
      const usersData = await axiosClient.get("/api/users");
      setLoading(false);

      if (usersData && usersData.data) {
        setAllUsers(usersData.data as User[]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="list__users">
		      <h2 className="libros__heading">
        {" "}
        <FontAwesomeIcon icon={faUser} className="icon-margin" /> Gestionar usuarios </h2>
      <button
        onClick={() => router("/crear-usuario")}
        className="normal__button"
      >
      <FontAwesomeIcon icon={faUserPlus} className="icon-margin" />   Registrar un usuario         

      </button>
      <TableUsers data={allUsers} loading={loading} getUsers={getUsers} />
    </div>
  );
};

export default ListUsersPage;
