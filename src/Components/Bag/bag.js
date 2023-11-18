import React, { useState, useTransition } from "react";
import "./bag.css"
import { useTranslation } from "react-i18next";
import Card from "./card";

const Bag = () => {
    const [t] = useTranslation("global");

    return (
        <div className="bag">
            <div className="sale">
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
            <div className="total">
                <h1 className="font-gramatika-bold">{t("bag.summary")}</h1>
                <div className="purchase">
                    <div>
                        <p>{t("bag.subtotal")}</p>
                        <p>€2.650.00</p>
                    </div>
                    <div>
                        <p>{t("bag.shipping")}</p>
                        <p>Free</p>
                    </div>
                    <div>
                        <p>Est. Sales Tax</p>
                        <p>Included</p>
                    </div>
                    <div>
                        <p>{t("bag.total")}</p>
                        <p>€2.650.00</p>
                    </div>
                </div>
                <div className="promo">
                    <input placeholder="Promo Code"/>
                </div>
                <button className="font-gramatika-bold">{t("bag.continue")}</button>
            </div>
        </div>
    )
}

export default Bag;