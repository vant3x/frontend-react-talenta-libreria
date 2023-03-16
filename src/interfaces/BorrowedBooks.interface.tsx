import { BookDetail } from "./BookDetail.interface";
import { User } from "./User.interface";

export interface BorrowedBook {
    id?: number;
    userId: string;
    bookId: string;
    borrowDate: Date | string;
    returnDate:Date | string;
    returnStatus?: 'pending' | 'returned';
    user?: User;
    book?: BookDetail;
  }