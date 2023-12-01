import React, { useState } from 'react';
import './Popup.css';
import { useTranslation } from "react-i18next";
import axios from 'axios';
import { URI } from '../../api/config';
import { useAuth } from '../../Context/AuthContext';
import api from '../../api/axiosConfig';

const Popup = (props) => {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [authError, setAuthError] = useState("");
    const [forgotPassword, setForgorPassword] = useState(false);
    const [code, setCode] = useState('');
    const [isSended, setIsSended] = useState(false);

    const [errors, setErrors] = useState({
        email: false,
        password: false,
    });

    const handleChangeInput = (e, field, setError) => {
        const value = e.target.value;
        setError(value === "");

        switch (field) {
            case "email":
                setEmail(value);
                break;
            case "password":
                setPassword(value);
                break;
            default:
                break;
        }
    };

    const handleSubmitForm = (e) => {
        e.preventDefault();

        const newErrors = {
            email: email === "",
            password: password === "",
        };

        setErrors(newErrors);
        if (!errors.email || !errors.password) {
            axios.post(`${URI}/login`,
                {
                    email: email,
                    password: password,
                })
                .then(response => {
                    if (response.status === 200) {
                        window.localStorage.setItem('jwtToken', response.data.token);

                        login(response.data.token);
                        props.onClose();
                    }
                })
                .catch((error) => {
                    if (error.response.status === 401) {
                        setAuthError(error.response.data.message);
                    }
                })
        }
    }

    const handleRefreshPassword = () => {
        if (!isSended && email != "") {
            api.post(`${URI}/password/change`, {
                email: email
            },
                {
                    headers: {
                        "Authorization": `Bearer ${window.localStorage.getItem("jwtToken")}`
                    }
                })
                .then((response) => {
                    if (response.status === 200) {
                        api.post(`${URI}/sendPasCode`, {
                            email: email
                        },
                            {
                                headers: {
                                    "Authorization": `Bearer ${window.localStorage.getItem("jwtToken")}`
                                }
                            })
                            .then(() => {
                                setIsSended(true);;
                            })
                            .catch(error => {
                                console.error(error);
                            })
                    }
                })
                .catch(error => {
                    console.error(error);
                })
        } else if (isSended && email != "" && code != "") {
            api.post(`${URI}/checkPasCode/${code}`, {
                email: email,
                password: password,
                confirmPassword: password
            })
                .then(() => {
                    setIsSended(false);
                    setForgorPassword(false);
                })
                .catch(error => {
                    console.error(error)
                })
        }
    }

    const [t] = useTranslation("global");

    return (
        <div className="modal" style={{backgroundColor: "rgba(0,0,0,0.5)"}}>
            <form
                className="modal-content"
                onSubmit={handleSubmitForm}
            >
                <div className='header font-gramatika-bold'>
                    <h1>Войти в аккаунт</h1>
                    <button className='close' onClick={props.onClose}><img src='../../IMG/icons8-крестик-78.png' alt='close' /></button>
                </div>
                <p>Получайте удовольствие от эксклюзивных товаров</p>
                {!forgotPassword ?
                    (
                        <>
                            <input
                                className='login-input'
                                type="email"
                                name="email"
                                placeholder="Адрес электронной почты"
                                onChange={(e) => { handleChangeInput(e, "email", setErrors) }}
                                id={errors.email ? "error" : ""}
                            />
                            <input
                                className='login-input'
                                type="password"
                                name="password"
                                placeholder="Пароль"
                                onChange={(e) => { handleChangeInput(e, "password", setErrors) }}
                                id={errors.password ? "error" : ""}
                            />
                        </>
                    ) : (
                        <>
                            <input className="login-input" type="email" placeholder="Адрес электронной почты" onChange={(e) => { setEmail(e.target.value) }} />
                            {isSended ? (
                                <>
                                    <input className="login-input" type="password" placeholder="Пароль" onChange={(e) => { setPassword(e.target.value) }} />
                                    <input className="login-input" type="password" placeholder="Код для восстановления" onChange={e => { setCode(e.target.value) }} />
                                </>
                            ) : (
                                null
                            )
                            }
                        </>
                    )}
                {
                    authError !== "" ? (
                        <p style={{ margin: "0 0 20px 0", color: "red" }}>{authError}</p>
                    ) : (
                        null
                    )
                }
                <div className='forgot'>
                    <div className='remember'>
                        <input type="checkbox" />
                        <label>Запомнить меня</label>
                    </div>
                    {
                        forgotPassword ? (
                            <button onClick={() => { setForgorPassword(false) }} type="button">Вспомнил</button>
                        )
                            :
                            (
                                <button onClick={() => { setForgorPassword(true) }} type="button">Не помню пароль</button>
                            )
                    }
                </div>
                {
                    !forgotPassword ? (
                        <button className='but log font-gramatika-bold'>Войти</button>
                    ) : (
                        <button className='but log font-gramatika-bold' type="button" onClick={handleRefreshPassword}>Обновить пароль</button>
                    )
                }
                <a href='/create_account' className='but create font-gramatika-bold'>Зарегистрироваться</a>
            </form>
        </div>
    );
}

export default Popup;
