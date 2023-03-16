import React from 'react';
import './styles/Alert.css';

interface AlertProps {
  title?: string;
  message: string;
  type: 'error' | 'danger' | 'success';
}

const Alert: React.FC<AlertProps> = ({ title, message, type }) => {
  const classes = `alert ${type}`;

  return (
    <div className={classes}>{message}</div>
  );
};

export default Alert;