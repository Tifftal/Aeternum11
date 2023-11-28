import React from "react";
import { useTranslation } from "react-i18next";

const AssortmentCard = ({ data }) => {
    const [t] = useTranslation("global");

    return (
        <div>
            <div className="assortment-card">
                <img src="../../IMG/TEST.PNG" alt="test"/>
                <div className="assortment-name">
                    <h1>{data.name}</h1>
                    {/* <button><img src="../../IMG/icons8-закладка-100.png" alt="icon-down"/></button> */}
                </div>
                <p>{data.cost} ₽</p>
            </div>
        </div>
    )
}

export default AssortmentCard;