import React from "react";
import "./wishlist.css"
import { useTranslation } from "react-i18next";
import { getData } from "./lib/data_wishlist";
import WishlistCard from "../../Entities/WishlistCard/WishlistCard";

const Wishlist = () => {
    const [t] = useTranslation("global");
    const data = getData(t);

    return (
        <div className="wishlist">
            <div className="menu_wishlist font-gramatika-bold">
                {
                    data.map(card => (
                        <WishlistCard data={card} />
                    )
                    )
                }
            </div>
        </div>
    )
}

export default Wishlist;