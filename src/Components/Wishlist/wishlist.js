import React, { useEffect, useState } from "react";
import "./wishlist.css"
import { useTranslation } from "react-i18next";
import { getData } from "./lib/data_wishlist";
import WishlistCard from "../../Entities/WishlistCard/WishlistCard";
import api from "../../api/axiosConfig";
import { URI } from "../../api/config";

// ... (other imports)

const Wishlist = () => {
    const [t] = useTranslation("global");
    const [wishlist, setWishlist] = useState();

    useEffect(() => {
        api.get(`${URI}/user/me`, {
            headers: {
                "Authorization": `Bearer ${window.localStorage.getItem("jwtToken")}`
            }
        })
            .then(response => {
                const wishes = [...response.data.wishlist];
                console.log(response.data);
                let goodsInBag = [];
                wishes.map(wish => {
                    api.get(`${URI}/good/${wish.id}`, {
                        headers: {
                            "Authorization": `Bearer ${window.localStorage.getItem("jwtToken")}`
                        }
                    })
                        .then(response => {
                            goodsInBag.push(response.data);
                            console.log(response.data)
                            setWishlist(goodsInBag);
                        })
                        .catch(error => {
                            console.log(error);
                        })
                })
            })
            .catch(error => {
                console.error(error);
            })
    }, [])

    const handleRemoveFromWishlist = (wishId) => {
        // Update the state by removing the deleted item
        setWishlist((prevWishlist) => prevWishlist.filter((wish) => wish.id !== wishId));
        console.log(wishId);

        // Send API request to remove from the server (optional)
        api
            .delete(`${URI}/user/wishlist`, {
                data: {
                    id: wishId,
                },
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
                },
            })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.error(error);
            });
    };


    return (
        <div className="wishlist">
            <div className="menu_wishlist font-gramatika-bold">
                {wishlist?.map(wish => (
                    <WishlistCard key={wish.id} data={wish} onRemove={handleRemoveFromWishlist} />
                ))}
            </div>
        </div>
    )
}

export default Wishlist;
