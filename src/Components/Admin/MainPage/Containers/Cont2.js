import React, { useState, useEffect } from "react";
import "./Cont2.css"
import { useTranslation } from "react-i18next";
import api from "../../../../api/axiosConfig";
import { URI } from "../../../../api/config";

const Container2 = () => {

    const [clas, setClas] = useState('default-edit-cont-2');

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        api.get(`${URI}/fiveCategories`, {
            headers: {
                Authorization: `Bearer: ${window.localStorage.getItem("jwtToken")}`
            }
        })
        .then(response => {
            console.log(response);
            setCategories(response.data);
        })
        .catch(error => {
            console.error(error);
        })
    }, [])

    const HandleDropEdit = (e) => {
        const NewClas = clas === 'default-edit-cont-2' ? 'active-edit-cont-2' : 'default-edit-cont-2';
        setClas(NewClas)
    };

    return (
        <div className="container-2">
            <h1 className="font-gramatika-bold">Container 1</h1>
            <div className="example-cont-2 font-gramatika-bold">
                {categories.map((data, idx) => (
                    <div className="card-cont-2" key={idx}>
                        <img src={data.path || "../IMG/test.jpg"} />
                        <p>{data.categoryName}</p>
                    </div>
                ))}
                {/* <div className="card-cont-2">
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
                </div> */}
            </div>
        </div>
    )
}

export default Container2;