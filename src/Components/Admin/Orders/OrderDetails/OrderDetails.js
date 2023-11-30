import React, { useEffect, useState } from 'react';
import './OrderDetails.css';
import { useTranslation } from 'react-i18next';
import api from '../../../../api/axiosConfig';
import { URI } from '../../../../api/config';

const OrderDetail = ({ onClose, width, order, formatTime }) => {
    const [t] = useTranslation('global');
    const [goodsData, setGoodsData] = useState([]);

    useEffect(() => {
        // Функция для загрузки данных о товарах по id
        const fetchGoodsData = async () => {
            const promises = order.items.map(good => {
                return api.get(`${URI}/good/${good.id}`)
                    .then(response => response.data)
                    .catch(error => {
                        console.error(error);
                        return null;
                    });
            });

            const goodsData = await Promise.all(promises);
            setGoodsData(goodsData);
        };

        fetchGoodsData();
    }, [order.items]);


    return (
        <div className="modal">
            <div className="modal-content-edit" style={{ width }}>
                <div style={{ marginBottom: "2%" }} className='header-good font-gramatika-bold'>
                    <h1>Информация о заказе</h1>
                    <button className='close' onClick={onClose}><img src='../../IMG/icons8-крестик-78.png' alt='close' /></button>
                </div>
                <div className='order-info'>
                    <h2 className="font-gramatika-bold">Заказ №{order.id}  <b style={{ color: "dodgerblue", marginLeft: "10px" }}>{order.status}</b></h2>
                    <h3> <b>Дата заказа:</b>  {formatTime(order.time)}</h3>
                    <p>ФИО: {order.userId && order.userData && `${order.userData.firstName} ${order.userData.lastName}`}</p>
                    <p>Телефон: {order.userId && order.userData && `${order.userData.phone}`}</p>
                    <div className='address-in-order'>
                        <p>Страна: {order.userId && order.userData && `${order.userData.country}`}</p>
                        <p>Регион: {order.userId && order.userData && `${order.userData.state}`}</p>
                        <p>Город:</p>
                    </div>
                    <p>Адрес заказа:</p>

                    <table className='goods-in-order'>
                        <thead>
                            <tr>
                                <th style={{ width: "45%" }}>Название</th>
                                <th style={{ width: "20%" }}>Цвет</th>
                                <th style={{ width: "20%" }}>Размер</th>
                                <th style={{ width: "15%" }}>Кол-во</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.items.map((good, index) => {
                                console.log(goodsData[index])
                                const goodData = goodsData[index] || {}; // Данные о товаре по умолчанию пустые

                               console.log(goodData)

                                return (
                                    <tr key={index}>
                                        <td style={{ width: "45%" }}>{goodData.name || "Недоступно"}</td>
                                        <td style={{ width: "20%" }}>{good.colorName}</td>
                                        <td style={{ width: "20%" }}>{good.size}</td>
                                        <td style={{ width: "15%" }}>{good.amount}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default OrderDetail;
