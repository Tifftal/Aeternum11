import React, { useState } from "react";
import './Address.css';
import { useTranslation } from "react-i18next";

const Address = () => {
    const [t] = useTranslation("global");

    return (
        <div className="address">
            <h2 className="font-gramatika-bold">{t("create_account.title1")}</h2>
            <h1>Addresses</h1>
            <div className="addedAddresses">
                <h3 className="font-gramatika-bold">Added addresses</h3>
                <div className="cardAddress">
                    <h4>Title</h4>
                    <div className="addressInCard">
                        <p>Varvara Talankina</p>
                        <p>address</p>
                        <p>city</p>
                        <p>phone</p>
                    </div>
                    <div className="CardBtn">
                        <button>Remove</button>
                        <button>Edit</button>
                    </div>
                </div>
                <button className="AddBtn">+ Add New</button>
            </div>
        </div>
    )
}
export default Address;