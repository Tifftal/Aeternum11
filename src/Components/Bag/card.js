// Card.js

import React, { useState, useEffect } from "react";
import "./card.css";
import { useTranslation } from "react-i18next";
import api from "../../api/axiosConfig";
import { URI } from "../../api/config";

const Card = ({ good, onDelete }) => {
  const [t] = useTranslation("global");
  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [cost, setCost] = useState(0);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    api
      .get(`${URI}/good/${good.goodId}`, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
        },
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
        console.log(good);
        setCost(data.cost);
        setName(data.name);
        setAmount(good.amount);
        api.get(`${URI}/size/${good.sizeId}`, {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
          },
        })
          .then((response) => {
            console.log(response.data)
            setSize(response.data.size)
            setColor(response.data.color.name)
          })
      });
  }, []);

  const handleDeleteCard = (bagId) => {
    api
      .delete(`${URI}/user/bag`, {
        data: {
          id: bagId,
        },
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
        },
      })
      .then((response) => {
        console.log(response);
        onDelete(bagId); // Notify the parent component about the delete action
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="sale-card">
      <div className="photo-sale">
        <img src="../../IMG/TEST.png" alt="Product" />
      </div>
      <div className="content-sale">
        <div className="title-sale">
          <h1 className="font-gramatika-bold">{name}</h1>
          <button onClick={() => handleDeleteCard(good.id)}>Удалить</button>
        </div>
        <div className="size-colour">
          <h2>{t("card.size")} {size}</h2>
          <h2>{t("card.colour")} {color}</h2>
        </div>
        <div className="price">
          <h3>Цена: {cost} ₽ </h3>
        </div>
      </div>
    </div>
  );
};

export default Card;
