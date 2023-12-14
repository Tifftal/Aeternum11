import React, { useEffect, useState } from "react";
import "./Product.css";
import { useParams } from 'react-router-dom';
import { Minio, URI } from "../../api/config";
import api from "../../api/axiosConfig";
import LoadingText from "../Loader/Loader";
import Alert from "../Alert/Alert";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";


const Product = () => {
    const [selectedImage, setSelectedImage] = useState({});
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColorSizes, setSelectedColorSizes] = useState([]);
    const [error, setError] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [showAlertWishlist, setShowAlertWishlist] = useState(false);

    const [data, setData] = useState({});
    // eslint-disable-next-line
    const [color, setColor] = useState([]);
    // eslint-disable-next-line
    const [size, setSize] = useState([]);
    const [photos, setPhotosById] = useState([]);

    const { id } = useParams();

    const handleChooseNextPhoto = (photo) => {
        // Implement your logic to choose the next photo
        // For simplicity, we'll just switch to the next photo in the array
        const currentIndex = photos.findIndex((p) => p.position === photo.position);
        const nextIndex = (currentIndex + 1) % photos.length;
        const nextPhoto = photos[nextIndex];
        console.log(nextPhoto);
        setSelectedImage({
            selected: nextPhoto.image,
            position: nextPhoto.position
        });
    };



    const handleSetColor = (name) => {
        const selectedColorData = color.find(color => color.name === name);
        setSelectedColorSizes(selectedColorData.sizes);
        setSelectedColor(name);
        // Clear selected size when changing color
        setSelectedSize('');
    }

    const handleSizeChange = (event) => {

        setSelectedSize(event.target.value);
    }

    const handleAddToBag = () => {

        const choosenColor = color.filter(color => color.name === selectedColor)


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
                    .then(() => {
                        setShowAlert(true);
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
        })
            .then(() => {
                setShowAlertWishlist(true);
            })
            .catch(error => console.error(error))
    }

    useEffect(() => {
        api.get(`${URI}/good/${id}`)
            .then(async response => {

                setData(response.data);
                setColor(response.data.colors);
                setSize(response.data.sizes);


                setSelectedColorSizes(response.data.colors[0].sizes);
                setSelectedColor(response.data.colors[0].name);

                const good = response.data;
                const photos = [];
                const fetchPhoto = async (photo) => {
                    try {

                        const imageUrl = `${Minio}/${photo.path}`

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
                setPhotosById(photos.sort((a, b) => a.position - b.position));
                try {
                    // eslint-disable-next-line
                    const selected = photos.sort((a, b) => a.position - b.position)
                    setSelectedImage({
                        selected: selected[0].image,
                        position: selected[0].position,
                    }
                    );
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
            {window.innerWidth > 768 ? (
                <div className="scroll-panel">
                    {photos.sort((a, b) => a.position - b.position)
                        .map((photo) => (
                            // eslint-disable-next-line
                            <img
                                onClick={() => {
                                    setSelectedImage({
                                        selected: photo.image,
                                        position: photo.position
                                    }
                                    )
                                }}
                                src={`${photo.image}`}
                                alt={`Image ${photo.id}`}
                            />
                        ))
                    }
                </div>
            ) : (null)}
            <div className="product-photo" onClick={() => handleChooseNextPhoto(selectedImage)}>
                {selectedImage === null ? (
                    <LoadingText />
                ) : (
                    <TransformWrapper
                        style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                        defaultScale={10}
                        defaultPositionX={0}
                        defaultPositionY={0}
                        wheel={{ step: 200 }}
                        doubleClick={{mode:"reset"}}
                    >
                        <TransformComponent style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <img
                                src={selectedImage.selected}
                                alt="main-product"
                                style={{ margin: "0 auto", cursor: "pointer" }}
                                onClick={() => handleChooseNextPhoto(selectedImage)}
                            />
                        </TransformComponent>
                    </TransformWrapper>
                )}
            </div>
            {window.innerWidth <= 768 ? (
                <div className="scroll-panel">
                    {photos.sort((a, b) => a.position - b.position)
                        .map((photo) => (
                            // eslint-disable-next-line
                            <img
                                onClick={() => { setSelectedImage({ selected: photo.image, position: photo.position }) }}
                                src={`${photo.image}`}
                                alt={`Image ${photo.id}`}
                            />
                        ))
                    }
                </div>
            ) : (null)}
            <div className="product-info">
                <h1 className="font-gramatika-bold">{data.name}</h1>
                <p className="font-gramatika-reg">{data.cost} ₽</p>
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
                <h3 className="color font-gramatika-reg">{selectedColor}</h3>
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
                    Добавить в корзину
                </button>
                {error && <p style={{ color: "red" }} className="font-gramatika-bold">Выберите цвет товара и размер</p>}
                {data && data.description && (
                    <ul className="description font-gramatika-reg">
                        {data.description.split(',').map((item, index) => (
                            <li key={index}>{item.trim()}</li>
                        ))}
                    </ul>
                )}
                <h5 className="compound font-gramatika-reg" style={{ marginBottom: "20px" }}> Артикул: {data.vendorCode}</h5>
                <h5 className="compound font-gramatika-reg" style={{ color: "gray" }}>Состав: </h5>
                <h5 className="compound font-gramatika-reg" style={{ marginBottom: "20px" }}>{data.compound}</h5>
                <h5 className="compound font-gramatika-reg" style={{ color: "gray" }}>Рекомендации по уходу: </h5>
                <h5 className="compound font-gramatika-reg" style={{ marginBottom: "20px" }}>{data.recommendations}</h5>
                <h5 className="compound font-gramatika-reg">{data.onModel}</h5>
            </div>
            {showAlert && <Alert message="Товар добавлен в корзину!" />}
            {showAlertWishlist && <Alert message="Товар добавлен в вишлист!" />}
        </div>
    );
};

export default Product;
