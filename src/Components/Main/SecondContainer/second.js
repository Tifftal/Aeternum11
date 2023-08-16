import React from "react";
import './second.css';
import { useTranslation } from "react-i18next";

import MenuCard from "../../../Entities/MenuCards/MenuCard";
import { getData } from "./lib/data";

const Second = () => {
    const [t] = useTranslation("global");
    const data = getData(t);

    return (
        <div className="second">
            <div className="menu">
                {
                    data.map(card => (
                        <MenuCard data={card} />
                    )
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