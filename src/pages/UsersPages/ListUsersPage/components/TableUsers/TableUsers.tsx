import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../../../../../components/shared/Loader/Loader';
import { User } from '../../../../../interfaces/User.interface';
import './styles/TableUsers.css';

export interface TableUsersProps {
	data: User[];
	handleSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	loading: boolean;
}

const TableUsers : React.FC<TableUsersProps> = ({handleSearch, loading, data}) => {

	const router = useNavigate();

	return (
		<>
		<div className="wrapper">
		  <div className="container">
			<div className="table">
			  <table cellSpacing="0" cellPadding="0">
				<thead className="header__usuarios">
				  <tr>
					<td colSpan={2}>
					  <p className="headers">Lista de usuarios</p>{" "}
					</td>
				{
					handleSearch && (
						<td colSpan={3}>
						<input
						  className="search campo"
						  onChange={(e) => handleSearch(e)}
						  placeholder="Buscar por título o autor..."
						/>
					  </td>
					)
				}
					
				  </tr>
				  <tr className="header__usuarios">
					<td>Nro</td>
  
					<td>Nombre completo</td>
					<td>Email</td>
					<td>Teléfono</td>
					<td>Libros prestados</td>
				  </tr>
				</thead>
				<tbody>
				  {data.map((item, index) => (
					<tr key={index} className={index % 2 === 0 ? "" : "primary"}>
					  <td>{index + 1}</td>
  
					  <td>{item.name} {item.lastname}</td>
					  <td>{item.email}</td>
					  <td>{item.phone}</td>
					  <td className="border">Si</td>
					  <td>
						<button
						  onClick={() => router(`/nuevo-prestamo/${item.id}`)}
						>
						 Prestar libro        
						</button>
					  </td>
					  <td>
						<button
						  onClick={() => router(`/actualizar-usuario/${item.id}`)}
						>
						  Editar           <FontAwesomeIcon
                          icon={faPenToSquare}
                          className="icon-margin"
                        />
						</button>
					  </td>
					  <td>
						<button className="table__buttons-delete">Eliminar <FontAwesomeIcon
                          icon={faTrash}
                          className="icon-margin"
                        /></button>
					  </td>
					</tr>
				  ))}
				</tbody>
			  </table>
			  {loading && (
				<div className="center-loader">
				  <Loader />
				</div>
			  )}
			</div>
		  </div>
		</div>
	  </>
	)
};

export default TableUsers;
