import React, { useEffect, useState } from "react";
import "./Assortment.css"
import { useTranslation } from "react-i18next";
import AssortmentCard from "../../Entities/AssortmentCard/AssortmentCard";
import Filter from "../Filter/Filter";
import { getData } from "../../Entities/AssortmentCard/data_assortment";
import axios from "axios";
import { URI } from "../../api/config";

const Assortment = () => {
    const [t] = useTranslation("global");
    // const data = getData(t);
    const [data, setData] = useState([]);

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        axios.get(`${URI}/category/${1}/goods`)
            .then(response => {
                console.log(response);
                setData(response.data.content);
            })
            .catch(err => {
                console.error(err);
            })
    }, [])

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
                        <a href={`/product/${card.id}`}><AssortmentCard key={card.id} data={card} /></a>
                    )
                    )
                }
            </div>
        </div>
    )
}

export default Assortment;