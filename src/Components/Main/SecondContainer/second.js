import React from "react";
import './second.css';
import { useTranslation } from "react-i18next";

import MenuCard from "../../../Entities/MenuCards/MenuCard";
import { getData } from "./lib/data";
import { Carousel } from "../../Carousel/Carousel";

const Second = () => {
    const [t] = useTranslation("global");
    const data = getData(t);

    return (
        <div className="second">
            <div className="menu font-gramatika-bold">
                {window.innerWidth > 775 ?
                    (
                        data.map(card => (
                            <MenuCard data={card} />
                        )
                        )
                    )
                    : (
                        <Carousel items={data} />
                    )
                }
            </div>
            <h1>
                {t("second.text1")}
            </h1>
            <h1>
                {t("second.text2")}
            </h1>
        </div>
    )
}

export default Second;