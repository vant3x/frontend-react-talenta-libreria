import { faBook } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { NewBookForm } from '../components/NewBookForm';
import './styles/CreateBooksPage.css';

export interface CreateBooksPageProps {}

const CreateBooksPage : React.FC<CreateBooksPageProps> = () => {
	return (
		<>
		  <h2 className="libros__heading"> <FontAwesomeIcon icon={faBook} className="icon-margin" />  Registra un nuevo libro</h2>
			<NewBookForm/>
		</>
	);
};

export default CreateBooksPage;
