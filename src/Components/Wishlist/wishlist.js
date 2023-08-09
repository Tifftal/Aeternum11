import React, { useTransition } from "react";
import "./wishlist.css"
import { useTranslation } from "react-i18next";

const Wishlist = () => {
    const[t]=useTransition("global");

    return(
        <div className="wishlist">
            wishlist
        </div>
    )
}

export default Wishlist;