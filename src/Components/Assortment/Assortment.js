import React, {useState} from "react";
import "./Assortment.css"
import { useTranslation } from "react-i18next";
import AssortmentCard from "../../Entities/AssortmentCard/AssortmentCard";
import { getData } from "../Wishlist/lib/data_wishlist";
import Filter from "../Filter/Filter";

const Assortment = () => {
    const [t] = useTranslation("global");
    const data = getData(t);

    const [isOpen, setIsOpen] = useState(false);

    const HandleOpenNote = () => {
        setIsOpen(true)
    };

    const HandleCloseNote = () => {
        setIsOpen(false)
    };

    return (
        <div className="assortment">
            {isOpen && (
                <Filter onClose={HandleCloseNote} setIsOpen={setIsOpen} />
            )}
            <div className="categoryBtn font-gramatika-bold">
                <a href="#">Women</a>
                <p>/</p>
                <a href="#">Ready-to-wear</a>
                <p>/</p>
                <a href="#">Tops</a>
            </div>
            <h1>Name scbjsbvsjcnv</h1>
            <button className="refine" onClick={HandleOpenNote}>Refine</button>
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