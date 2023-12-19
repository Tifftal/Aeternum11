import React, { useEffect, useState } from "react";
import "./Cont3.css"
import { useTranslation } from "react-i18next";
import api from "../../../../api/axiosConfig";
import { Minio, URI } from "../../../../api/config";
import Resizer from 'react-image-file-resizer';

const Container3 = () => {
    const [data, setData] = useState({})
    const [goods, setGoods] = useState([])
    const [selectedImage, setSelectedImage] = useState(null);
    const [photosById, setPhotosById] = useState([]);
    const [currentGoodId, setCurrentGoodId] = useState(null);
    const [count, setCount] = useState(0);
    const [formData, setFormData] = useState({
        photo: null,
        title: '',
        text: '',
        selectedGood: 0,
    });

    useEffect(() => {
        api.get(`${URI}/firstPage`)
            .then(response => {
                setData(response.data)
                api.get(`${URI}/goods`)
                    .then(response => {
                        setGoods(response.data.content)
                    })
                    .catch(error => {
                        console.error(error);
                    })
            })
            .catch(error => {
                console.error(error);
            })
    }, [])

    const UpdateData = () => {
        api.get(`${URI}/firstPage`)
            .then(response => {
                setData(response.data)
                api.get(`${URI}/goods`)
                    .then(response => {
                        setGoods(response.data.content)
                    })
                    .catch(error => {
                        console.error(error);
                    })
            })
            .catch(error => {
                console.error(error);
            })
    }

    const handleInputChangeText = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleInputChangeSelect = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({
            ...formData,
            photo: file,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        api.put(`${URI}/firstPage`,
            {
                name: formData.title,
                description: formData.text,
                goodId: Number(formData.selectedGood),
            },
            {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem('jwtToken')}`,
                }
            })
            .then(response => {
                handleImageUpload();
                UpdateData();
            })
            .catch(error => {
                console.error(error);
            })

        setFormData({
            photo: null,
            title: '',
            text: '',
            selectedGood: 0,
        });


    };

    const handleImageChange = (e) => {
        const selectedFile = e.target.files[0];

        if (!selectedFile) {
            return;
        }

        try {
            // Resize the selected image before setting it
            Resizer.imageFileResizer(
                selectedFile,
                1500,  // new width (in pixels)
                1500,  // new height (in pixels)
                'PNG', // format (JPEG, PNG, WEBP, BMP)
                80, // quality (0 to 100)
                0, // rotation (0 - no rotation)
                (uri) => {
                    // uri is the resized image in base64 format
                    const resizedImage = new File([uri], selectedFile.name, {
                        type: 'image/jpeg', // or the appropriate format
                        lastModified: Date.now(),
                    });

                    setSelectedImage(resizedImage);
                },
                'blob' // format of the returned image (base64 or blob)
            );
        } catch (error) {
            console.error("Error resizing image: ", error);
        }
    };

    const fetchPhotos = async (goodId) => {
        try {
            const response = await api.get(`${URI}/firstPage`);
            const good = response.data;

            setPhotosById(good.path);
            let newCount = count;
            newCount++;
            setCount(newCount);
            UpdateData();
        } catch (error) {
            console.error(error);
        }
    };

    const handleImageUpload = async () => {
        setCurrentGoodId(1);
        console.log(selectedImage);
        if (!selectedImage) {
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedImage);

        try {
            await api.post(`${URI}/firstPage/photo`, formData, {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            await fetchPhotos(currentGoodId);
        } catch (error) {
            console.error("Error uploading image: ", error);
        }

        let newCount = count;
        newCount++;
        setCount(newCount);
    };



    return (
        <div className="container-3">
            <h1 className="font-gramatika-bold">Постер</h1>
            <div className="cont3-flex-row">
                <div className="poster-cont3">
                    <div className="posterImg-cont3">
                        <img src={`${Minio}/${data.path}`}/>
                    </div>
                    <div className="posterInfo-cont3 font-gramatika-bold">
                        <h2 className="font-gramatika-bold">Рекомендуем</h2>
                        <h1 className="font-gramatika-reg">{data.name}</h1>
                        <p className="font-gramatika-reg">{data.description}</p>
                        <a href="#"><button>Узнать больше</button></a>
                    </div>
                </div>

                <div className="edit-cont-3">
                    <form>
                        <div className="input-form-cont-3">
                            <label>Фото</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </div>
                        <div className="cont-3-inputs">
                            <div className="input-form-cont-3">
                                <input
                                    className='input-text'
                                    type='text'
                                    name="title"
                                    value={formData.title}
                                    placeholder="Заголовок"
                                    onChange={handleInputChangeText}
                                />
                                <input
                                    className='input-text'
                                    type='text'
                                    name="text"
                                    value={formData.text}
                                    placeholder="Текст"
                                    onChange={handleInputChangeText}
                                />
                                <select
                                    name="selectedGood"
                                    value={formData.selectedGood}
                                    onChange={handleInputChangeSelect}
                                >
                                    <option value="">Выберите товар</option>
                                    {goods.map(good => (
                                        <option key={good.id} value={good.id}>{good.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <button className="edit-cont3 font-gramatika-bold" onClick={handleSubmit}>Сохранить</button>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default Container3;