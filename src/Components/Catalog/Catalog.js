import React, { useEffect, useState } from "react";
import "./Catalog.css";
import { URI } from "../../api/config";
import api from "../../api/axiosConfig";
import AssortmentCard from "../../Entities/AssortmentCard/AssortmentCard";

const Catalog = () => {
    const [data, setData] = useState([]);
    const [categories, setCategories] = useState([])

    useEffect(() => {
        api.get(`${URI}/sections`)
            .then(response => {
                
                let categoriesId = [];
                const sections = response.data;
                // eslint-disable-next-line
                sections.map(categories => {
                
                    categoriesId = [...categories.categories]
                })
                // console.log("CATEGORIES", categoriesId)
                setCategories(categoriesId)
            })
            .catch(err => {
                console.error(err);
            });
    }, []);

    useEffect(() => {
        api.get(`${URI}/goods`)
            .then(response => {
                
                setData(response.data.content)
            })
            .catch(err => {
                console.error(err);
            });
    }, []);

    return (
        <div className="assortment">
            <div className="categoryBtn font-gramatika-bold">
            {/* eslint-disable-next-line */}
                <a href="/">Главная</a>
                <p>/</p>
                {/* eslint-disable-next-line */}
                <a href="#">Каталог</a>
                <p>/</p>
                {/* eslint-disable-next-line */}
                <a href="#">Одежда</a>
            </div>
            <div className="link-category">
                {
                    categories.map((category, idx) => (
                        <a key={idx} href={`/assortment/${category.id}`} className="assortmentBtn"><button className="font-gramatika-reg">{category.name}</button></a>
                    ))
                }
            </div>
            <div className="goods">
                {
                    data.map((card, idx) => (
                        <a href={`/product/${card.id}`} key={idx}><AssortmentCard key={idx} data={card} /></a>
                    )
                    )
                }
            </div>
        </div>
    )
}

export default Catalog;