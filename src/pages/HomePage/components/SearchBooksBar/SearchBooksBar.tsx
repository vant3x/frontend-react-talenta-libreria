import React from 'react';
import useBookSearch from '../../../../hooks/useBooksSearch';
import './styles/SearchBooksBar.css';
export interface SearchBooksBarProps {}

const SearchBooksBar : React.FC<SearchBooksBarProps> = () => {

	  // hook de busqueda 
	  const optimizedFnSearchs = useBookSearch();

	  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const search = e.target.value;
		optimizedFnSearchs(search);
	  };


	  
	return (<div className='search__container'>
		<div className="search__input-container">
		<input className="search__book-input" placeholder="Puedes buscar por título o autor" onChange={handleInputChange} type="text" />
		<button className="normal__button">Buscar libro</button>
		</div>
	</div>);
};

export default SearchBooksBar;
