import React, { useEffect, useState } from "react";
import './Goods.css';
import { useTranslation } from "react-i18next";
import { URI } from "../../../api/config";
import api from "../../../api/axiosConfig";
import Popup from "./Popup/Popup";
import PopupAddGood from "./Popup/PopupAddGood";

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
    const [isOpenAddPopup, setIsOpenAddPopup] = useState(false);

    const HandleOpenNote = (good) => {
        setSelectedGood(good);
        setIsOpen(true);
    };

    const HandleCloseNote = () => {
        setIsOpen(false);
    };

    // const HandleOpenAddPopup = () => {
    //     setIsOpenAddPopup(true);
    // };

    // const HandleCloseAddPopup = () => {
    //     setIsOpenAddPopup(false);
    // };

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
                // console.log(response.data.content);
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
                // После успешного удаления, вызываем функцию UpdateData
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
            console.log("Selected Category ID:", selectedCategory.id);
            console.log("Selected Category Name:", selectedCategory.name);
            console.log("Selected Good ID:", good_id);

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
            })
            .catch(err => {
                console.error(err);
            });
            UpdateData();
    }

    return (
        <div className="goodsAdmin">
            {isOpen && (
                <Popup
                    onClose={HandleCloseNote}
                    setIsOpen={setIsOpen}
                    selectedGood={selectedGood}
                    onDataUpdate={() => {
                        // Обновить данные после успешного редактирования
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
                    }}
                />
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
                            <td style={{ width: "5%" }}><button onClick={() => HandleOpenNote(good)} className="edit"><img src="../../IMG/icons8-редактировать-144.png" /></button></td>
                            <td style={{ width: "30%" }}>{good.name}</td>
                            <td style={{ width: "5%" }}>{good.cost} ₽</td>
                            <td style={{ width: "10%" }}>{good.state}</td>
                            <td style={{ width: "15%" }}><button className="editSize">Изменить цвета</button></td>
                            <td style={{ width: "15%" }}><button className="editSize">Изменить размеры</button></td>
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
                            <td style={{ width: "5%" }}><button onClick={() => handleDeleteGood(good.id)} className="edit" style={{ backgroundColor: "#472828" }}><img src="../../IMG/icons8-крестик-78.png" style={{ filter: "invert(1)" }} /></button></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {data.map(category => (
                <React.Fragment key={category.categoryName}>
                    <table className="table">
                        <thead>
                            <tr>
                                <th colSpan="5" style={{ backgroundColor: "rgba(217, 217, 217, 0.2)", textAlign: "center", fontSize: "100%" }}>{category.categoryName}</th>
                            </tr>
                            <tr>
                                <th></th>
                                <th>Название</th>
                                <th>Цена</th>
                                <th>Статус</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {category.goodsByCategory.map(good => (
                                <tr key={good.id}>
                                    <td style={{ width: "5%" }}><button onClick={() => HandleOpenNote(good)} className="edit"><img src="../../IMG/icons8-редактировать-144.png" /></button></td>
                                    <td style={{ width: "60%" }}>{good.name}</td>
                                    <td style={{ width: "15%" }}>{good.cost} ₽</td>
                                    <td style={{ width: "15%" }}>{good.state}</td>
                                    <td style={{ width: "5%" }}><button onClick={() => handleDeleteGood(good.id)} style={{ backgroundColor: "#472828" }} className="edit"><img src="../../IMG/icons8-крестик-78.png" style={{ filter: "invert(1)" }} /></button></td>
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
