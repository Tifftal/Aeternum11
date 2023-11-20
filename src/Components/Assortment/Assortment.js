import React, { useEffect, useState } from "react";
import "./Assortment.css"
import { useTranslation } from "react-i18next";
import AssortmentCard from "../../Entities/AssortmentCard/AssortmentCard";
import Filter from "../Filter/Filter";
import { URI } from "../../api/config";
import api from "../../api/axiosConfig";

const Assortment = () => {
    const [t] = useTranslation("global");
    const [data, setData] = useState([]);
    const [category, setCategory] = useState({});

    // const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        api.get(`${URI}/categories/${1}`)
            .then(response => {
                console.log(response);
                setCategory(response.data);
            })
            .catch(err => {
                console.error(err);
            })
        api.get(`${URI}/category/${1}/goods`)
            .then(response => {
                console.log(response);
                setData(response.data.content);
            })
            .catch(err => {
                console.error(err);
            })
    }, [])

    // const HandleOpenNote = () => {
    //     setIsOpen(true)
    // };

    // const HandleCloseNote = () => {
    //     setIsOpen(false)
    // };

    return (
        <div className="assortment">
            {/* {isOpen && (
                <Filter onClose={HandleCloseNote} setIsOpen={setIsOpen} />
            )} */}
            <div className="categoryBtn font-gramatika-bold">
                <a href="#">Женщины</a>
                <p>/</p>
                <a href="#">Одежда</a>
                <p>/</p>
                <a href="#">{category.name}</a>
            </div>
            <h1>{category.name}</h1>
            {/* <button className="refine" onClick={HandleOpenNote}>Фильтры</button> */}
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