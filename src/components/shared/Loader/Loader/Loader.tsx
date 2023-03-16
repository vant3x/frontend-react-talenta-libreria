import React from 'react';
import './styles/Loader.css';
export interface LoaderProps {}

const Loader : React.FC<LoaderProps> = () => {
	return <div className="lds-dual-ring"></div>;
};

export default Loader;
