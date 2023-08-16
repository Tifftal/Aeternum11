import React, { useState, useTransition } from "react";
import "./bag.css"
import { useTranslation } from "react-i18next";

const Bag = () => {
    const [t] = useTranslation("global");

    const [clas, setClas] = useState('def');

    const HandleClick = (e) => {
        const newClas = clas === "def" ? "act" : "def";
        setClas(newClas)
    };

    return (
        <div className="bag">
            <button className={clas} onClick={HandleClick}>{clas}</button>
        </div>
    )
}

export default Bag;