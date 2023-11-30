import React, { useState, useEffect } from "react";
import "./card.css";
import { useTranslation } from "react-i18next";
import api from "../../api/axiosConfig";
import { URI } from "../../api/config";
import { Button, Card } from 'react-bootstrap';

const CardBag = ({ good, onDelete }) => {
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
      <Card className='card-det'>
        <Card.Header className='header-det'>
          <img src='../IMG/TEST.png' />
        </Card.Header>
        <Card.Body className='det'>
          <div style={{ width: "100%" }}>
            <Card.Title className="font-gramatika-bold">
              {name}
              <Button className="deleteBtn">Удалить</Button>
            </Card.Title>
            <Card.Text className="text-card-bag">
              Размер: {size}
            </Card.Text>
            <Card.Text className="text-card-bag">
              Цвет: {color}
            </Card.Text>
          </div>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", marginBottom: "1%" }}>
            <Card.Text className="text-card-bag">
              Цена: {cost} ₽
            </Card.Text>
            <div style={{display:'flex', flexDirection:"row", alignItems: "center", gap: "15px", backgroundColor: "gray", width: "fit-content", padding: 0, borderRadius: "5px", margin: 0, height: "30px", marginTop: "10%"}}>
              <button className="amountBtn minus">-</button>
              {amount}
              <button className="amountBtn plus">+</button>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CardBag;
