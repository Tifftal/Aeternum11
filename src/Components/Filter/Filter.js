import React, { useState } from 'react';
import './Filter.css';
import { useTranslation } from "react-i18next";

const Filter = (props) => {
    const [t] = useTranslation("global");

    const [clasSort, setClasSort] = useState('default_filter');
    const [clasCategory, setClasCategory] = useState('default_filter');
    const [clasSize, setClasSize] = useState('default_filter');
    const [clasColor, setClasColor] = useState('default_filter');
    const [clasStyle, setClasStyle] = useState('default_filter');

    const HandleDropSort = (e) => {
        const NewClas = clasSort === 'default_filter' ? 'active_filter' : 'default_filter';
        setClasSort(NewClas)
    };
    const HandleDropCategory = (e) => {
        const NewClas = clasCategory === 'default_filter' ? 'active_filter' : 'default_filter';
        setClasCategory(NewClas)
    };
    const HandleDropSize = (e) => {
        const NewClas = clasSize === 'default_filter' ? 'active_filter' : 'default_filter';
        setClasSize(NewClas)
    };
    const HandleDropColor = (e) => {
        const NewClas = clasColor === 'default_filter' ? 'active_filter' : 'default_filter';
        setClasColor(NewClas)
    };
    const HandleDropStyle = (e) => {
        const NewClas = clasStyle === 'default_filter' ? 'active_filter' : 'default_filter';
        setClasStyle(NewClas)
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
                        <div className={clasSort}>
                            <button onClick={HandleDropSort}>
                                {/* <img src="../../IMG/icons8-user-96.png" alt="profile" /> */}
                                Sort By
                            </button>
                            <div className="sort-drop">
                                <a href="#">1</a>
                                <a href="#">2</a>
                                <a href="#">3</a>
                                <a href="#">4</a>
                            </div>
                        </div>
                        <div className={clasCategory}>
                            <button onClick={HandleDropCategory}>
                                {/* <img src="../../IMG/icons8-user-96.png" alt="profile" /> */}
                                Category
                            </button>
                            <div className="sort-drop">
                                <a href="#">1</a>
                                <a href="#">2</a>
                                <a href="#">3</a>
                                <a href="#">4</a>
                            </div>
                        </div>
                        <div className={clasSize}>
                            <button onClick={HandleDropSize}>
                                {/* <img src="../../IMG/icons8-user-96.png" alt="profile" /> */}
                                Size
                            </button>
                            <div className="sort-drop">
                                <a href="#">1</a>
                                <a href="#">2</a>
                                <a href="#">3</a>
                                <a href="#">4</a>
                            </div>
                        </div>
                        <div className={clasColor}>
                            <button onClick={HandleDropColor}>
                                {/* <img src="../../IMG/icons8-user-96.png" alt="profile" /> */}
                                Color
                            </button>
                            <div className="sort-drop">
                                <a href="#">1</a>
                                <a href="#">2</a>
                                <a href="#">3</a>
                                <a href="#">4</a>
                            </div>
                        </div>
                        <div className={clasStyle}>
                            <button onClick={HandleDropStyle}>
                                {/* <img src="../../IMG/icons8-user-96.png" alt="profile" /> */}
                                Style
                            </button>
                            <div className="sort-drop">
                                <a href="#">1</a>
                                <a href="#">2</a>
                                <a href="#">3</a>
                                <a href="#">4</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <a href='/account'><button className='btn show'>Show result</button></a>
                    <a href='/create_account' className='btn clear'>Clear all</a>
                </div>
            </div>
        </div>
    );
}

export default Filter;
