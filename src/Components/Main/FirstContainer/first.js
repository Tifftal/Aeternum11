import React from "react";
import './first.css';
import { useTranslation } from "react-i18next";

const First = () => {
    const [t] = useTranslation("global");

    return (
        <div className="first">
            
            <div className="text">
                <p>
                    {t("first.text1")}
                </p>
                <p>
                    {t("first.text2")}
                </p>
                <a className="BtnCatalog font-gramatika-bold" href="/assortment" ><button>{t("first.catalog")}</button></a>
            </div>
            <div className="image">
                <img src="../../IMG/Group 69.png" alt="Logo" />
            </div>
        </div>
    )
}

export default First;