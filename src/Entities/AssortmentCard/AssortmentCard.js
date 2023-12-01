import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { URI } from "../../api/config";
import api from "../../api/axiosConfig";

const AssortmentCard = ({ data }) => {
    const [t] = useTranslation("global");
    const [photo, setPhoto] = useState('')
    useEffect(async() => {
        try {
            const response = await api.get(`${URI}/good/${data.id}`);
            const good = response.data;

            const fetchPhoto = async (photo) => {
                try {
                    const response = await api.get(`${URI}/photo/${photo.id}`, {
                        responseType: 'arraybuffer', // Important: set responseType to arraybuffer
                    });

                    const blob = new Blob([response.data], {type: 'image/jpeg'})
                    const imageURL = URL.createObjectURL(blob);
                    setPhoto(imageURL);
                }
                catch (error) {
                    console.error(error);
                }
            }
            
            const photo = good.photos.sort((a, b) => a.position - b.position)
            const firstPhoto = photo[0]
            await fetchPhoto(firstPhoto)
        }
        catch(error) {
            console.error(error);
        }
    },[])

    return (
        <div>
            <div className="assortment-card">
                <img src={photo || "../../../IMG/carlos-torres-MHNjEBeLTgw-unsplash.jpg"} alt="test"/>
                <div className="assortment-name">
                    <h1>{data.name}</h1>
                    {/* <button><img src="../../IMG/icons8-закладка-100.png" alt="icon-down"/></button> */}
                </div>
                <p>{data.cost} ₽</p>
            </div>
        </div>
    )
}

export default AssortmentCard;