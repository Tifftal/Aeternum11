import React, { useEffect, useState } from "react";
import "./wishlist.css"
import { useTranslation } from "react-i18next";
import { getData } from "./lib/data_wishlist";
import WishlistCard from "../../Entities/WishlistCard/WishlistCard";
import api from "../../api/axiosConfig";
import { URI } from "../../api/config";

const Wishlist = () => {
    const [t] = useTranslation("global");
    const data = getData(t);
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        api.get(`${URI}/user/me`,
        {
            headers: {
                "Authorization": `Bearer ${window.localStorage.getItem("jwtToken")}`
            }
        })
        .then(response => {
            const wishes = [...response.data.wishlist];
            let goodsInBag = [];
            wishes.map(wish => {
                api.get(`${URI}/good/${wish.id}`,
                {
                    headers: {
                        "Authorization": `Bearer ${window.localStorage.getItem("jwtToken")}`
                    }
                })
                .then(response => {
                    goodsInBag.push(response.data);
                    setWishlist(goodsInBag);
                })
            })
            
        })
        .catch(error => {
            console.error(error);
        })
    }, [])

    return (
        <div className="wishlist">
            <div className="menu_wishlist font-gramatika-bold">
                {
                    wishlist.map(wish => (
                        <WishlistCard data={wish} />
                    )
                    )
                }
            </div>
        </div>
    )
}

export default Wishlist;