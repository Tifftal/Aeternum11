import React from "react";
import './drop.css';
import { useTranslation } from "react-i18next";

const DropUn = () => {

    const [t] = useTranslation("global");

    return (
        <div className="menuDrop">
            <div className="col">
                <h1>{t("drop.unisex.title4")}</h1>
                <a href="/"><button >{t("drop.unisex.el")}</button></a>
                <a href="/"><button >{t("drop.unisex.el")}</button></a>
                <a href="/"><button >{t("drop.unisex.el")}</button></a>
                <a href="/"><button >{t("drop.unisex.el")}</button></a>
            </div>
            <div className="col">
                <h1>{t("drop.unisex.title5")}</h1>
                <a href="/"><button >{t("drop.unisex.el")}</button></a>
                <a href="/"><button >{t("drop.unisex.el")}</button></a>
                <a href="/"><button >{t("drop.unisex.el")}</button></a>
            </div>
            <div className="col">
                <h1>{t("drop.unisex.title6")}</h1>
                <a href="/"><button >{t("drop.unisex.el")}</button></a>
                <a href="/"><button >{t("drop.unisex.el")}</button></a>
                <a href="/"><button >{t("drop.unisex.el")}</button></a>
                <a href="/"><button >{t("drop.unisex.el")}</button></a>
            </div>
        </div>
    )
}

export default DropUn;