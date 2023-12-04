import React, { useEffect, useState } from "react";
import "./wishlist.css"
import WishlistCard from "../../Entities/WishlistCard/WishlistCard";
import api from "../../api/axiosConfig";
import { URI } from "../../api/config";

// ... (other imports)

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        api.get(`${URI}/user/me`, {
            headers: {
                "Authorization": `Bearer ${window.localStorage.getItem("jwtToken")}`
            }
        })
            .then(response => {
                const wishes = [...response.data.wishlist];

                // Use Promise.all to wait for all asynchronous calls to complete
                Promise.all(
                    wishes.map(wish =>
                        api.get(`${URI}/good/${wish.id}`, {
                            headers: {
                                "Authorization": `Bearer ${window.localStorage.getItem("jwtToken")}`
                            }
                        })
                    )
                )
                    .then(responses => {
                        // responses is an array containing the data from all API calls
                        const goodsInBag = responses.map(response => response.data);
                        setWishlist(goodsInBag);
                    })
                    .catch(error => {
                        console.error(error);
                    });
            })
            .catch(error => {
                console.error(error);
            });
    }, []);


    const handleRemoveFromWishlist = (wishId) => {
        // Update the state by removing the deleted item
        setWishlist((prevWishlist) => prevWishlist.filter((wish) => wish.id !== wishId));


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
            .then(() => {

            })
            .catch((error) => {
                console.error(error);
            });
    };


    return (
        <div className="wishlist">
            {wishlist.length === 0 ? (
                <div className="empty-bag">
                    <p className="font-gramatika-reg">Ваш вишлист пуст</p>
                    <a href="/catalog"><button className="font-gramatika-bold">Перейти в каталог</button></a>
                </div>
            ) : (
                <div className="menu_wishlist">
                    {wishlist?.map(wish => (
                        <WishlistCard key={wish.id} data={wish} onRemove={handleRemoveFromWishlist} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default Wishlist;
