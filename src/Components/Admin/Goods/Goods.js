import React, { useEffect, useState } from "react";
import './Goods.css';
import { useTranslation } from "react-i18next";
import { URI } from "../../../api/config";
import api from "../../../api/axiosConfig";
import Popup from "./Popup/Popup";
import EditPopup from "./Popup/EditPopup";
import { unstable_renderSubtreeIntoContainer } from "react-dom";

const Goods = () => {
    const [t] = useTranslation("global");
    const [data, setData] = useState([]);
    const [free, setFree] = useState([]);
    const [categories, setCategories] = useState({
        id: 0,
        name: ""
    });
    const [selectedGood, setSelectedGood] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenEditPopupSize, setIsOpenEditPopupSize] = useState(false);
    const [isOpenEditPopupColor, setIsOpenEditPopupColor] = useState(false);

    const [inputGroupsColor, setInputGroupsColor] = useState(1);
    const [inputGroupsSize, setInputGroupsSize] = useState([]);
    const [sizeFormData, setSizeFormData] = useState([]);
    const [currentGoodId, setCurrentGoodId] = useState(null);
    const [colorFormData, setColorFormData] = useState([]);


    const HandleOpenNote = (good) => {
        setSelectedGood(good);
        setIsOpen(true);
    };

    const HandleCloseNote = () => {
        setIsOpen(false);
    };

    const HandleOpenEditPopupColor = (good) => {
        setIsOpenEditPopupColor(true);
        setCurrentGoodId(good.id);
        setColorFormData(good.colors);
        setInputGroupsColor(good.colors.length);
    };

    const HandleCloseEditPopupColor = () => {
        setIsOpenEditPopupColor(false);
        setInputGroupsColor(1);
        setCurrentGoodId(null);
    };


    const HandleOpenEditPopupSize = (good) => {
        console.log(good)
        setSelectedGood(good);
        setIsOpenEditPopupSize(true);
        const sizes = [];
        good.colors.map((color) => {
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
                setFree(response.data.content)
            })
            .catch(err => {
                console.error(err);
            });
    }, [data]);

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
    };

    const handleDeleteGood = (id) => {
        api.delete(`${URI}/good/${id}`)
            .then(response => {
                console.log(response);
                UpdateData();
            })
            .catch(err => {
                console.error(err);
            });
    };

    const handleCategoryChange = (e, good_id) => {
        const selectedCategoryId = e.target.value;
        const selectedCategory = categories.find(category => category.id === parseInt(selectedCategoryId));

        if (selectedCategory) {
            api.put(`${URI}/good/${good_id}/categories`,
                [
                    {
                        id: selectedCategoryId
                    }
                ],
                {
                    headers: {
                        Authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
                    },
                }
            )
                .then(response => {
                    console.log(response);
                })
                .catch(err => {
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
                console.log(response);
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

        console.log("Изменения для товара ID:", currentGoodId);
        console.log('Submitted Data after parsing:', colors);

        api.put(
            `${URI}/good/${currentGoodId}/colors`,
            { colors: colors },
            {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
                },
            }
        )
            .then(response => {
                console.log(response);
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

        console.log(formData);

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
                console.log(response);
            })
            .catch(err => {
                console.error(err);
            });

        UpdateData();

        setSizeFormData([]);
        HandleCloseEditPopupSize();

    };



    return (
        <div className="goodsAdmin">
            {isOpen && (
                <Popup
                    onClose={HandleCloseNote}
                    setIsOpen={setIsOpen}
                    selectedGood={selectedGood}
                    onDataUpdate={() => {
                        UpdateData();
                    }}
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
                                    <p style={{ backgroundColor: color.code }}>{color.name}</p>
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
                                                        <label htmlFor={`sizeStatus${colorIndex}-${index}`}>Статус размер:</label>
                                                        <select
                                                            id={`sizeStatus${colorIndex}-${index}`}
                                                            class="input-edit-size-label"
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
                        <th colSpan="8" style={{ backgroundColor: "rgba(217, 217, 217, 0.2)", textAlign: "center", fontSize: "100%" }}>Товары без категории</th>
                    </tr>
                    <tr>
                        <th></th>
                        <th>Название</th>
                        <th>Цена</th>
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
                            <td style={{ width: "30%" }}>{good.name}</td>
                            <td style={{ width: "5%" }}>{good.cost} ₽</td>
                            <td style={{ width: "10%" }}>{good.state}</td>
                            <td style={{ width: "15%" }}><button className="editSize" onClick={() => HandleOpenEditPopupColor(good)}>Изменить цвета</button></td>
                            <td style={{ width: "15%" }}><button className="editSize" onClick={() => HandleOpenEditPopupSize(good)}>Изменить размеры</button></td>
                            <td style={{ width: "20%" }}>
                                <form>
                                    <select onChange={(e) => handleCategoryChange(e, good.id)}>
                                        <option disabled selected value="">Выберите категорию</option>
                                        {categories.map(category => (
                                            <option key={category.id} value={category.id}>{category.name}</option>
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
                                <th colSpan="7" style={{ backgroundColor: "rgba(217, 217, 217, 0.2)", textAlign: "center", fontSize: "100%" }}>{category.categoryName}</th>
                            </tr>
                            <tr>
                                <th></th>
                                <th>Название</th>
                                <th>Цена</th>
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
