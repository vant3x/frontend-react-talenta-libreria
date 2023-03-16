import  { createContext } from "react";
import { BorrowedBook } from "../../interfaces/BorrowedBooks.interface";
import { returnBorrowedBookData } from "../../interfaces/return-borrowed-book.interface";
import { User } from "../../interfaces/User.interface";
import { AppContextType } from "./../../interfaces/AppContextType";
import { BookDetail } from './../../interfaces/BookDetail.interface';

const appContext = createContext<AppContextType>({
    message: {
        message: '',
        status: null
    },
    userMessage: {
        message: '',
        status: null
    },
    borrowedBookMessage: {
        message: '',
        status: null
    },
    loading: false, 
    alertMessage: "",
    booksSearched:[],
    book: {} as BookDetail,
    user: {} as User,
    borrowedBook: {} as BorrowedBook,
    newBook: () => { },
    updateBook: () => { },
    setBook: () => { },
    newUser: () => { },
    newBorrowedBook: (borrowedBook: BorrowedBook) => void {},
    returnBorrowedBook : (returnBorrowedBook: returnBorrowedBookData, id: string | number) => void {},
    updateUser: (user: User, id: string) => void { },
    resetState: () => void {},
    showAlert:  (message: string) =>  void {},
    setBooksSearched: (books: BookDetail[]) => void{}
});

export default appContext;
