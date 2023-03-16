import React, { useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faBookAtlas,
  faHouse,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

import "./styles/Header.css";
import logoImage from "./../../../../assets/logo/logo.png";
import { AuthContextType } from "../../../../interfaces/AuthContextType";
import authContext from "../../../../context/auth/authContext";

export interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  // definir el context
  const AuthContext = useContext<AuthContextType>(authContext);
  const { message, user, logout, auth, userAuthtenticate, errorSession } =
    AuthContext;

  const router = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      userAuthtenticate();
    }
  }, []);

  const logoutUser = () => {
    router("/login");
    logout();
  };

  return (
    <>
      <header className="header">
        <div className="header__contenedor">
          <div className="header__barra">
            <NavLink to="/" className={({ isActive }) => (isActive ? "" : "")}>
              <img className="header__logo" src={logoImage} alt="imagen logo" />
            </NavLink>

            <nav className="navegacion">
              <ul>
                <NavLink
                  to="/"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  <li className="navegacion__enlace">
                    <FontAwesomeIcon icon={faHouse} className="icon-margin" />
                    Inicio
                  </li>
                </NavLink>
                {auth && (
                  <>
                    <NavLink
                      to="/gestionar-libros"
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      <li className="navegacion__enlace">
                        <FontAwesomeIcon
                          icon={faBook}
                          className="icon-margin"
                        />
                        Libros
                      </li>
                    </NavLink>
                    <NavLink
                      to="/usuarios"
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      <li className="navegacion__enlace">
                        {" "}
                        <FontAwesomeIcon
                          icon={faUsers}
                          className="icon-margin"
                        />
                        Usuarios
                      </li>
                    </NavLink>
                    <NavLink
                      to="/prestamos"
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                    <li className="navegacion__enlace">Prestamos</li>
                    </NavLink>
                  </>
                )}

                {auth ? (
                  <li
                    onClick={() => logoutUser()}
                    className="navegacion__enlace"
                  >
                    Logout
                  </li>
                ) : (
                  <NavLink
                    to="/login"
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    <li className="navegacion__enlace">Login</li>
                  </NavLink>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
