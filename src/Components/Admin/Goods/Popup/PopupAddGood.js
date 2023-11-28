import React, { useState } from 'react';
import "./PopupAddGood.css";

const PopupAddGood = ({ onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        compound: '',
        backColor: {
            name: '',
            code: ''
        },
        colors: [
            {
                name: '',
                code: '',
                sizes: [
                    {
                        size: '',
                        sizeStatus: 'IN_STOCK'
                    }
                ]
            }
        ],
        sizes: [
            {
                size: '',
                sizeStatus: 'IN_STOCK'
            }
        ]
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleAddGood = (e) => {
        e.preventDefault();
        // Обработка отправки формы или обработка данных здесь
        console.log(formData);
    };

    return (
        <div className="modal">
            <div className="modal-content-admin">
                <div className='header-good font-gramatika-bold'>
                    <h1>Добавить товар</h1>
                    <button className='close' onClick={onClose}><img src='../../IMG/icons8-крестик-78.png' alt='close' /></button>
                </div>
                <div className='flex-cont'>
                    <div>Тут фото</div>
                    <form>
                        <div className='form-group'>
                            <label htmlFor="name">Name:</label>
                            <input
                                className='good-input'
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className='form-group'>
                            <label htmlFor="description">Description:</label>
                            <textarea
                                className='good-input'
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className='form-group'>
                            <label htmlFor="compound">Compound:</label>
                            <input
                                className='good-input'
                                type="text"
                                id="compound"
                                name="compound"
                                value={formData.compound}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className='form-group'>
                            <label htmlFor="backColorName">BackColor Name:</label>
                            <input
                                className='good-input'
                                type="text"
                                id="backColorName"
                                name="backColor"
                                value={formData.backColor.name}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className='form-group'>
                            <label htmlFor="backColorCode">BackColor Code:</label>
                            <input
                                className='good-input'
                                type="text"
                                id="backColorCode"
                                name="backColor"
                                value={formData.backColor.code}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className='form-group'>
                            <label htmlFor="colorName">Color Name:</label>
                            <input
                                className='good-input'
                                type="text"
                                id="colorName"
                                name="colors"
                                value={formData.colors[0].name}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className='form-group'>
                            <label htmlFor="colorCode">Color Code:</label>
                            <input
                                className='good-input'
                                type="text"
                                id="colorCode"
                                name="colors"
                                value={formData.colors[0].code}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className='form-group'>
                            <label htmlFor="size">Size:</label>
                            <input
                                className='good-input'
                                type="text"
                                id="size"
                                name="sizes"
                                value={formData.sizes[0].size}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className='form-group'>
                            <label htmlFor="sizeStatus">Size Status:</label>
                            <input
                                className='good-input'
                                type="text"
                                id="sizeStatus"
                                name="sizes"
                                value={formData.sizes[0].sizeStatus}
                                onChange={handleInputChange}
                            />
                        </div>

                        <button type="submit" onClick={handleAddGood}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PopupAddGood;
