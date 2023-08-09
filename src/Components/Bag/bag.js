import React, { useTransition } from "react";
import "./bag.css"
import { useTranslation } from "react-i18next";

const Bag = () => {
    const[t]=useTransition("global");

    return(
        <div className="bag">
            bag
        </div>
    )
}

export default Bag;