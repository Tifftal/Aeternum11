import React, { useState, useEffect } from 'react';

const Alert = ({ message }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const timeoutId = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, []);

  return <div className={`alert ${isVisible ? 'visible' : ''}`}>{message}</div>;
};

export default Alert;
