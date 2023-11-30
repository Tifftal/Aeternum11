import React, { useEffect, useState } from "react";
import "./Product.css";
import { useTranslation } from "react-i18next";
import { useParams } from 'react-router-dom';
import { URI } from "../../api/config";
import api from "../../api/axiosConfig";
import LoadingText from "../Loader/Loader";

const Product = () => {
    const [t] = useTranslation("global");
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColorSizes, setSelectedColorSizes] = useState([]);
    const [error, setError] = useState(false);

    const [data, setData] = useState({});
    const [category, setCategory] = useState({});
    const [color, setColor] = useState([]);
    const [size, setSize] = useState([]);
    const [photos, setPhotosById] = useState([]);

    const { id } = useParams();

    const handleThumbnailClick = (image) => {
        setSelectedImage(image);
    };

    const handleSetColor = (name) => {
        const selectedColorData = color.find(color => color.name === name);
        setSelectedColorSizes(selectedColorData.sizes);
        setSelectedColor(name);
        // Clear selected size when changing color
        setSelectedSize('');
    }

    const handleSizeChange = (event) => {
        console.log(event.target.value);
        setSelectedSize(event.target.value);
    }

    const handleAddToBag = () => {
        console.log("COLOR", color)
        const choosenColor = color.filter(color => color.name === selectedColor)
        console.log(choosenColor);
        console.log(selectedSize)
        const choosenId = choosenColor[0].sizes.filter(size => size.size === selectedSize)
        if (selectedColor === '' || selectedSize === '') {
            setError(true);
        } else {
            setError(false);
            if (id && choosenId[0]?.id) {
                api.post(`${URI}/user/bag`, {
                    goodId: id,
                    amount: 1,
                    sizeId: choosenId[0].id,
                    // color: selectedColor, // Add the selected color
                }, {
                    headers: {
                        "Authorization": `Bearer ${window.localStorage.getItem("jwtToken")}`
                    }
                })
                    .catch(error => {
                        console.error(error);
                    })
            }
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
            .then(async response => {
                console.log(response)
                setData(response.data);
                setColor(response.data.colors);
                setSize(response.data.sizes);
                console.log("SIZES", response.data.colors)
                const allSizes = response.data.sizes.map(size => size.size);
                setSelectedColorSizes(response.data.colors[0].sizes);
                setSelectedColor(response.data.colors[0].name);
                console.log(allSizes);
                const good = response.data;
                const photos = [];
                const fetchPhoto = async (photo) => {
                    try {
                        const response = await api.get(`${URI}/photo/${photo.id}`, {
                            responseType: 'arraybuffer',
                        });
                        const blob = new Blob([response.data], { type: 'image/jpeg' });
                        const imageUrl = URL.createObjectURL(blob);

                        photos.push({
                            position: photo.position,
                            id: photo.id,
                            image: imageUrl,
                        })
                    }
                    catch (error) {
                        console.error(error);
                    }
                };

                const fetchPromises = good.photos.map(fetchPhoto);

                await Promise.all(fetchPromises)

                setPhotosById(photos);
                try {
                    const selected = photos.sort((a, b) => a.position - b.position)
                    setSelectedImage(photos[0].image);
                } catch {
                    // console.error(error);
                }
            })
            .catch(err => {
                console.error(err);
            });
    }, [id]);


    return (
        <div className="product">
            <div className="scroll-panel">
                {photos.sort((a, b) => a.position - b.position)
                    .map((photo) => (
                        <img
                            onClick={() => { setSelectedImage(photo.image) }}
                            src={`${photo.image}`}
                            alt={`Image ${photo.id}`}
                        />
                    ))
                }
            </div>
            <div className="product-photo">
                {selectedImage === null ? (
                    <LoadingText />
                ): (
                        <img src = { selectedImage } alt = "main-product" />
                )
                }
            </div>
            <div className="product-info">
                {/* <h2 className="font-gramatika-bold">{category.name}</h2> */}
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
                        <option key={index} value={size.size} disabled={size.sizeStatus === 'OUT_OF_STOCK'}>
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
