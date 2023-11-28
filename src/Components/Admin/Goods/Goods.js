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

    const HandleOpenAddPopup = () => {
        setIsOpenAddPopup(true);
    };

    const HandleCloseAddPopup = () => {
        setIsOpenAddPopup(false);
    };

    useEffect(() => {
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
    }, []);

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
            {isOpenAddPopup && (
                <PopupAddGood
                    onClose={() => HandleCloseAddPopup()} 
                    setIsOpen={setIsOpenAddPopup}
                />
            )}

            <div className="AddGoodAdmin">
                <button className="AddBtnAdmin" onClick={() => HandleOpenAddPopup()}>Добавить товар</button>
            </div>

            {data.map(category => (
                <React.Fragment key={category.categoryName}>
                    <table className="table">
                        <thead>
                            <tr>
                                <th colSpan="4" style={{ backgroundColor: "rgba(217, 217, 217, 0.2)", textAlign: "center", fontSize: "100%" }}>{category.categoryName}</th>
                            </tr>
                            <tr>
                                <th></th>
                                <th>Название</th>
                                <th>Стоимость</th>
                                <th>Статус</th>
                            </tr>
                        </thead>
                        <tbody>
                            {category.goodsByCategory.map(good => (
                                <tr key={good.id}>
                                    <td style={{ width: "5%" }}><button onClick={() => HandleOpenNote(good)}><img src="../../IMG/icons8-редактировать-144.png" /></button></td>
                                    <td style={{ width: "65%" }}>{good.name}</td>
                                    <td style={{ width: "15%" }}>{good.cost} ₽</td>
                                    <td style={{ width: "15%" }}>{good.state}</td>
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
