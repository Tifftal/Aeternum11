import React, { useEffect, useState } from "react";
import "./third.css"
import { useTranslation } from "react-i18next";
import api from "../../../api/axiosConfig";
import { Minio, URI } from "../../../api/config";

const Third = () => {
    const [t] = useTranslation("global");
    const [data, setData] = useState({});

    useEffect(() => {
        api.get(`${URI}/firstPage`)
            .then(response => {
                setData(response.data);
            })
            .catch(err => {
                console.error(err);
            });
    }, []);

    return (
        <div className="third">
            <div className="poster">
                <div className="posterImg">
                    <img src=""/>
                </div>
                <div className="posterInfo font-gramatika-bold">
                    <h2>рекомендуем</h2>
                    <h1 className="font-gramatika-bold">{data.name}</h1>
                    <p className="font-gramatika-reg">{data.description}</p>
                    <a href="/"><button className="font-gramatika-bold">узнать больше</button></a>
                </div>
            </div>
        </div>
    )
}

export default Third;