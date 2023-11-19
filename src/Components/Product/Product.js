import React, { useState } from "react";
import "./Product.css";
import { useTranslation } from "react-i18next";

const Product = () => {
    const [t] = useTranslation("global");
    const [selectedImage, setSelectedImage] = useState("../../IMG/test.jpeg");

    const handleThumbnailClick = (image) => {
        setSelectedImage(image);
    };

    return (
        <div className="product">
            <div className="scroll-panel">
                {/* Фото в скролл-панели */}
                <img
                    src="../../IMG/TEST.png"
                    alt="thumbnail"
                    onClick={() => handleThumbnailClick("../../IMG/TEST.png")}
                />
                <img
                    src="../../IMG/test.jpeg"
                    alt="thumbnail"
                    onClick={() => handleThumbnailClick("../../IMG/test.jpeg")}
                />
                <img
                    src="../../IMG/TEST.png"
                    alt="thumbnail"
                    onClick={() => handleThumbnailClick("../../IMG/TEST.png")}
                />
                <img
                    src="../../IMG/TEST.png"
                    alt="thumbnail"
                    onClick={() => handleThumbnailClick("../../IMG/TEST.png")}
                />
                <img
                    src="../../IMG/test.jpeg"
                    alt="thumbnail"
                    onClick={() => handleThumbnailClick("../../IMG/test.jpeg")}
                />
                {/* ... добавьте другие фото по аналогии */}
            </div>
            <div className="product-photo">
                {/* Основное изображение */}
                <img src={selectedImage} alt="main-product" />
            </div>
            <div className="product-info">
                <h2 className="font-gramatika-bold">Category</h2>
                <h1>Name BXBjsbxsbk</h1>
                <p>₽ 1500</p>
                <button className="liked">
                    <img src="../../IMG/icons8-закладка-100.png" alt="icon-down" />
                </button>
                <div className="chooseColor">
                    <button style={{ backgroundColor: "yellow" }}></button>
                    <button style={{ backgroundColor: "green" }}></button>
                    <button style={{ backgroundColor: "blue" }}></button>
                    <button style={{ backgroundColor: "black" }}></button>
                    <button style={{ backgroundColor: "brown" }}></button>
                </div>
                <h3 className="color">Red</h3>
                <select className="productSize">
                    <option>26</option>
                    <option>27</option>
                    <option>28</option>
                    <option>29</option>
                    <option>30</option>
                </select>
                <button className="addToBagBtn font-gramatika-bold">Add to Bag</button>
            </div>
        </div>
    );
};

export default Product;
