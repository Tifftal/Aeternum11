import React, { useEffect, useState } from "react";
import './drop.css';
import api from "../../../api/axiosConfig";
import { URI } from "../../../api/config";


const DropW = () => {
    const [sections, setSectons] = useState([]);

    useEffect(() => {
        api.get(`${URI}/sections`)
            .then(response => {
                
                setSectons(response.data)
            })
            .catch(err => {
                console.error(err);
            })
    }, [])

    return (
        <div className="menuDrop">
            {
                sections.map((section, idx) => (
                    <div key={idx} className="column">
                        <h1>{section.name}</h1>
                        <div className="col">
                            {
                                section.categories.map((item, idx) => (
                                    <a key={idx} href={`/assortment/${item.id}`}><button >{item.name}</button></a>
                                ))
                            }
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default DropW;