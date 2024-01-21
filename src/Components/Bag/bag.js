import React, { useState, useEffect } from "react";
import "./bag.css";
import api from "../../api/axiosConfig";
import { URI } from "../../api/config";
import CardBag from "./card";

const Bag = () => {
    const [myBag, setMyBag] = useState([]);
    const [cost, setCost] = useState(0);
    const [address, setAddress] = useState("");
    const [error, setError] = useState(false);

    useEffect(() => {
        api
            .get(`${URI}/user/me`, {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
                },
            })
            .then((response) => {
                setMyBag(response.data.bag);

            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        let summary = 0;
        myBag.forEach((bag) => {
            api
                .get(`${URI}/good/${bag.goodId}`, {
                    headers: {
                        Authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
                    },
                })
                .then((response) => {
                    summary += response.data.cost;
                    setCost(summary);
                })
                .catch((error) => {
                    console.error(error);
                });
        });
    }, [myBag]);

    const onUpdateTotalAdd = (cost) => {
        setCost((prevCost) => prevCost + cost);
    };

    const onUpdateTotalRemove = (cost) => {
        setCost((prevCost) => prevCost - cost);
    };


    const handleChangeAddress = (e) => {
        const newAddress = e.target.value;
        setAddress(newAddress);
    };

    const handleDeleteCard = (bagId) => {
        setMyBag((prevBag) => prevBag.filter((item) => item.id !== bagId));
    };

    const submitForm = (e) => {
        e.preventDefault();
        if (address === "") {
            setError(true);
        } else {
            setError(false);
            api
                .post(
                    `${URI}/application`,
                    {

                        clientComment: address,

                    },
                    {
                        headers: {
                            Authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
                        },
                    }
                )
                .then((response) => {
                    if (response.status === 200) {

                        console.log(response);
                        window.location.href = JSON.parse(response.data.url);
                    }
                    setMyBag([])
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };

    return (
        <div className="bag">

            <div className="sale">
                {myBag.length === 0 ? (
                    <div className="empty-bag">
                        <p className="font-gramatika-reg">Ваша корзина пуста</p>
                        <a href="/catalog"><button className="font-gramatika-bold">Перейти в каталог</button></a>
                    </div>
                ) : (
                    myBag.map((good) => (
                        <CardBag
                            key={good.id}
                            good={good}
                            onDelete={handleDeleteCard}
                            onUpdateTotalAdd={onUpdateTotalAdd}
                            onUpdateTotalRemove={onUpdateTotalRemove}
                        />
                    ))
                )}
            </div>

            <div className="total">
                <h1 className="font-gramatika-bold">оформление заказа</h1>
                <div className="purchase font-gramatika-reg">
                    <div>
                        <p>Цена</p>
                        <p>{cost} ₽ </p>
                    </div>
                    <div>
                        <p>Доставка</p>
                        <p>Бесплатно</p>
                    </div>
                    {/* <div>
                        <p>Налоговый сбор</p>
                        <p>Included</p>
                    </div> */}
                    <div>
                        <p>Всего</p>
                        <p>{cost} ₽ </p>
                    </div>
                </div>
                <div className="promo">
                    <input placeholder="Адрес" onChange={(e) => handleChangeAddress(e)} />
                </div>
                {error ? (
                    <p style={{ color: "red" }} className="font-gramatika-bold">
                        Укажите адрес
                    </p>
                ) : null}
                <button className="font-gramatika-bold" type="submit" onClick={submitForm}>
                    Продолжить
                </button>
                <div style={{ display: "flex", flexDirection: "column", width: "100%", alignItems: "center", color: "darkgray" }}>
                    <p>Услуги доставки и возврата бесплатны по РФ</p>
                    <a
                        href="../../Реквизиты.pdf"
                        download
                        style={{color: "darkgray"}}
                    >
                        Реквизиты ООО "ЭТЕРНУМ"
                    </a>
                    <p>ИНН 9705198035</p>
                </div>
            </div>
        </div>
    );
};

export default Bag;
