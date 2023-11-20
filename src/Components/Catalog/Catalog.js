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
                    categoriesId = [...categories.categories]
                })
                setCategories(categoriesId)
                let goods = [];
                categoriesId.map(category => {
                    api.get(`${URI}/category/${category.id}/goods`)
                        .then(response => {
                            goods.push(response.data.content);
                            setData(goods.flat())
                        })
                        .catch(error => {
                            console.error(error);
                        })
                })
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