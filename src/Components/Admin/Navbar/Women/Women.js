import React, { useEffect, useState } from "react";
import './Women.css';
import api from "../../../../api/axiosConfig";
import { URI } from "../../../../api/config";

const Women = () => {
    const [sections, setSections] = useState([]);
    const [newSectionName, setNewSectionName] = useState("");
    const [newCategory, setNewCategory] = useState("");

    const [catBtnsActive, setCatBtnsActive] = useState(Array(sections.length).fill(false));

    useEffect(() => {
        api.get(`${URI}/sections`)
            .then(response => {
                
                setSections(response.data);
                setCatBtnsActive(Array(response.data.length).fill(false));
            })
            .catch(err => {
                console.error(err);
            })
    }, [])

    const handleSaveSection = () => {
        
        api.post(
            `${URI}/sections`,
            {
                name: newSectionName,
            },
            {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
                },
            }
        )
            .then(response => {
                
                setSections(prevSections => [...prevSections, response.data]);
            })
            .catch(err => {
                console.error(err);
            })
        setNewSectionName("");
    };

    const handleSaveCategory = (sectionId) => {
        
        api.post(
            `${URI}/categories`,
            {
                name: newCategory,
                sectionId: sectionId,
            },
            {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
                },
            }
        )
            .then(() => {
                
            })
            .catch(err => {
                console.error(err);
            });
        setNewCategory("");
    };


    const handleToggleClassBtn = (index) => {
        const newCatBtnsActive = [...catBtnsActive];
        newCatBtnsActive[index] = !newCatBtnsActive[index];
        setCatBtnsActive(newCatBtnsActive);
    }

    return (
        <div className="womenAdmin">
            {sections.map((section, index) => (
                <div className="col-admin" key={index}>
                    <h1>{section.name}</h1>
                    {section.categories.map((item, catIndex) => (
                        <div className="categoryItem" key={catIndex}>
                            <p>{item.name}</p>
                            <button>×</button>
                        </div>
                    ))}
                    <button
                        style={{ marginTop: 10, backgroundColor: "#314728", marginBottom: 5 }}
                        onClick={() => handleToggleClassBtn(index)}
                        className={catBtnsActive[index] ? "active AddCtg" : "AddCtg def"}
                    >
                        +
                    </button>
                    <div className={catBtnsActive[index] ? "active AddCtg" : "AddCtg def"}>
                        <input
                            id="name"
                            placeholder="Название категории"
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                        />
                        <button onClick={() => handleSaveCategory(section.id)}>Сохранить</button>
                    </div>
                </div>
            ))}
            <div className="addNewSection">
                <h1>Добавить новую секцию:</h1>
                <input
                    id="name"
                    placeholder="Название секции"
                    value={newSectionName}
                    onChange={(e) => setNewSectionName(e.target.value)}
                />
                <button onClick={handleSaveSection}>Сохранить</button>
            </div>
        </div>
    )
}

export default Women;
