import React, { useEffect, useState } from "react";
import "./Product.css";
import { useTranslation } from "react-i18next";
import { useParams } from 'react-router-dom';
import { URI } from "../../api/config";
import api from "../../api/axiosConfig";

const Product = () => {
    const [t] = useTranslation("global");
    const [selectedImage, setSelectedImage] = useState("../../IMG/test.jpeg");
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColorSizes, setSelectedColorSizes] = useState([]);
    const [error, setError] = useState(false);

    const [data, setData] = useState({});
    const [category, setCategory] = useState({});
    const [color, setColor] = useState([]);
    const [size, setSize] = useState([]);

    const { id } = useParams();

    const handleThumbnailClick = (image) => {
        setSelectedImage(image);
    };

    const handleSetColor = (name) => {
        const selectedColorData = color.find(color => color.name === name);
        setSelectedColorSizes(selectedColorData.sizes);
        setSelectedColor(name);
        setSelectedSize('');
    }

    const handleSizeChange = (event) => {
        setSelectedSize(event.target.value);
    }

    const handleAddToBag = () => {
        if (selectedColor === '' || selectedSize === '') {
            setError(true);
        } else {
            setError(false);
            api.post(`${URI}/user/bag`, {
                goodId: id,
                amount: 1,
                sizeId: selectedSize,
            }, {
                headers: {
                    "Authorization": `Bearer ${window.localStorage.getItem("jwtToken")}`
                }
            });
        }
    }

    const handleAddToWishlist = () => {
        api.post(`${URI}/user/wishlist`, {
            id: id,
        }, {
            headers: {
                "Authorization": `Bearer ${window.localStorage.getItem("jwtToken")}`
            }
        });
    }

    useEffect(() => {
        api.get(`${URI}/good/${id}`)
            .then(response => {
                setData(response.data);
                setColor(response.data.colors);
                setSize(response.data.sizes);
                api.get(`${URI}/categories/${response.data.categoryIds[0].id}`)
                    .then(response => {
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
                {color.map((thumbnail, index) => (
                    <img
                        key={index}
                        src={thumbnail.path}
                        alt={`thumbnail-${index}`}
                        onClick={() => handleThumbnailClick(thumbnail.path)}
                    />
                ))}
            </div>
            <div className="product-photo">
                <img src={selectedImage} alt="main-product" />
            </div>
            <div className="product-info">
                <h2 className="font-gramatika-bold">{category.name}</h2>
                <h1>{data.name}</h1>
                <p>{data.cost} ₽</p>
                <button className="liked" onClick={handleAddToWishlist}>
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
                <select className="productSize" value={selectedSize} onChange={handleSizeChange}>
                    <option value="" disabled hidden>
                        Выберите размер
                    </option>
                    {selectedColorSizes.map((size, index) => (
                        <option key={index} value={size.id} disabled={size.sizeStatus === 'OUT_OF_STOCK'}>
                            {size.size} ({size.sizeStatus === "IN_STOCK" ? ("Есть в наличии") : ("Нет в наличии")})
                        </option>
                    ))}
                </select>
                <button className="addToBagBtn font-gramatika-bold" onClick={handleAddToBag}>
                    Add to Bag
                </button>
                {error && <p style={{ color: "red" }} className="font-gramatika-bold">Выберите цвет товара и размер</p>}
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
