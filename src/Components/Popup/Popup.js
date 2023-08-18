import React, { useState } from 'react';
import './Popup.css'

const Popup = (props) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
    }

    return (
        <div className="modal">
            <form
                className="modal-content"
                onSubmit={handleSubmitForm}
            >
                <div className='header'>
                    <h1>account login</h1>
                    <button className='close' onClick={props.onClose}><img src='../../IMG/icons8-крестик-78.png' alt='close' /></button>
                </div>
                <p>Enjoy exclusive benefits</p>
                <input
                    className='login-input'
                    type="email"
                    name="email"
                    placeholder='Email Address'
                    onChange={(e) => { handleChangeInput(e, "email", setErrors) }}
                    id={errors.email ? "error" : ""}
                />
                <input
                    className='login-input'
                    type="password"
                    name="password"
                    placeholder='Password'
                    onChange={(e) => { handleChangeInput(e, "password", setErrors) }}
                    id={errors.password ? "error" : ""}
                />
                <div className='forgot'>
                    <div className='remember'>
                        <input type="checkbox" />
                        <label>Remember me</label>
                    </div>
                    <button>Forgot password</button>
                </div>
                <a href='/account'><button className='but log'>Log in</button></a>
                <a href='/create_account' className="but create">Create your account</a>
            </form>
        </div>
    );
}

export default Popup;
