import React, { useEffect, useState } from "react";
import "./Assortment.css"
import AssortmentCard from "../../Entities/AssortmentCard/AssortmentCard";
import { URI } from "../../api/config";
import api from "../../api/axiosConfig";
import { useParams } from 'react-router-dom';
const Assortment = () => {
    const [data, setData] = useState(null);

    const { id } = useParams();

    useEffect(() => {
        api.get(`${URI}/category/${id}/goods`)
            .then(response => {

                setData(response.data);
            })
            .catch(err => {
                console.error("Error", err);
            });
    }, [id]);

    return (
        <div className="assortment">
            <div className="categoryBtn font-gramatika-bold">
                {/* eslint-disable-next-line */}
                <a href="/">Главная</a>
                <p>/</p>
                {/* eslint-disable-next-line */}
                <a href="#">Каталог</a>
                <p>/</p>
                <a href="/catalog">Одежда</a>
                <p>/</p>
                {/* eslint-disable-next-line */}
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
