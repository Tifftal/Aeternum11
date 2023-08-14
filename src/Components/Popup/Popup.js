import React from 'react';
import './Popup.css'

const Popup = (props) => {

    return (
        <div className="modal">
            <div className="modal-content">
                <div className='header'>
                    <h1>account login</h1>
                    <button className='close' onClick={props.onClose}><img src='../../IMG/icons8-крестик-78.png' alt='close' /></button>
                </div>
                <p>Enjoy exclusive benefits</p>
                <input className='login-input' type="email" name="email" placeholder='Email Address' />
                <input className='login-input' type="password" name="password" placeholder='Password' />
                <div className='forgot'>
                    <div className='remember'>
                        <input type="checkbox" />
                        <label>Remember me</label>
                    </div>
                    <button>Forgot password</button>
                </div>
                <a href='/account'><button className='but log'>Log in</button></a>
                <a href='/create_account'><button className='but create'>Create your account</button></a>
            </div>
        </div>
    );
}

export default Popup;
