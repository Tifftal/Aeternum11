// EditPopup.js
import React, { useEffect, useState } from 'react';
import './EditPopup.css';
import { useTranslation } from 'react-i18next';

const EditPopup = ({ onClose, children, selectedGood, title, setIsOpen, ...props }) => {
    const [t] = useTranslation('global');
    const [good_id, setGoodId] = useState(null);

    useEffect(() => {
        if (selectedGood) {
            setGoodId(selectedGood.id);
        }
    }, [selectedGood]);

    return (
        <div className="modal">
            <div className="modal-content-edit">
                <div className='header-good font-gramatika-bold'>
                    <h1>{title}</h1>
                    <button className='close' onClick={onClose}><img src='../../IMG/icons8-крестик-78.png' alt='close' /></button>
                </div>
                <div className='flex-cont-edit'>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default EditPopup;
