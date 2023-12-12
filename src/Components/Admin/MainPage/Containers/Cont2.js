import React, { useState, useEffect } from "react";
import "./Cont2.css"
import { useTranslation } from "react-i18next";
import api from "../../../../api/axiosConfig";
import { URI } from "../../../../api/config";
import EditPopup from "../../Goods/Popup/EditPopup";
import { setDefaultNamespace } from "i18next";
import Resizer from "react-image-file-resizer";

const Container2 = () => {

    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState({});
    const [isOpenPopup, setOpenPopup] = useState(false);
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [sections, setSections] = useState([{}]);
    const [chosenCategory, setChosenCategory] = useState(null);

    const handleSelectChange = (e) => {
        const selectedCategoryId = e.target.value;
        setChosenCategory(selectedCategoryId);
        api.get(`${URI}/categories/${selectedCategoryId}`)
            .then(response => {
                setName(response.data.name)
            })
            .catch(error => {
                console.error(error);
            })
    }

    useEffect(() => {
        api.get(`${URI}/fiveCategories`)
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error(error);
            })

        api.get(`${URI}/sections`)
            .then(response => {
                const sections = response.data
                const categories = []
                sections.map(section => {
                    section.categories.map(category => {
                        categories.push(category)
                    })
                })
                setSections(categories);

            })
            .catch(error => {
                console.error(error);
            })
    }, [])

    const UpdateData = () => {
        api.get(`${URI}/fiveCategories`)
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error(error);
            })

        api.get(`${URI}/sections`)
            .then(response => {
                const sections = response.data
                const categories = []
                sections.map(section => {
                    section.categories.map(category => {
                        categories.push(category)
                    })
                })
                setSections(categories);

            })
            .catch(error => {
                console.error(error);
            })
    }

    const HandleOpenPopup = (idx) => {
        const currentCategory = categories[idx];
        setCategory(currentCategory);
        setOpenPopup(true);
    }

    const handleClosePopup = () => {
        setOpenPopup(false);
    }

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
                        lastModified: Date.now(),
                    });

                    setImage(resizedImage);
                    console.log(resizedImage);
                },
                'blob'
            );
        } catch (error) {
            console.error("Error resizing image: ", error);
        }
    }


    const handleUploadVitrin = async (id) => {
        if (!image && !name && !chosenCategory) {
            return;
        }
        console.log(id);
        console.log(chosenCategory);
        api.put(`${URI}/fiveCategory/${id}`,
            {
                categoryId: Number(chosenCategory),
                categoryName: String(name),
                path: `/assortment/${Number(chosenCategory)}`
            },
            {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem('jwtToken')}`,
                }
            })
            .then(response => {
                const formData = new FormData();
                formData.append('file', image);
                console.log(response.data.id);
                api.post(`${URI}/fiveCategory/${response.data.id}/photo`, formData,
                    {
                        headers: {
                            Authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
                            'Content-Type': 'multipart/form-data'
                        },
                    })
                    .then(response => {
                        console.log(response);
                    })
                    .catch(error => {
                        console.log(error);
                    })

                UpdateData();
                handleClosePopup();
            })
            .catch(error => {
                console.error(error);
            })
    }

    return (
        <div className="container-2">

            {isOpenPopup ? (
                <VitrinaPopup
                    title="Редактировать витрину"
                    width="25vw"
                    onClose={handleClosePopup}
                    selectedGood={category}
                >
                    <form className="form-edit-popup-size" onSubmit={(e) => e.preventDefault()}>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                required
                            />
                            <select
                                value={chosenCategory ? chosenCategory.categoryId : ""}
                                onChange={handleSelectChange}
                                required
                            >
                                <option value="" disabled>Выберите категорию</option>
                                {sections.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button onClick={() => { handleUploadVitrin(category.id) }}>Сохранить</button>
                    </form>
                </VitrinaPopup>
            ) : (
                null
            )}
            <h1 className="font-gramatika-bold">Витрина</h1>
            <div className="example-cont-2 font-gramatika-bold">
                {categories.map((data, idx) => (
                    <div className="card-cont-2" key={idx}>
                        <img src={data.path || "../IMG/test.jpg"} />
                        <p>{data.categoryName}</p>
                        <button onClick={() => { HandleOpenPopup(idx) }}>Редактировать</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export const VitrinaPopup = ({ onClose, children, selectedGood, title, width, setIsOpen, ...props }) => {
    return (
        <div className="modal">
            <div className="modal-content-edit" style={{ width }}>
                <div className='header-good font-gramatika-bold'>
                    <h1>{title}</h1>
                    <button className='close' onClick={onClose}><img src='../../IMG/icons8-крестик-78.png' alt='close' /></button>
                </div>
                <div className='flex-cont-edit'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Container2;