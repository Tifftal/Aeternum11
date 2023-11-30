import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axiosConfig";
import { URI } from "../../api/config";

// ... (other imports)

const WishlistCard = ({ data, onRemove }) => {
    const [t] = useTranslation("global");
    const navigate = useNavigate();

    const handleDeleteFromWishlist = (id) => {
        onRemove(id); // Notify the parent component about the delete action
    }

    const redirectToItem = () => {
        // ... (unchanged code)
        navigate(`/product/${data.id}`); // Navigate to the specified product page
    }

    return (
        <div>
            <div className="wishlist-card">
                <img src="../../IMG/test.jpeg" alt="test" onClick={redirectToItem} style={{cursor: "pointer"}} />
                <div className="nameOfCloth">
                    <Link to={`/product/${data.id}`} style={{ textDecoration: "none", color: "white" }}>
                        <h1 className="wish-card-name">{data.name}</h1>
                    </Link>
                </div>
                <p>{data.cost} ₽ </p>
                <button className="removeBtn" onClick={() => {handleDeleteFromWishlist(data.id)}}>Remove</button>
            </div>
        </div>
    )
}

export default WishlistCard;
