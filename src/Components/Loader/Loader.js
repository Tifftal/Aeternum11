import React, { useState, useEffect } from 'react';
import "./loader.css";

const LoadingText = () => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setIsVisible((prevVisible) => !prevVisible);
        }, 500);

        return () => clearInterval(intervalId);
    }, [])

    return <div className={`loading-text ${isVisible ? 'visible' : 'hidden'}`}>Загрузка...</div>;
}

export default LoadingText;