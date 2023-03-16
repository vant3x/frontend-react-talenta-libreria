import { useContext, useState, useCallback, useEffect } from "react";
import  appContext  from "./../context/app/appContext";
import { AppContextType } from "../interfaces/AppContextType";
import axiosClient from "../config/axios";
import { BookDetail } from "../interfaces/BookDetail.interface";

const useBookSearch = () => {
    const AppContext = useContext<AppContextType>(appContext);
    const { setBooksSearched } = AppContext;
  
    const debounce = (func: Function) => {
      let timer: NodeJS.Timeout | null;
      return (...args: any[]) => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          timer = null;
          func(...args);
        }, 600);
      };
    };
  
    const handleSearch = useCallback(async (search: string) => {
      const searchRes = await axiosClient.get(`/api/books/search?query=${search}`);
      setBooksSearched(searchRes.data);
    }, [setBooksSearched]);
  
    const optimizedFnSearch = useCallback(debounce(handleSearch), []);
  
    return optimizedFnSearch;
  };


export default useBookSearch;
