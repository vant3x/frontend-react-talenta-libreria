import React from 'react';
import './styles/Tooltip.css';

export interface TooltipProps {
	children: React.ReactNode;
	text: string;
}

const Tooltip : React.FC<TooltipProps> = ({children, text}) => {
	return (
		<div className="tooltip">
      {children}
      <span className="tooltip__text">{text}</span>
    </div>
	);
};

export default Tooltip;
