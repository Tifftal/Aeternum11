import React, { useEffect, useState } from "react";
import "./Product.css";
import { useTranslation } from "react-i18next";
import { useParams } from 'react-router-dom';
import { URI } from "../../api/config";
import api from "../../api/axiosConfig";

const Product = () => {
    const [t] = useTranslation("global");
    const [selectedImage, setSelectedImage] = useState("../../IMG/test.jpeg");
    const [selectedColor, setSelectedColor] = useState(null);

    const [data, setData] = useState({});
    const [category, setCategory] = useState({});
    const [color, setColor] = useState([]);
    const [size, setSize] = useState([]);

    const { id } = useParams();

    const handleThumbnailClick = (image) => {
        setSelectedImage(image);
    };

    const handleSetColor = (name) => {
        setSelectedColor(name);
    }

    useEffect(() => {
        api.get(`${URI}/good/${id}`)
            .then(response => {
                console.log(response);
                setData(response.data);
                setColor(response.data.colors);
                setSize(response.data.sizes);
                api.get(`${URI}/categories/${response.data.categoryIds[0].id}`)
                    .then(response => {
                        console.log(response);
                        setCategory(response.data);
                    })
                    .catch(err => {
                        console.error(err);
                    })
            })
            .catch(err => {
                console.error(err);
            })
    }, [id]);

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
                <h2 className="font-gramatika-bold">{category.name}</h2>
                <h1>{data.name}</h1>
                <p>₽ 1500</p>
                <button className="liked">
                    <img src="../../IMG/icons8-закладка-100.png" alt="icon-down" />
                </button>
                <div className="chooseColor">
                    {color.map((color, index) => (
                        <div
                            key={index}
                            className="checkbox"
                            style={{
                                backgroundColor: `${color.code}`,
                                border: `1px solid ${selectedColor === color.name ? 'dodgerblue' : '255, 255, 255, 0.5)'}`,
                            }}
                            onClick={() => handleSetColor(color.name)}
                        ></div>
                    ))}
                </div>
                <h3 className="color">{selectedColor}</h3>
                <select className="productSize">
                    {size.map((size, index) => (
                        <option key={index}>{size.size}</option>
                    ))}
                </select>
                <button className="addToBagBtn font-gramatika-bold">Add to Bag</button>
                <h5 className="compound">Состав: </h5>
                <h5 className="compound">{data.compound}</h5>
                {data && data.description && (
                    <ul className="description">
                        {data.description.split(',').map((item, index) => (
                            <li key={index}>{item.trim()}</li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Product;
