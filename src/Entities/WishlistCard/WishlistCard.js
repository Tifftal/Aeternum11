import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import api from "../../api/axiosConfig";
import { URI } from "../../api/config";

const WishlistCard = ({ data }) => {
    const [t] = useTranslation("global");
    const handleDeleteFromWishlist = () => {
        api.delete(`${URI}/user/wishlist`, {
            id: data.id,
        }, {
            headers: {
                "Authorization": `Bearer ${window.localStorage.getItem("jwtToken")}`
            }

        })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            })
    }

    return (
        <div>
            <div className="wishlist-card">
                <img src="../../IMG/test.jpeg" alt="test" />
                <div className="nameOfCloth">
                    <Link to={`/product/${data.id}`} style={{ textDecoration: "none", color: "white" }}><h1>{data.name}</h1></Link>
                </div>
                <p>₽ {data.cost}</p>
                <button className="removeBtn" onClick={handleDeleteFromWishlist}>Remove</button>
            </div>
        </div>
    )
}

export default WishlistCard;