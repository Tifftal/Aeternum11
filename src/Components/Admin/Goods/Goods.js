import React, { useEffect, useState } from "react";
import './Goods.css';
import { URI } from "../../../api/config";
import api from "../../../api/axiosConfig";
import Popup from "./Popup/Popup";
import EditPopup from "./Popup/EditPopup";

const Goods = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [data, setData] = useState([]);
    const [free, setFree] = useState([]);
    const [categories, setCategories] = useState([{
        id: 0,
        name: ""
    }]);
    const [selectedGood, setSelectedGood] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenEditPopupSize, setIsOpenEditPopupSize] = useState(false);
    const [isOpenEditPopupColor, setIsOpenEditPopupColor] = useState(false);
    const [isOpenEditPopupImage, setIsOpenEditPopupImage] = useState(false);
    const [photosById, setPhotosById] = useState([]);
    const [count, setCount] = useState(0);

    const [inputGroupsColor, setInputGroupsColor] = useState(1);
    const [inputGroupsSize, setInputGroupsSize] = useState([]);

    const [currentGoodId, setCurrentGoodId] = useState(null);
    const [colorFormData, setColorFormData] = useState([]);
    const [position, setPosition] = useState(0);

    const HandleOpenNote = (good) => {
        setSelectedGood(good);
        setIsOpen(true);
    };

    const HandleCloseNote = () => {
        setIsOpen(false);
    };

    const handleImageChange = (e) => {
        setSelectedImage(e.target.files[0]);
    }

    const fetchPhotos = async (goodId) => {
        const photos = [];

        try {
            const response = await api.get(`${URI}/good/${goodId}`);
            const good = response.data;

            // Assuming you are using async/await, make the function async
            const fetchPhoto = async (photo) => {
                try {
                    const response = await api.get(`${URI}/photo/${photo.id}`, {
                        responseType: 'arraybuffer', // Important: set responseType to arraybuffer
                    });

                    const blob = new Blob([response.data], { type: 'image/jpeg' }); // Adjust type based on your file type
                    const imageUrl = URL.createObjectURL(blob);

                    photos.push({
                        position: photo.position,
                        id: photo.id,
                        image: imageUrl,
                    });
                } catch (error) {
                    console.error(error);
                }
            };

            // Map through each photo and fetch the image
            const fetchPromises = good.photos.map(fetchPhoto);

            // Wait for all fetches to complete before updating state
            await Promise.all(fetchPromises);

            setPhotosById(photos);
            let newCount = count;
            newCount++;
            setCount(newCount);
        } catch (error) {
            console.error(error);
        }
    };


    const handleImageUpload = async () => {
        if (!selectedImage) {
            return;
        }

        if (position === 0) {
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedImage);
        formData.append('position', position);

        try {
            await api.post(`${URI}/good/${currentGoodId}/photo`, formData, {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Fetch photos after uploading the new image
            await fetchPhotos(currentGoodId);
        } catch (error) {
            console.error("Error uploading image: ", error);
        }

        let newCount = count;
        newCount++;
        setCount(newCount);
    };

    const handleDeleteImage = (photoId) => {
        api.delete(`${URI}/photo/${photoId}`, {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
            }
        })
            .then(() => {

                // Update local state by removing the deleted photo
                setPhotosById(prevPhotos => prevPhotos.filter(photo => photo.id !== photoId));
            })
            .catch(error => {
                console.error(error);
            });
    };


    const HandleOpenEditPopupColor = (good) => {
        setIsOpenEditPopupColor(true);
        setCurrentGoodId(good.id);
        setColorFormData(good.colors);
        setInputGroupsColor(good.colors.length);
    };

    const HandleOpenEditPopupImages = async (good) => {
        setPhotosById([])


        // Fetch photos when opening the edit popup
        setIsOpenEditPopupImage(true);
        setCurrentGoodId(good.id);
        await fetchPhotos(good.id);

    };


    const HandleCloseEditPopupImage = () => {
        setIsOpenEditPopupImage(false);
        setCurrentGoodId(null);
    }

    const HandleCloseEditPopupColor = () => {
        setIsOpenEditPopupColor(false);
        setInputGroupsColor(1);
        setCurrentGoodId(null);
    };

    const HandleOpenEditPopupSize = (good) => {
        setSelectedGood(good);
        setIsOpenEditPopupSize(true);
        const sizes = [];
        good.colors.forEach((color) => {
            sizes.push(color.sizes.length)
        })
        setInputGroupsSize(sizes)
    };

    const HandleCloseEditPopupSize = () => {
        setIsOpenEditPopupSize(false);
        setInputGroupsSize(1);
        setCurrentGoodId(null);
    };

    useEffect(() => {
        api.get(`${URI}/sections`)
            .then(response => {
                const categories = response.data.flatMap(section => section.categories.map(category => category.id));
                const catArray = response.data.flatMap(section => section.categories.map(category => ({
                    id: category.id,
                    name: category.name
                })));
                setCategories(catArray);
                const requests = categories.map(category => (
                    api.get(`${URI}/category/${category}/goods`)
                        .then(response => ({
                            categoryName: response.data.name,
                            goodsByCategory: response.data.goods.content,
                        }))
                        .catch(err => {
                            console.error(err);
                            return null;
                        })
                ));

                Promise.all(requests)
                    .then(categoryGoodsArray => {
                        const validCategoryGoods = categoryGoodsArray.filter(categoryGoods => categoryGoods !== null);
                        setData(validCategoryGoods);

                        // Обновляем значение categories
                        const updatedCategories = response.data.flatMap(section => section.categories.map(category => ({
                            id: category.id,
                            name: category.name
                        })));
                        setCategories(updatedCategories);
                    })
                    .catch(err => {
                        console.error(err);
                    });

            })
            .catch(err => {
                console.error(err);
            });
        api.get(`${URI}/goods/free`)
            .then(response => {
                const filteredGoods = response.data.content.filter(good => good.state !== "DELETED")
                setFree(filteredGoods)
            })
            .catch(err => {
                console.error(err);
            });
    }, [count]);

    useEffect(() => {

    })

    const UpdateData = () => {
        api.get(`${URI}/sections`)
            .then(response => {
                const categories = response.data.flatMap(section => section.categories.map(category => category.id));

                const requests = categories.map(category => (
                    api.get(`${URI}/category/${category}/goods`)
                        .then(response => ({
                            categoryName: response.data.name,
                            goodsByCategory: response.data.goods.content,
                        }))
                        .catch(err => {
                            console.error(err);
                            return null;
                        })
                ));

                Promise.all(requests)
                    .then(categoryGoodsArray => {
                        const validCategoryGoods = categoryGoodsArray.filter(categoryGoods => categoryGoods !== null);
                        setData(validCategoryGoods);
                    })
                    .catch(err => {
                        console.error(err);
                    });
            })
            .catch(err => {
                console.error(err);
            });
        // let newCount = count;
        // newCount++
        // setCount(newCount)
    };

    const handleDeleteGood = (id) => {
        // let newCount = count;
        // newCount++
        // setCount(newCount)
        api.delete(`${URI}/good/${id}`, {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
            }
        },
            {

            })
            .then(response => {
                let newCount = count;
                newCount++
                setCount(newCount)
                UpdateData();
            })
            .catch(err => {
                console.error(err);
            });
    };

    const handleCategoryChange = (e, good_id, goodState) => {
        if (goodState !== "ACTIVE") {
            alert("Товар не активен. Невозможно изменить категорию.");
            return;
        }

        const selectedCategoryId = e.target.value;
        const selectedCategory = categories.find((category) => category.id === parseInt(selectedCategoryId));

        if (selectedCategory) {
            api
                .put(
                    `${URI}/good/${good_id}/categories`,
                    [
                        {
                            id: selectedCategoryId,
                        },
                    ],
                    {
                        headers: {
                            Authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
                        },
                    }
                )
                .then(() => {

                    let newCount = count;
                    newCount++
                    setCount(newCount)
                })
                .catch((err) => {
                    console.error(err);
                });
        }
        UpdateData();
    };


    const AddGood = () => {
        api.post(`${URI}/good`,
            {
                name: 'Название',
                description: 'Описание',
                compound: 'Состав',
                cost: 0,
                onModel: 'S',
                vendorCode: '000000',
                recommendations: 'Рекомендации по уходу',
                backColor: {
                    name: 'Чёрный',
                    code: 'black',
                },
                colors: [
                    {
                        name: 'Чёрный',
                        code: 'black',
                        sizes: [
                            {
                                size: 'Размер',
                                sizeStatus: 'IN_STOCK',
                            },
                        ],
                    },
                ],
                sizes: [
                    {
                        size: 'Размер',
                        sizeStatus: 'IN_STOCK',
                    },
                ],
            },
            {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
                },
            }
        )
            .then(response => {

                let newCount = count;
                newCount++
                setCount(newCount)
                UpdateData();
            })
            .catch(err => {
                console.error(err);
            });

    }

    const handleAddInputColor = (e) => {
        e.preventDefault();
        setInputGroupsColor(prevGroups => prevGroups + 1);
    };

    const handleAddInputSize = (colorIndex) => {
        let newCount = count;
        newCount++;
        setCount(newCount);
        const prev = inputGroupsSize;
        prev[colorIndex] += 1;
        setInputGroupsSize(prev);
    };


    const handleInputChangeColor = (e, index, type) => {
        const newData = [...colorFormData];
        newData[index] = {
            ...newData[index],
            [type]: e.target.value
        };
        setColorFormData(newData);
    };

    const handleChangePosition = (e) => {
        setPosition(e.target.value);
    }

    const handleColorSubmit = (e) => {
        e.preventDefault();

        const colors = colorFormData.map(data => ({
            name: data.name.trim(),
            code: data.code.trim(),
            sizes: [
                {
                    size: "0",
                    sizeStatus: "IN_STOCK"
                }
            ]
        }));



        api.put(
            `${URI}/good/${currentGoodId}/colors`,
            { colors: colors },
            {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
                },
            }
        )
            .then(() => {

                let newCount = count;
                newCount++
                setCount(newCount)
            })
            .catch(err => {
                console.error(err);
            });

        UpdateData();

        setColorFormData([]);
        HandleCloseEditPopupColor();
    };

    const handleSizeSubmit = (e) => {
        e.preventDefault();

        const formData = [];
        selectedGood.colors.forEach((color, colorIndex) => {
            const colorData = {
                name: color.name,
                code: color.code,
                sizes: [],
            };

            for (let index = 0; index < inputGroupsSize[colorIndex]; index++) {
                const sizeValue = document.getElementById(`size${colorIndex}-${index}`).value;
                const sizeStatusValue = document.getElementById(`sizeStatus${colorIndex}-${index}`).value;

                colorData.sizes.push({
                    size: sizeValue,
                    sizeStatus: sizeStatusValue,
                });
            }

            formData.push(colorData);
        });

        api.put(
            `${URI}/good/${selectedGood.id}/colors`,
            { colors: formData },
            {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
                },
            }
        )
            .then(response => {
                let newCount = count;
                newCount++
                setCount(newCount)
            })
            .catch(err => {
                console.error(err);
            });

        UpdateData();


        HandleCloseEditPopupSize();

    };

    const handleActivate = (id) => {
        api.post(`${URI}/good/${id}/activate`,
            {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
                },
            }
        )
            .then(() => {
                let newCount = count;
                newCount++
                setCount(newCount)
                UpdateData();
            })
            .catch(err => {
                console.error(err);
            });
    }



    return (
        <div className="goodsAdmin">
            {isOpen && (
                <Popup
                    onClose={HandleCloseNote}
                    setIsOpen={setIsOpen}
                    selectedGood={selectedGood}
                    count={count}
                    setCount={setCount}
                    onDataUpdate={() => {
                        UpdateData();
                    }}
                    width="35vw"
                />
            )}

            {isOpenEditPopupSize && (
                <EditPopup
                    title="Редактировать размеры товара"
                    width="50vw"
                    onClose={HandleCloseEditPopupSize}
                    setIsOpen={setIsOpenEditPopupSize}
                    selectedGood={selectedGood}
                >
                    <form className="form-edit-popup-size" onSubmit={(e) => e.preventDefault()}>
                        {selectedGood.colors.map((color, colorIndex) => (
                            <div key={colorIndex} className="color-div">
                                <div className="color-info">
                                    <p style={{ backgroundColor: color.code, color: color.code === 'white' ? 'black' : 'inherit' }}>
                                        {color.name}
                                    </p>
                                    <div className="size-block">
                                        {Array.from({ length: inputGroupsSize[colorIndex] }).map((_, index) => (
                                            <div key={index}>
                                                <div className="input-size-div">
                                                    <div className="input-size">
                                                        <label htmlFor={`size${colorIndex}-${index}`}>Размер:</label>
                                                        <input
                                                            id={`size${colorIndex}-${index}`}
                                                            className='input-edit-size'
                                                            defaultValue={color.sizes[index]?.size || ''}
                                                        />
                                                    </div>
                                                    <div className="input-size">
                                                        <label htmlFor={`sizeStatus${colorIndex}-${index}`}>Статус размера:</label>
                                                        <select
                                                            id={`sizeStatus${colorIndex}-${index}`}
                                                            className="input-edit-size-label"
                                                            defaultValue={color.sizes[index]?.sizeStatus || 'IN_STOCK'}
                                                        >
                                                            <option>IN_STOCK</option>
                                                            <option>OUT_OF_STOCK</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        <button className='addInputBtn' onClick={() => handleAddInputSize(colorIndex)}>+</button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <button className='goodBtn font-gramatika-bold' onClick={handleSizeSubmit}>Сохранить</button>
                    </form>
                </EditPopup>
            )}

            {isOpenEditPopupImage && (
                <EditPopup
                    title="Редактировать закрепленные изображения"
                    width="50vw"
                    onClose={HandleCloseEditPopupImage}
                    setIsOpen={setIsOpenEditPopupImage}
                    selectedGood={selectedGood}
                >
                    <form className="form-edit-popup-size" onSubmit={(e) => e.preventDefault()}>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                            <input
                                type="text"
                                placeholder="каким отображать?"
                                onChange={handleChangePosition}
                                required
                            />
                        </div>
                        <div className="existing-images" style={{ overflowX: 'auto', whiteSpace: 'nowrap', height: "420px" }}>
                            <h3>Фотографии</h3>
                            <div style={{ display: 'flex', alignItems: "center", justifyContent: "" }}>
                                {photosById
                                    .sort((a, b) => a.position - b.position) // Sort by position in ascending order
                                    .map((photo) => (
                                        <div key={photo.id} style={{ marginRight: '10px' }}>
                                            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                                <img
                                                    src={`${photo.image}`}
                                                    alt={`${photo.id}`}
                                                    style={{ maxWidth: '175px', maxHeight: 'auto' }}
                                                />
                                            </div>
                                            <h3>{photo.position}</h3>
                                            <button onClick={() => { handleDeleteImage(photo.id) }}>Удалить</button>
                                        </div>
                                    ))}
                            </div>
                        </div>
                        <button className='goodBtn font-gramatika-bold' onClick={handleImageUpload}>Сохранить</button>
                    </form>
                </EditPopup>
            )}


            {isOpenEditPopupColor && (
                <EditPopup
                    onClose={HandleCloseEditPopupColor}
                    setIsOpen={setIsOpenEditPopupColor}
                    // selectedGood={selectedGood}
                    title="Редактировать цвета товара"
                    width="30vw"
                >
                    <form className="form-edit-popup">
                        {Array.from({ length: inputGroupsColor }).map((_, index) => (
                            <div key={index} className='edit-group-popup-color'>
                                <div className='edit-group'>
                                    <div className="edit-group-div">
                                        <label htmlFor={`name${index}`} className=''>Цвет:</label>
                                        <input
                                            id={`name${index}`}
                                            className='input-edit-color'
                                            onChange={(e) => handleInputChangeColor(e, index, 'name')}
                                            value={colorFormData[index]?.name || ''}  // Предзаполнение значением name
                                        />
                                    </div>
                                    <div className="edit-group-div">
                                        <label htmlFor={`code${index}`} className=''>Код цвета:</label>
                                        <input
                                            id={`code${index}`}
                                            className='input-edit-color'
                                            onChange={(e) => handleInputChangeColor(e, index, 'code')}
                                            value={colorFormData[index]?.code || ''}  // Предзаполнение значением code
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}


                        <button className='addInputBtn' onClick={handleAddInputColor}>+</button>
                        <button className='goodBtn font-gramatika-bold' style={{ alignSelf: "flex-start" }} onClick={handleColorSubmit}>Сохранить</button>
                    </form>

                </EditPopup>
            )}

            <div className="AddGoodAdmin">
                <button className="AddBtnAdmin" onClick={AddGood}>Добавить товар</button>
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th colSpan="9" style={{ backgroundColor: "rgba(217, 217, 217, 0.2)", textAlign: "center", fontSize: "100%" }}>Товары без категории</th>
                    </tr>
                    <tr>
                        <th></th>
                        <th>Название</th>
                        <th>Цена</th>
                        <th>Изображение</th>
                        <th>Статус</th>
                        <th>Цвета</th>
                        <th>Размеры</th>
                        <th>Категория</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {free.map(good => (
                        <tr key={good.id}>
                            <td style={{ width: "5%" }}><button onClick={() => HandleOpenNote(good)} className="edit"><img src="../../IMG/icons8-редактировать-144.png" alt="edit icon" /></button></td>
                            <td style={{ width: "20%" }}>{good.name}</td>
                            <td style={{ width: "5%" }}> {good.cost} ₽</td>
                            <td style={{ width: "10%" }}><button className="editSize" onClick={() => HandleOpenEditPopupImages(good)}>Изменить изображения</button></td>
                            <td style={{ width: "10%" }}>
                                {good.state === "DRAFT" ? (
                                    <div>
                                        DRAFT
                                        <button className="activate" onClick={() => handleActivate(good.id)}>Активировать</button>
                                    </div>
                                ) : (
                                    `${good.state}`
                                )}
                            </td>
                            <td style={{ width: "15%" }}><button className="editSize" onClick={() => HandleOpenEditPopupColor(good)}>Изменить цвета</button></td>
                            <td style={{ width: "10%" }}><button className="editSize" onClick={() => HandleOpenEditPopupSize(good)}>Изменить размеры</button></td>
                            <td style={{ width: "20%" }}>
                                <form>
                                    <select onChange={(e) => handleCategoryChange(e, good.id, good.state)}>
                                        <option disabled selected value="">
                                            Выберите категорию
                                        </option>
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </form>
                            </td>
                            <td style={{ width: "5%" }}><button onClick={() => handleDeleteGood(good.id)} className="edit" style={{ backgroundColor: "#472828" }}><img src="../../IMG/icons8-крестик-78.png" style={{ filter: "invert(1)" }} alt="delete icon" /></button></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {data.map(category => (
                <React.Fragment key={category.categoryName}>
                    <table className="table">
                        <thead>
                            <tr>
                                <th colSpan="8" style={{ backgroundColor: "rgba(217, 217, 217, 0.2)", textAlign: "center", fontSize: "100%" }}>{category.categoryName}</th>
                            </tr>
                            <tr>
                                <th></th>
                                <th>Название</th>
                                <th>Цена</th>
                                <th>Изображение</th>
                                <th>Статус</th>
                                <th>Цвета</th>
                                <th>Размеры</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {category.goodsByCategory.map(good => (
                                <tr key={good.id}>
                                    <td style={{ width: "5%" }}><button onClick={() => HandleOpenNote(good)} className="edit"><img src="../../IMG/icons8-редактировать-144.png" alt="edit icon" /></button></td>
                                    <td style={{ width: "40%" }}>{good.name}</td>
                                    <td style={{ width: "10%" }}>{good.cost} ₽</td>
                                    <td style={{ width: "10%" }}><button className="editSize" onClick={() => HandleOpenEditPopupImages(good)}>Изменить изображения</button></td>
                                    <td style={{ width: "10%" }}>{good.state}</td>
                                    <td style={{ width: "15%" }}><button className="editSize" onClick={() => HandleOpenEditPopupColor(good)}>Изменить цвета</button></td>
                                    <td style={{ width: "15%" }}><button className="editSize" onClick={() => HandleOpenEditPopupSize(good)}>Изменить размеры</button></td>
                                    <td style={{ width: "5%" }}><button onClick={() => handleDeleteGood(good.id)} style={{ backgroundColor: "#472828" }} className="edit"><img src="../../IMG/icons8-крестик-78.png" style={{ filter: "invert(1)" }} alt="delete icon" /></button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </React.Fragment>
            ))}
        </div>
    );
}

export default Goods;
