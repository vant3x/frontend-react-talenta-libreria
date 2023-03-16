import {
  SHOW_ALERTS,
  REMOVE_ALERTS,
  NEW_BOOK,
  NEW_BOOK_SUCCESS,
  NEW_BOOK_ERROR,
  UPDATE_BOOK,
  UPDATE_BOOK_SUCCESS,
  UPDATE_BOOK_ERROR,
  SET_BOOKS_SEARCHED,
  NEW_USER,
  NEW_USER_SUCCESS,
  NEW_USER_ERROR,
  UPDATE_USER,
  UPDATE_USER_ERROR,
  UPDATE_USER_SUCCESS,
  NEW_BORROWED_BOOK,
  NEW_BORROWED_BOOK_SUCCESS,
  NEW_BORROWED_BOOK_ERROR,
  RETURN_BORROWED_BOOK,
  RETURN_BORROWED_BOOK_SUCCESS,
  RETURN_BORROWED_BOOK_ERROR,
  RESET_STATE,
  SET_BOOK,
} from "../../types";

const appReducer = (state: any, action: any) => {
  switch (action.type) {
    case SHOW_ALERTS:
      return {
        ...state,
        alertMessage: action.payload,
      };
    case REMOVE_ALERTS:
      return {
        ...state,
        alertMessage: null,
      };
    case NEW_BOOK:
      return {
        ...state,
        loading: true,
      };
    case NEW_BOOK_SUCCESS:
      return {
        ...state,
        book: action.payload.data,
        message: { status: action.payload.status },
        loading: false,
      };
    case NEW_BOOK_ERROR:
      return {
        ...state,
        message: action.payload,
        loading: false,
      };

    case UPDATE_BOOK:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_BOOK_SUCCESS:
      return {
        ...state,
        book: action.payload.data,
        message: { status: action.payload.status },
        loading: false,
      };
    case UPDATE_BOOK_ERROR:
      return {
        ...state,
        message: action.payload,
        loading: false,
      };
    case RESET_STATE:
      return {
        ...state,
        book: null,
        loading: false
      };
    case SET_BOOK:
      return {
        ...state,
        book: action.payload,
      };
    case SET_BOOKS_SEARCHED:
      return {
        ...state,
        booksSearched: action.payload,
      };
    case NEW_USER:
      return {
        ...state,
        loading: true,
      };
    case NEW_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.data,
        userMessage: { status: action.payload.status },
        loading: false,
      };
    case NEW_USER_ERROR:
      return {
        ...state,
        userMessage: action.payload,
        loading: false,
      };
      case UPDATE_USER:
        return {
          ...state,
          loading: true,
        };
      case UPDATE_USER_SUCCESS:
        return {
          ...state,
          user: action.payload.data,
          userMessage: { status: action.payload.status },
          loading: false,
        };
      case UPDATE_USER_ERROR:
        return {
          ...state,
          userMessage: action.payload,
          loading: false,
        };
        

    case NEW_BORROWED_BOOK:
      return {
        ...state,
        loading: true,
      };
    case NEW_BOOK_SUCCESS:
      return {
        ...state,
        borrowedBook: action.payload.data,
        borrowedBookMessage: { status: action.payload.status },
        loading: false,
      };
    case NEW_BORROWED_BOOK_ERROR:
      return {
        ...state,
        borrowedBookMessage: action.payload,
        loading: false,
      };

      case RETURN_BORROWED_BOOK:
        return {
          ...state,
          loading: true,
        };
      case RETURN_BORROWED_BOOK_SUCCESS:
        return {
          ...state,
          borrowedBook: action.payload.data,
          borrowedBookMessage: { status: action.payload.status },
          loading: false,
        };
      case RETURN_BORROWED_BOOK_ERROR:
        return {
          ...state,
          userMessage: action.payload,
          loading: false,
        };

    default:
      return state;
  }
};

export default appReducer;
