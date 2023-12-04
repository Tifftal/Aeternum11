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
                    <h2>рекомендуем</h2>
                    <h1 className="font-gramatika-bold">Lorem ipsum dolor</h1>
                    <p className="font-gramatika-reg">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                    <a href="/"><button className="font-gramatika-bold">узнать больше</button></a>
                </div>
            </div>
        </div>
    )
}

export default Third;