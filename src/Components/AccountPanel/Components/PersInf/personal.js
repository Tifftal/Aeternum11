import React, { useEffect, useState } from "react";
import './personal.css';
import { useTranslation } from "react-i18next";
import api from "../../../../api/axiosConfig";
import { URI } from "../../../../api/config";

const Personal = (props) => {
    const [t] = useTranslation("global");

    const [personal, setPersonal] = useState({
        firstName: 'John',
        lastName: 'Doe',
        gender: '',
        date: '', // Замените пустые строки на дефолтные значения, если необходимо
        country: '',
        state: '',
        city: '',
        phone: '',
        personal: false,
        newsletter: '',
        email: '',
    });
    const [newPassword, setNewPassword] = useState("");
    const [isSended, setSended] = useState(false);
    const [code, setCode] = useState('');
    const [error, setError] = useState('');

    const handleChangeCode = (e) => {
        setCode(e.target.value);
    }

    const handleChangePassword = (e) => {
        setNewPassword(e.target.value);
    }

    const handleSubmitNewPassword = () => {
        if (!isSended) {
            api.post(`${URI}/password/change`, {
                email: personal.email
            },
                {
                    headers: {
                        "Authorization": `Bearer ${window.localStorage.getItem("jwtToken")}`
                    }
                })
                .then((response) => {
                    if (response.status === 200) {
                        api.post(`${URI}/sendPasCode`, {
                            email: personal.email
                        },
                            {
                                headers: {
                                    "Authorization": `Bearer ${window.localStorage.getItem("jwtToken")}`
                                }
                            })
                            .then(() => {
                                setSended(true);;
                            })
                            .catch(error => {
                                console.error(error);
                            })
                    }
                })
                .catch(error => {
                    console.error(error);
                })
        }
        if (isSended && code) {
            api
                .post(
                    `${URI}/checkPasCode/${code}`,
                    {
                        email: personal.email,
                        password: newPassword,
                        confirmPassword: newPassword,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
                        },
                    }
                )
                .then((response) => {
                    if (response === undefined) {
                        setError("Неверный код");
                        return
                    }
                    if (response?.status === 200) {
                        setSended(false);
                        setError('');
                    }
                })
                .catch((error) => {
                    
                    if (error?.response?.data?.status === 404) {
                    
                        setError(error?.data?.message)
                    }
                });
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPersonal(prevPersonal => ({
            ...prevPersonal,
            [name]: value,
        }));
    };

    const handleCheckboxChange = (e) => {
        const { checked } = e.target;
        setPersonal(prevPersonal => ({
            ...prevPersonal,
            newsletter: checked ? 'YES' : 'NO',
        }));
    };

    const handleSubmitForm = (e) => {
        e.preventDefault();
        api.put(`${URI}/user/me`, {
            firstName: personal.firstName,
            lastName: personal.lastName,
            gender: personal.gender,
            country: personal.country,
            state: personal.state,
            phone: personal.phone,
            newsletter: personal.newsletter,
            dob: personal.date,
        }, {
            headers: {
                "Authorization": `Bearer ${window.localStorage.getItem("jwtToken")}`
            }
        })
            .then(() => {
                
            })
            .catch(error => {
                console.error(error);
            })
    }

    useEffect(() => {

        api.get(`${URI}/user/me`,
            {
                headers: {
                    "Authorization": `Bearer ${window.localStorage.getItem("jwtToken")}`
                }
            })
            .then(response => {
                if (response.status === 200) {
                    setPersonal(response.data);
                }
            })
            .catch(error => {
                console.error(error);
            })
    }, [])

    return (
        <div className="pers">
            <h2 className="font-gramatika-bold">Профиль</h2>
            <h1>Присоединяйтесь к Aeternum Eleven</h1>

            <form className="pers-data">
                <input
                    type="text"
                    placeholder="Имя"
                    value={personal.firstName || ''}
                    name="firstName"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    placeholder="Фамилия"
                    value={personal.lastName || ''}
                    name="lastName"
                    onChange={handleChange}
                />
                <select
                    className="select-pers-info"
                    value={personal.gender}
                    name="gender"
                    onChange={handleChange}
                >
                    <option value="MEN">Мужской</option>
                    <option value="NON-BINARY">Не узакано</option>
                    <option value="WOMAN">Женский</option>
                </select>
                <input
                    type="date"
                    placeholder="Дата рождения"
                    value={personal.date || ''}
                    name="date"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    placeholder="Страна"
                    value={personal.country || ''}
                    name="country"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    placeholder="Регион"
                    value={personal.state || ''}
                    name="state"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    placeholder="Город"
                    value={personal.city || ''}
                    name="city"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    placeholder="Номер телефона"
                    value={personal.phone || ''}
                    name="phone"
                    onChange={handleChange}
                />
            </form>
            <h3>* Обязательные поля</h3>
            {/* <h4>{t("create_account.text2")}</h4> */}
            <div className="agreeAc">
                <input
                    type="checkbox"
                    checked={personal.newsletter === 'YES'}
                    onChange={handleCheckboxChange}
                />
                <label>Хочу получать уведомления</label>
            </div>
            <button className="BtnAc" onClick={handleSubmitForm} style={{ margin: "0" }}>Обновить данные</button>
            <div className="pers-data" style={{ marginBottom: "50px" }}>
                <input
                    type="password"
                    placeholder="Новый пароль"
                    onChange={handleChangePassword}
                />
                {
                    isSended ? (
                        <input
                            type="text"
                            placeholder="Код подтверждения"
                            onChange={handleChangeCode}
                        />
                    ) : (null)
                }
            </div>
            {error !== '' ? (
                <h2 style={{ marginBottom: "50px", color: "#FF5656" }}>{error}</h2>
            ) : (
                null
            )
            }
            <button className="BtnAc" onClick={handleSubmitNewPassword} style={{ margin: "0 0 50px 0" }}>Обновить пароль</button>

            <div className="agreeAc">
                <input type="checkbox" />
                <label>{t("create_account.check1")}</label>
            </div>
        </div>

    )
}

export default Personal;