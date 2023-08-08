import React from "react";
import './drop.css';
import { useTranslation } from "react-i18next";

const DropW = () => {

    const [t] = useTranslation("global");

    return (
        <div className="menuDrop">
            <div className="col">
                <h1>{t("drop.women.title1")}</h1>
                <a href="/"><button >{t("drop.women.el")}</button></a>
                <a href="/"><button >{t("drop.women.el")}</button></a>
                <a href="/"><button >{t("drop.women.el")}</button></a>
                <a href="/"><button >{t("drop.women.el")}</button></a>
            </div>
            <div className="col">
                <h1>{t("drop.women.title2")}</h1>
                <a href="/"><button >{t("drop.women.el")}</button></a>
                <a href="/"><button >{t("drop.women.el")}</button></a>
                <a href="/"><button >{t("drop.women.el")}</button></a>
            </div>
            <div className="col">
                <h1>{t("drop.women.title3")}</h1>
                <a href="/"><button >{t("drop.women.el")}</button></a>
                <a href="/"><button >{t("drop.women.el")}</button></a>
                <a href="/"><button >{t("drop.women.el")}</button></a>
                <a href="/"><button >{t("drop.women.el")}</button></a>
            </div>
        </div>
    )
}

export default DropW;