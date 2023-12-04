import React, { useEffect, useState } from "react";
import { Minio, URI } from "../../api/config";
import api from "../../api/axiosConfig";

const AssortmentCard = ({ data }) => {
    const [photo, setPhoto] = useState('')
    //eslint-disable-next-line
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`${URI}/good/${data.id}`);
                const good = response.data;

                const fetchPhoto = (photo) => {
                    try {
                        // Assuming that photo.path contains the correct path to the image
                        const imageURL = `${Minio}/${photo.path}`;
                        
                        // Set the imageURL to the state
                        setPhoto(imageURL);
                    } catch (error) {
                        console.error(error);
                    }
                };

                // Sort the photos and get the first photo
                const sortedPhotos = good.photos.sort((a, b) => a.position - b.position);
                const firstPhoto = sortedPhotos[0];

                // Fetch the photo
                await fetchPhoto(firstPhoto);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [data.id]);

    return (
        <div>
            <div className="assortment-card">
                <img src={photo || "../../../IMG/carlos-torres-MHNjEBeLTgw-unsplash.jpg"} alt="test"/>
                <div className="assortment-name">
                    <h1 className="font-gramatika-reg">{data.name}</h1>
                    {/* <button><img src="../../IMG/icons8-закладка-100.png" alt="icon-down"/></button> */}
                </div>
                <p className="font-gramatika-reg">{data.cost} ₽</p>
            </div>
        </div>
    )
}

export default AssortmentCard;