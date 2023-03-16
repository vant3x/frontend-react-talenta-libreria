import React from 'react';
import { Footer } from '../Footer';
import './styles/Layout.css';
export interface LayoutProps {
	children?: React.ReactElement | React.ReactElement[];
}

const Layout : React.FC<LayoutProps> = ({children}) => {
	return (
		<>
			<main className='contenedor'>
				{children}
			</main>
		{/* 	<Footer/> */}
		</>
	);
};

export default Layout;
