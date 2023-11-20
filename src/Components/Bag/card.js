import React, { useState, useTransition } from "react";
import "./card.css"
import { useTranslation } from "react-i18next";
import api from "../../api/axiosConfig";
import { URI } from "../../api/config";

const Card = ({ good, goods }) => {
    const [t] = useTranslation("global");
    const handleDeleteCard = () => {
        api.delete(`${URI}/user/bag`, {
            goodId: good.id,
        }, {
            headers: {
                "Authorization": `Bearer ${window.localStorage.getItem("jwtToken")}`
            }
        })
            .then(() => {
                const indexToRemove = goods.indexOf(good);
                if (indexToRemove !== -1) {
                    goods.splice(indexToRemove, 1);
                }

            })
            .catch(error => {
                console.error(error);
            })
    }

    return (
        <div className="sale-card">
            <div className="photo-sale">
                <img src="../../IMG/timothy-dykes-xhuaL95bQ8Q-unsplash.jpg" />
            </div>
            <div className="content-sale">
                <div className="title-sale">
                    <h1>{good.name}</h1>
                    <button onClick={handleDeleteCard}>Удалить</button>
                </div>
                <div className="size-colour">
                    <h2>{t("card.size")}</h2>
                    <h2>{t("card.colour")}</h2>
                </div>
                <div className="price">
                    {/* <div className="amountBtn">
                                <button>-</button>
                                <h4>1</h4>
                                <button>+</button>
                            </div> */}
                    <h3>Цена: ₽ 20.900</h3>
                </div>
            </div>
        </div>
    )
}

export default Card;