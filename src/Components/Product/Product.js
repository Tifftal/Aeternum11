import React, { useEffect, useState } from "react";
import "./Product.css";
import { useParams } from 'react-router-dom';
import { Minio, URI } from "../../api/config";
import api from "../../api/axiosConfig";
import LoadingText from "../Loader/Loader";
import Alert from "../Alert/Alert";

const Product = () => {
    const [selectedImage, setSelectedImage] = useState(null);
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

                setPhotosById(photos);
                try {
                    // eslint-disable-next-line
                    const selected = photos.sort((a, b) => a.position - b.position)
                    setSelectedImage(selected[0].image);
                } catch {
                    // console.error(error);
                }
            })
            .catch(err => {
                console.error(err);
            });
    }, [id]);

    // useEffect(() => {
    //     // This useEffect runs after the component is mounted
    //     const selectSingle = document.querySelector('.__select');
    //     const selectSingle_title = selectSingle.querySelector('.__select__title');
    //     const selectSingle_labels = selectSingle.querySelectorAll('.__select__label');

    //     // Toggle menu
    //     const handleToggleMenu = () => {
    //         if ('active' === selectSingle.getAttribute('data-state')) {
    //             selectSingle.setAttribute('data-state', '');
    //         } else {
    //             selectSingle.setAttribute('data-state', 'active');
    //         }
    //     };

    //     selectSingle_title.addEventListener('click', handleToggleMenu);

    //     // Close when click to option
    //     const handleOptionClick = (evt) => {
    //         selectSingle_title.textContent = evt.target.textContent;
    //         selectSingle.setAttribute('data-state', '');
    //     };

    //     for (let i = 0; i < selectSingle_labels.length; i++) {
    //         selectSingle_labels[i].addEventListener('click', handleOptionClick);
    //     }

    //     // Reset title
    //     const reset = document.querySelector('.reset');
    //     if (reset) {
    //         const handleResetClick = () => {
    //             selectSingle_title.textContent = selectSingle_title.getAttribute('data-default');
    //         };
    //         reset.addEventListener('click', handleResetClick);

    //         // Cleanup event listeners when the component is unmounted
    //         return () => {
    //             selectSingle_title.removeEventListener('click', handleToggleMenu);
    //             for (let i = 0; i < selectSingle_labels.length; i++) {
    //                 selectSingle_labels[i].removeEventListener('click', handleOptionClick);
    //             }
    //             reset.removeEventListener('click', handleResetClick);
    //         };
    //     }
    // }, []);




    return (
        <div className="product">
            {window.innerWidth > 768 ? (
                <div className="scroll-panel">
                    {photos.sort((a, b) => a.position - b.position)
                        .map((photo) => (
                            // eslint-disable-next-line
                            <img
                                onClick={() => { setSelectedImage(photo.image) }}
                                src={`${photo.image}`}
                                alt={`Image ${photo.id}`}
                            />
                        ))
                    }
                </div>
            ) : (null)}
            <div className="product-photo">
                {selectedImage === null ? (
                    <LoadingText />
                ) : (
                    <img src={selectedImage} alt="main-product" />
                )
                }
            </div>
            {window.innerWidth <= 768 ? (
                <div className="scroll-panel">
                    {photos.sort((a, b) => a.position - b.position)
                        .map((photo) => (
                            // eslint-disable-next-line
                            <img
                                onClick={() => { setSelectedImage(photo.image) }}
                                src={`${photo.image}`}
                                alt={`Image ${photo.id}`}
                            />
                        ))
                    }
                </div>
            ) : (null)}
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
                    Добавить в корзину
                </button>
                {error && <p style={{ color: "red" }} className="font-gramatika-bold">Выберите цвет товара и размер</p>}
                {data && data.description && (
                    <ul className="description">
                        {data.description.split(',').map((item, index) => (
                            <li key={index}>{item.trim()}</li>
                        ))}
                    </ul>
                )}
                <h5 className="compound" style={{ marginBottom: "20px" }}> Артикул: {data.vendorCode}</h5>
                <h5 className="compound" style={{ color: "gray" }}>Состав: </h5>
                <h5 className="compound" style={{ marginBottom: "20px" }}>{data.compound}</h5>
                <h5 className="compound" style={{ color: "gray" }}>Рекомендации по уходу: </h5>
                <h5 className="compound" style={{ marginBottom: "20px" }}>{data.recommendations}</h5>
                <h5 className="compound">{data.onModel}</h5>
            </div>
            {showAlert && <Alert message="Товар добавлен в корзину!" />}
            {showAlertWishlist && <Alert message="Товар добавлен в вишлист!" />}
        </div>
    );
};

export default Product;
