import React, { useEffect, useState } from "react";
import './second.css';
import { useTranslation } from "react-i18next";

import MenuCard from "../../../Entities/MenuCards/MenuCard";
import { Carousel } from "../../Carousel/Carousel";
import api from "../../../api/axiosConfig";
import { URI } from "../../../api/config";

const Second = () => {
    const [t] = useTranslation("global");
    // const data = getData(t);
    const [categories, setCategories] = useState([])

    useEffect(() => {
        api.get(`${URI}/fiveCategories`)
        .then(response => {
            setCategories(response.data);
        })
        .catch(error => {
            console.error(error);
        })
    })

    return (
        <div className="second">
            <div className="menu font-gramatika-bold">
                {window.innerWidth > 775 ?
                    (
                        categories.map((card, idx) => (
                            <MenuCard key={idx} data={card} />
                        )
                        )
                    )
                    : (
                        <Carousel items={categories} />
                    )
                }
            </div>
            <h1 className="font-gramatika-reg">
                Aeternum – бесконечный ( лат. ), отражает философию бесконечного цикла жизни, творчества, энергии, процесса производства (upcycle)
            </h1>
            <h1 className="font-gramatika-reg">
                Eleven – сакральное число 11, отражает концепцию дуальности духовного и творческого начала.
            </h1>
        </div>
    )
}

export default Second;