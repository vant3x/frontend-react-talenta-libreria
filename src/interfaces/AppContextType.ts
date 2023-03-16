import { BookDetail } from './BookDetail.interface';
import { BorrowedBook } from './BorrowedBooks.interface';
import { returnBorrowedBookData } from './return-borrowed-book.interface';
import { User } from './User.interface';

export interface AppContextType {
    message: {
        message: string;
        status: number | null;
    };
    userMessage: {
        message: string;
        status: number | null;
    };
    borrowedBookMessage: {
        message: string;
        status: number | null;
    };
    loading: boolean;
    alertMessage: string;
    booksSearched: BookDetail[];
    state?: boolean;
    book?: BookDetail;
    user: User;
    borrowedBook: BorrowedBook;
    newBook: (book: FormData) => void;
    updateBook: (book: FormData, id: string) => void;
    newBorrowedBook: (borrowedBook: BorrowedBook) => void;
    newUser: (user: User) => void;
    updateUser: (user: User, id: string) => void;
    returnBorrowedBook : (returnBorrowedBook: returnBorrowedBookData, id: string | number) => void;
    setBooksSearched: (books:BookDetail[]) => void;
    resetState: () => void;
    showAlert: (message: string) => void;
    setBook: (book: Partial<BookDetail>) => void;
}