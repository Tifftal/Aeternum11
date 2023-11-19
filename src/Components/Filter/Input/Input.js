import React from 'react';

const CheckboxGroup = ({ title, selectedOption, handleCheckboxChange }) => {
    const checkboxStyle = {
        marginLeft: '8px', // Расстояние между чекбоксом и текстом
    };

    const labelStyle = {
        display: 'flex',
        alignItems: 'center', // Выравнивание элементов по центру
        marginTop: '5px', // Верхний отступ
        alignSelf: "flex-start",
        marginTop: 5,
    };

    const customCheckboxStyle = {
        width: '12px', // Ширина круглого чекбокса
        height: '12px', // Высота круглого чекбокса
        borderRadius: '50%', // Делаем круглый
        border: '1px solid #fff', // Обводка
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        backgroundColor: selectedOption === title ? 'transparent' : 'transparent', // Цвет фона при выборе
    };

    return (
        <div style={labelStyle}>
            <div style={customCheckboxStyle} onClick={() => handleCheckboxChange(title)}>
                {selectedOption === title && <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#fff' }}></div>}
            </div>
            <label style={checkboxStyle}>
                {title}
            </label>
        </div>
    );
};

export default CheckboxGroup;
