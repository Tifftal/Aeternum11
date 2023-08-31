import React from "react";
import "./third.css"
import { useTranslation } from "react-i18next";

const Third = () => {
    const [t] = useTranslation("global");

    return (
        <div className="third">
            <div className="poster">
                <div className="posterImg">
                </div>
                <div className="posterInfo font-gramatika-bold">
                    <h2>{t("third.title1")}</h2>
                    <h1>{t("third.title2")}</h1>
                    <p>{t("third.info")}</p>
                    <a href="/"><button>{t("third.btn")}</button></a>
                </div>
            </div>
        </div>
    )
}

export default Third;