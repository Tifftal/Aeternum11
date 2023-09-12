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
                <a className="BtnCatalog font-gramatika-bold" href="/" ><button>{t("first.catalog")}</button></a>
            </div>
            <div className="image">
                {/* <img src="../../IMG/giphy.gif"/> */}
                <img src="../../IMG/Group 6.png" alt="Logo" />
                {/* <img src="../../IMG/Group 16.png" alt="Logo"/> */}
            </div>
        </div>
    )
}

export default First;