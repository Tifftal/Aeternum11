import React, { useEffect, useState } from "react";
import "./Assortment.css"
import { useTranslation } from "react-i18next";
import AssortmentCard from "../../Entities/AssortmentCard/AssortmentCard";
import Filter from "../Filter/Filter";
import { URI } from "../../api/config";
import api from "../../api/axiosConfig";
import { useParams } from 'react-router-dom';
const Assortment = () => {
    const [t] = useTranslation("global");
    const [data, setData] = useState(null);

    const { id } = useParams();

    useEffect(() => {
        api.get(`${URI}/category/${id}/goods`)
            .then(response => {
                console.log(response.data);
                setData(response.data);
            })
            .catch(err => {
                console.error("Error", err);
            });
    }, [id]);

    return (
        <div className="assortment">
            <div className="categoryBtn font-gramatika-bold">
                <a href="#">Женщины</a>
                <p>/</p>
                <a href="/catalog">Одежда</a>
                <p>/</p>
                <a href="#">{data?.name}</a> 
            </div>
            <h1>{data?.name}</h1>
            <div className="goods">
                {data?.goods?.content.map(card => (
                    <a href={`/product/${card.id}`} key={card.id}>
                        <AssortmentCard data={card} />
                    </a>
                ))}
            </div>
        </div>
    );
}

export default Assortment;
