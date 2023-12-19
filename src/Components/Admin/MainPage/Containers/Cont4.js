import React, { useEffect, useState } from "react";
import "./Cont4.css"
import Resizer from "react-image-file-resizer";
import { Minio, URI } from "../../../../api/config";
import api from "../../../../api/axiosConfig";

const Container4 = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [background, setBackground] = useState('');

    const handleImageChange = (e) => {
        const selectedFile = e.target.files[0];

        if (!selectedFile) {
            return;
        }

        try {
            Resizer.imageFileResizer(
                selectedFile,
                1500,
                1500,
                'PNG',
                80,
                0,
                (uri) => {
                    const resizedImage = new File([uri], selectedFile.name, {
                        type: 'image/jpeg',
                    });

                    setSelectedImage(resizedImage);
                },
                'blob'
            );
        } catch(error) {
            console.error("Error resizing image: ", error);
        }
    }

    useEffect(() => {
        const fetchBg = async () => {
            try {
                const response = await api.get(`${URI}/background`);
                const bg = response.data;
                const backgroundURL = `${Minio}/${bg.path}`
                setBackground(backgroundURL);
            } catch(error) {
                console.error(error);
            }
        }

        fetchBg();
    }, []);

    const handleImageUpload = async () => {
        try {
            if (!selectedImage) {
                throw new Error('No image selected for upload.');
            }
    
            const formData = new FormData();
            formData.append('file', selectedImage);
            // Assuming 'api' is an Axios instance or similar for making HTTP requests
            const response = await api.put(`${URI}/background`, formData, {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            setBackground(`${Minio}/${response.data.path}`)
            // Handle the response if needed (e.g., show success message)
            console.log('Image uploaded successfully:', response.data);
        } catch (error) {
            // Handle errors (e.g., show error message)
            console.error('Error uploading image:', error.message);
        }
    };
    
    return (
        <div className="container-4">
            <h1 className="font-gramatika-bold">Главная страница</h1>
            <div className="cont-4">
                <div className="img-cont-4" style={{width: "60%"}}>
                    <h3 className="font-gramatika-reg">Добавить новый фон</h3>
                    <div className="input-form-cont-4">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        <button onClick={handleImageUpload}>Сохранить</button>
                    </div>
                </div>
                <div className="img-cont-4">
                    <h3 className="font-gramatika-reg">Текущий фон</h3>
                    <img src={background} />
                </div>
            </div>
        </div>

    )
}

export default Container4;