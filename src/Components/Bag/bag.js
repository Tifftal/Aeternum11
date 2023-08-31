import React, { useState, useTransition } from "react";
import "./bag.css"
import { useTranslation } from "react-i18next";

const Bag = () => {
    const [t] = useTranslation("global");

    return (
        <div className="bag">
            <div></div>
            <div className="sale">
                <div className="sale-card">
                    <div className="photo-sale">
                        <img src="../../IMG/timothy-dykes-xhuaL95bQ8Q-unsplash.jpg"/>
                    </div>
                    <div className="content-sale">
                        <div className="title-sale">
                            <h1>Title</h1>
                            <button>Edit</button>
                        </div>
                        <h2>Size</h2>
                        <h2>Colour</h2>
                        <div className="amount">
                            <button>Amount</button>
                            <h3>Price</h3>
                        </div>
                    </div>
                </div>
                <div className="sale-card">
                    Card
                </div>
                <div className="sale-card">
                    Card
                </div>
            </div>
            <div className="total">
                total
            </div>
        </div>
    )
}

export default Bag;