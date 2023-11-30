import React, { useState } from 'react';
import './Filter.css';
import { useTranslation } from "react-i18next";
import CheckboxGroup from './Input/Input';
import CheckboxBtn from './Input/BtnInput';

const Filter = (props) => {
    const [t] = useTranslation("global");

    const [clasSort, setClasSort] = useState({ className: 'default_filter', imageSrc: '../../IMG/icons8-плюс-144.png' });
    const [clasSize, setClasSize] = useState({ className: 'default_filter', imageSrc: '../../IMG/icons8-плюс-144.png' });
    const [clasColor, setClasColor] = useState({ className: 'default_filter', imageSrc: '../../IMG/icons8-плюс-144.png' });
    const [clasStyle, setClasStyle] = useState({ className: 'default_filter', imageSrc: '../../IMG/icons8-плюс-144.png' });

    const [selectedOption, setSelectedOption] = useState('');
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleDropSort = () => {
        setClasSort(prevState => ({
            ...prevState,
            className: prevState.className === 'default_filter' ? 'active_filter' : 'default_filter',
            imageSrc: prevState.className === 'default_filter' ? '../../IMG/icons8-минус-144.png' : '../../IMG/icons8-плюс-144.png',
        }));
    };

    const handleDropSize = () => {
        setClasSize(prevState => ({
            ...prevState,
            className: prevState.className === 'default_filter' ? 'active_filter' : 'default_filter',
            imageSrc: prevState.className === 'default_filter' ? '../../IMG/icons8-минус-144.png' : '../../IMG/icons8-плюс-144.png',
        }));
    };

    const handleDropColor = () => {
        setClasColor(prevState => ({
            ...prevState,
            className: prevState.className === 'default_filter' ? 'active_filter' : 'default_filter',
            imageSrc: prevState.className === 'default_filter' ? '../../IMG/icons8-минус-144.png' : '../../IMG/icons8-плюс-144.png',
        }));
    };

    const handleDropStyle = () => {
        setClasStyle(prevState => ({
            ...prevState,
            className: prevState.className === 'default_filter' ? 'active_filter' : 'default_filter',
            imageSrc: prevState.className === 'default_filter' ? '../../IMG/icons8-минус-144.png' : '../../IMG/icons8-плюс-144.png',
        }));
    };


    const handleCheckboxChange = (value) => {
        setSelectedOption(value);
    };

    const handleCheckboxBtnChange = (value) => {
        if (selectedOptions.includes(value)) {
            setSelectedOptions(selectedOptions.filter((option) => option !== value));
        } else {
            setSelectedOptions([...selectedOptions, value]);
        }
    };

    return (
        <div className="modal-filter">
            <div className="modal-content-filter">
                <div>
                    <div className="refine-header font-gramatika-bold">
                        <h1>Refine</h1>
                        <button className='close' onClick={props.onClose}><img src='../../IMG/icons8-крестик-78.png' alt='close' /></button>
                    </div>
                    <div className="filters">
                        <div className={clasSort.className}>
                            <button onClick={handleDropSort}>
                                <h2 className='font-gramatika-bold'>Sort By
                                    <img src={clasSort.imageSrc} alt="profile" /></h2>
                            </button>
                            <div className="input-drop">
                                <CheckboxGroup title="Newest" selectedOption={selectedOption} handleCheckboxChange={handleCheckboxChange} />
                                <CheckboxGroup title="Price from lower to highest" selectedOption={selectedOption} handleCheckboxChange={handleCheckboxChange} />
                                <CheckboxGroup title="Price from highest to lower" selectedOption={selectedOption} handleCheckboxChange={handleCheckboxChange} />
                            </div>
                        </div>
                        <div className={clasSize.className}>
                            <button onClick={handleDropSize}>
                                <h2 className='font-gramatika-bold'>Size
                                    <img src={clasSize.imageSrc} alt="profile" /></h2>
                            </button>
                            <div className="size-drop">
                                <CheckboxBtn title="34" selectedOptions={selectedOptions} handleCheckboxBtnChange={handleCheckboxBtnChange} />
                                <CheckboxBtn title="36" selectedOptions={selectedOptions} handleCheckboxBtnChange={handleCheckboxBtnChange} />
                                <CheckboxBtn title="38" selectedOptions={selectedOptions} handleCheckboxBtnChange={handleCheckboxBtnChange} />
                                <CheckboxBtn title="40" selectedOptions={selectedOptions} handleCheckboxBtnChange={handleCheckboxBtnChange} />
                                <CheckboxBtn title="42" selectedOptions={selectedOptions} handleCheckboxBtnChange={handleCheckboxBtnChange} />
                                <CheckboxBtn title="44" selectedOptions={selectedOptions} handleCheckboxBtnChange={handleCheckboxBtnChange} />
                                <CheckboxBtn title="46" selectedOptions={selectedOptions} handleCheckboxBtnChange={handleCheckboxBtnChange} />
                                <CheckboxBtn title="48" selectedOptions={selectedOptions} handleCheckboxBtnChange={handleCheckboxBtnChange} />
                            </div>
                        </div>
                        <div className={clasColor.className}>
                            <button onClick={handleDropColor}>
                                <h2 className='font-gramatika-bold'>Color
                                    <img src={clasColor.imageSrc} alt="profile" /></h2>
                            </button>
                            <div className="color-drop">
                                <CheckboxBtn title="Black" selectedOptions={selectedOptions} handleCheckboxBtnChange={handleCheckboxBtnChange} />
                                <CheckboxBtn title="Blue" selectedOptions={selectedOptions} handleCheckboxBtnChange={handleCheckboxBtnChange} />
                                <CheckboxBtn title="Gray" selectedOptions={selectedOptions} handleCheckboxBtnChange={handleCheckboxBtnChange} />
                                <CheckboxBtn title="Green" selectedOptions={selectedOptions} handleCheckboxBtnChange={handleCheckboxBtnChange} />
                                <CheckboxBtn title="Purple" selectedOptions={selectedOptions} handleCheckboxBtnChange={handleCheckboxBtnChange} />
                                <CheckboxBtn title="White" selectedOptions={selectedOptions} handleCheckboxBtnChange={handleCheckboxBtnChange} />
                                <CheckboxBtn title="Yellow" selectedOptions={selectedOptions} handleCheckboxBtnChange={handleCheckboxBtnChange} />
                            </div>
                        </div>
                        {/* <div className={clasStyle.className}>
                            <button onClick={handleDropStyle}>
                                <h2 className='font-gramatika-bold'>Style
                                    <img src={clasStyle.imageSrc} alt="profile" /></h2>
                            </button>
                            <div className="input-drop">
                                <CheckboxGroup title="Опция 2" selectedOption={selectedOption} handleCheckboxChange={handleCheckboxChange} />
                                <CheckboxGroup title="Опция 3" selectedOption={selectedOption} handleCheckboxChange={handleCheckboxChange} />
                            </div>
                        </div> */}
                    </div>
                </div>
                <div>
                    <a href='/account'><button className='btnFilter show font-gramatika-bold'>Show result</button></a>
                    <a href='/create_account' className='btnFilter clear font-gramatika-bold'>Clear all</a>
                </div>
            </div>
        </div>
    );
}

export default Filter;
