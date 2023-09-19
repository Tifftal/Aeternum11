import React from "react";
import { useTranslation } from "react-i18next";

const WishlistCard = ({ data }) => {
    const [t] = useTranslation("global");

    return (
        <div>
            <div className="wishlist-card">
                <img src="../../IMG/test.jpeg" alt="test"/>
                <div className="nameOfCloth">
                    <h1>{data.h1.content}</h1>
                    <button><img src="../../IMG/icons8-закладка-100.png" alt="icon-down"/></button>
                </div>
                <p>₽ 4567</p>
                <div className="AddToBag">
                        <select className="sizeBtn">
                            <option>26</option>
                            <option>27</option>
                            <option>28</option>
                            <option>29</option>
                            <option>30</option>
                        </select>
                    <button className="toBag">Add to Bag</button>
                </div>
                <button className="removeBtn">Remove</button>
            </div>
        </div>
    )
}

export default WishlistCard;