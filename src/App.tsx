import { useState } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import "./App.css";
import { Header } from "./components/Layout/Header/Header";
import { Layout } from "./components/Layout/Layout";
import AuthState from "./context/auth/AuthState";
import AppState from "./context/app/appState";

import { HomePage } from "./pages/HomePage";
import { SignupPage } from "./pages/SignupPage";
import { LoginPage } from "./pages/LoginPage";
import { CreateBooksPage } from "./pages/BooksPages/CreateBooksPage";
import { ListBooksPage } from "./pages/BooksPages/ListBooksPage";
import { EditBooksPage } from "./pages/BooksPages/EditBooksPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ListUsersPage } from "./pages/UsersPages/ListUsersPage";
import { CreateUsersPage } from "./pages/UsersPages/CreateUsersPage";
import { EditUserPage } from "./pages/UsersPages/EditUserPage";
import { ListBorrowedBooksPage } from "./pages/BorrowedBooksPages/ListBorrowedBooksPage";
import { NewBorrowedBookPage } from "./pages/BorrowedBooksPages/NewBorrowedBookPage";

function App() {

  return (
    <AuthState>
      <AppState>
      <Router>
        <Header />
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/libros" element={<ListBooksPage />} />
            <Route path="/gestionar-libros" element={<ListBooksPage />} />
            <Route path="/registrar-libro" element={<CreateBooksPage />} />
            <Route path="/actualizar-libro/:id" element={<EditBooksPage />} />
            <Route path="/usuarios" element={<ListUsersPage />} />
            <Route path="/crear-usuario" element={<CreateUsersPage />} />
            <Route path="/actualizar-usuario/:id" element={<EditUserPage   />} />
            <Route path="/prestamos" element={<ListBorrowedBooksPage />} />
            <Route path="/nuevo-prestamo" element={<NewBorrowedBookPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </Router>
      </AppState>
    </AuthState>
  );
}

export default App;
