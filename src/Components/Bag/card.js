import React, { useState, useEffect } from "react";
import "./card.css";
import api from "../../api/axiosConfig";
import { Minio, URI } from "../../api/config";
import { Button, Card } from 'react-bootstrap';

const CardBag = ({ good, onDelete, onUpdateTotalAdd, onUpdateTotalRemove }) => {
  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [cost, setCost] = useState(0);
  const [amount, setAmount] = useState(0);
  const [sizeId, setSizeId] = useState(0);
  const [photo, setPhoto] = useState('')

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
        setAmount(good.amount);
        setSizeId(good.id)
        const photo = data.photos.sort((a, b) => a.position - b.position);
        const firstPhoto = photo[0]
        api.get(`${URI}/size/${good.sizeId}`, {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
          },
        })
          .then((response) => {

            setSize(response.data.size)
            setColor(response.data.color.name)
          })
          .catch(error => console.error(error))
        fetchPhoto(firstPhoto);
      });

    const fetchPhoto = (photo) => {
      try {
        // api.get(`${URI}/photo/${photo.id}`, {
        //   responseType: 'arraybuffer', // Important: set responseType to arraybuffer
        // }).then(
        //   (response) => {
        //     const blob = new Blob([response.data], { type: 'image/jpeg' })
        //     const imageURL = URL.createObjectURL(blob);
        //     setPhoto(imageURL);
        //   }
        // )
        //   .catch(error => {
        //     console.error(error)
        //   })

        
        const imageUrl = `${Minio}/${photo.path}`
        setPhoto(imageUrl)
      }
      catch (error) {
        console.error(error);
      }
    }
    // eslint-disable-next-line
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
      .then(() => {

        onDelete(bagId); // Notify the parent component about the delete action
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleAddToBag = () => {
    api.post(
      `${URI}/user/bag`,
      {
        goodId: good.goodId,
        amount: amount + 1,
        sizeId: good.sizeId,
      },
      {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
        },
      }
    )
      .then(() => {
        const newAmount = amount + 1;
        setAmount(newAmount);
        api
          .get(`${URI}/good/${good.goodId}`, {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
            },
          })
          .then((response) => {
            const data = response.data;
            onUpdateTotalAdd(data.cost);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const handleRemoveFromBag = () => {
    if (amount <= 1) {
      handleDeleteCard(sizeId);
    } else {
      api.post(
        `${URI}/user/bag`,
        {
          goodId: good.goodId,
          amount: amount - 1,
          sizeId: good.sizeId,
        },
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
          },
        }
      )
        .then(() => {
          const newAmount = amount - 1;
          setAmount(newAmount);
          api
            .get(`${URI}/good/${good.goodId}`, {
              headers: {
                Authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
              },
            })
            .then((response) => {
              const data = response.data;
              console.log(data.cost, newAmount)
              onUpdateTotalRemove(data.cost);
            });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  return (
    <div className="sale-card" style={{}}>
      <Card className='card-det'>
        <Card.Header className='header-det'>
          <img src={photo || "../../../IMG/carlos-torres-MHNjEBeLTgw-unsplash.jpg"} />
        </Card.Header>
        <Card.Body className='det' style={{ width: "90%", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", marginBottom: "1%", width: "100%", padding: "10px 0 10px 0", height: "100%" }}>
            <div style={{ width: "100%" }}>
              <Card.Title className="font-gramatika-bold">
                {name}
                <Button className="deleteBtn" onClick={() => { handleDeleteCard(sizeId) }}>Удалить</Button>
              </Card.Title>
              <Card.Text style={{ marginTop: "10px" }} className="text-card-bag">
                Размер: {size}
              </Card.Text>
              <Card.Text className="text-card-bag">
                Цвет: {color}
              </Card.Text>
            </div>
            <div style={{ display: "flex", flexDirection: "column", width: "100%", alignSelf: "flex-end" }}>
              <Card.Text className="text-card-bag">
                Цена: {cost} ₽
              </Card.Text>
              <div style={{ display: 'flex', flexDirection: "row", alignItems: "center", gap: "10px", backgroundColor: "gray", width: "fit-content", padding: 0, borderRadius: "5px", margin: 0, height: "30px", marginTop: "5px" }}>
                <button className="amountBtn minus" onClick={handleRemoveFromBag}>-</button>
                {amount}
                <button className="amountBtn plus" onClick={handleAddToBag}>+</button>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CardBag;
