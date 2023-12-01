import React, { useState } from 'react';
import './Popup.css';
import { useTranslation } from "react-i18next";
import axios from 'axios';
import { URI } from '../../api/config';
import { useAuth } from '../../Context/AuthContext';

const Popup = (props) => {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [authError, setAuthError] = useState("");

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

    const [t] = useTranslation("global");

    return (
        <div className="modal">
            <form
                className="modal-content"
                onSubmit={handleSubmitForm}
            >
                <div className='header font-gramatika-bold'>
                    <h1>Войти в аккаунт</h1>
                    <button className='close' onClick={props.onClose}><img src='../../IMG/icons8-крестик-78.png' alt='close' /></button>
                </div>
                <p>Получайте удовольствие от эксклюзивных товаров</p>
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
                {
                    authError !== "" ? (
                        <p style={{margin: "0 0 20px 0", color: "red"}}>{authError}</p>
                    ) : (
                        null
                    )
                }
                <div className='forgot'>
                    <div className='remember'>
                        <input type="checkbox" />
                        <label>Запомнить меня</label>
                    </div>
                    <button>Не помню пароль</button>
                </div>
                <button className='but log font-gramatika-bold'>Войти</button>
                <a href='/create_account' className='but create font-gramatika-bold'>Зарегестрироваться</a>
            </form>
        </div>
    );
}

export default Popup;
