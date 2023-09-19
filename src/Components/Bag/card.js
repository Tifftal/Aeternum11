import React, { useState, useTransition } from "react";
import "./card.css"
import { useTranslation } from "react-i18next";

const Card = () => {
    const [t] = useTranslation("global");

    return (
                <div className="sale-card">
                    <div className="photo-sale">
                        <img src="../../IMG/timothy-dykes-xhuaL95bQ8Q-unsplash.jpg" />
                    </div>
                    <div className="content-sale">
                        <div className="title-sale">
                            <h1>Title</h1>
                            <button>{t("card.edit")}</button>
                        </div>
                        <div className="size-colour">
                            <h2>{t("card.size")}</h2>
                            <h2>{t("card.colour")}</h2>
                        </div>
                        <div className="amount">
                            <div className="amountBtn">
                                <button>-</button>
                                <h4>1</h4>
                                <button>+</button>
                            </div>
                            <h3>₽ 20.900</h3>
                        </div>
                    </div>
                </div>
    )
}

export default Card;