import React from 'react';

const CheckboxBtn = ({ title, selectedOptions, handleCheckboxBtnChange }) => {
    const isChecked = selectedOptions.includes(title);

    const checkboxStyle = {
        position: 'absolute',
        opacity: 0,
        cursor: 'pointer',
    };

    const labelStyle = {
        position: 'relative',
        cursor: 'pointer',
        paddingTop: 2, 
        paddingBottom: 2,
        paddingLeft: 12,
        paddingRight: 12,
        borderRadius: 10,
        backgroundColor: isChecked ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0.1)', 
    };
    return (
        <div>
            <label style={labelStyle}>
                <input
                    type="checkbox"
                    value={title}
                    checked={isChecked}
                    onChange={() => handleCheckboxBtnChange(title)}
                    style={checkboxStyle}
                />
                {title}
            </label>
        </div>
    );
};

export default CheckboxBtn;
