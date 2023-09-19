import React from "react";
import "./Assortment.css"
import { useTranslation } from "react-i18next";
import AssortmentCard from "../../Entities/AssortmentCard/AssortmentCard";
import { getData } from "../Wishlist/lib/data_wishlist";

const Assortment = () => {
    const [t] = useTranslation("global");
    const data = getData(t);

    return (
        <div className="assortment">
            <div className="categoryBtn font-gramatika-bold">
                <a href="#">Women</a>
                <p>/</p>
                <a href="#">Ready-to-wear</a>
                <p>/</p>
                <a href="#">Tops</a>
            </div>
            <h1>Name scbjsbvsjcnv</h1>
            <button className="refine">Refine</button>
            <div className="goods">
                {
                    data.map(card => (
                        <a href="/product"><AssortmentCard data={card} /></a>
                    )
                    )
                }
            </div>
        </div>
    )
}

export default Assortment;