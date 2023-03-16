import { faBook } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useParams } from 'react-router-dom';
import { EditBookForm } from '../components/EditBookForm';
import './styles/EditBooksPage.css';
export interface EditBooksPageProps {}

const EditBooksPage : React.FC<EditBooksPageProps> = () => {
	const params = useParams<{ id?: string }>();

	return (
		<>
		  <h2 className="libros__heading"> <FontAwesomeIcon icon={faBook} className="icon-margin" /> Editar un libro</h2>
			{
				params?.id && <EditBookForm id={params.id} />
			}
		</>
	);
};
export default EditBooksPage;
