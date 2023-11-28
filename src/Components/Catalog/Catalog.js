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
                console.log(response);
                let categoriesId = [];
                const sections = response.data;
                sections.map(categories => {
                    console.log(categories)
                    categoriesId = [...categories.categories]
                })
                console.log("CATEGORIES", categoriesId)
                setCategories(categoriesId)
            })
            .catch(err => {
                console.error(err);
            });
    }, []);

    useEffect(() => {
        api.get(`${URI}/goods`)
            .then(response => {
                console.log(response);
                setData(response.data.content)
            })
            .catch(err => {
                console.error(err);
            });
    }, []);

    return (
        <div className="assortment">
            <div className="categoryBtn font-gramatika-bold">
                <a href="#">Женщины</a>
                <p>/</p>
                <a href="#">Одежда</a>
            </div>
            <div className="link-category">
                {
                    categories.map(category => (
                        <a href={`/assortment/${category.id}`} className="assortmentBtn"><button>{category.name}</button></a>
                    ))
                }
            </div>
            <div className="goods">
                {
                    data.map(card => (
                        <a href={`/product/${card.id}`}><AssortmentCard key={card.id} data={card} /></a>
                    )
                    )
                }
            </div>
        </div>
    )
}

export default Catalog;