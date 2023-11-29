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
  const [cost, setCost] = useState(0);

  useEffect(() => {
    api
      .get(`${URI}/good/${good.goodId}`, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
        },
      })
      .then((response) => {
        const data = response.data;
        setCost(data.cost);
        setName(data.name);
        data.sizes.map((size, index) => {
          if (size.id === good.sizeId) {
            setSize(size.size);
          }
        });
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
        <img src="../../IMG/timothy-dykes-xhuaL95bQ8Q-unsplash.jpg" alt="Product" />
      </div>
      <div className="content-sale">
        <div className="title-sale">
          <h1>{name}</h1>
          <button onClick={() => handleDeleteCard(good.id)}>Удалить</button>
        </div>
        <div className="size-colour">
          <h2>{t("card.size")} {size}</h2>
          <h2>{t("card.colour")}</h2>
        </div>
        <div className="price">
          <h3>Цена: ₽ {cost}</h3>
        </div>
      </div>
    </div>
  );
};

export default Card;
