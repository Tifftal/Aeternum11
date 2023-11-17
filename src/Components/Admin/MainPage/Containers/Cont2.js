import React, { useState } from "react";
import "./Cont2.css"
import { useTranslation } from "react-i18next";

const Container2 = () => {

    const [clas, setClas] = useState('default-edit-cont-2');

    const HandleDropEdit = (e) => {
        const NewClas = clas === 'default-edit-cont-2' ? 'active-edit-cont-2' : 'default-edit-cont-2';
        setClas(NewClas)
    };

    return (
        <div className="container-2">
            <h1 className="font-gramatika-bold">Container 1</h1>
            <div className="example-cont-2 font-gramatika-bold">
                <div className="card-cont-2">
                    <img src="../IMG/test.jpeg" />
                    <p>TEXT</p>
                    <button onClick={HandleDropEdit}>Edit</button>
                </div>
                <div className="card-cont-2">
                    <img src="../IMG/test.jpeg" />
                    <p>TEXT</p>
                    <button onClick={HandleDropEdit}>Edit</button>
                </div>
                <div className="card-cont-2">
                    <img src="../IMG/test.jpeg" />
                    <p>TEXT</p>
                    <button onClick={HandleDropEdit}>Edit</button>
                </div>
                <div className="card-cont-2">
                    <img src="../IMG/test.jpeg" />
                    <p>TEXT</p>
                    <button onClick={HandleDropEdit}>Edit</button>
                </div>
                <div className="card-cont-2">
                    <img src="../IMG/test.jpeg" />
                    <p>TEXT</p>
                    <button onClick={HandleDropEdit}>Edit</button>
                </div>
            </div>
            <div className={clas}>
                <form>
                    <div>
                        <label>Image</label>
                        <input type='file'></input>
                    </div>
                    <div>
                        <label>Background image</label>
                        <input type='file'></input>
                    </div>
                    <div>
                        <input className='input-text' type='text' placeholder="Name Eng"></input>
                        <input className='input-text' type='text' placeholder="Name Rus"></input>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Container2;