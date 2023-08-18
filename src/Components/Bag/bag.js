import React, { useState, useTransition } from "react";
import "./bag.css"
import { useTranslation } from "react-i18next";

const Bag = () => {
    const [t] = useTranslation("global");

    return (
        <div className="bag">
            bag
        </div>
    )
}

export default Bag;