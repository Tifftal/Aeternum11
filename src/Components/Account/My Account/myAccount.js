import React from "react";
import './myAccount.css';

const MyAccount = () => {
    return (
        <div className="my-account">
            <div className="profile">
                <p><img src="../../IMG/icons8-user-96.png" alt="profile" />Profile</p>
                <div className="profile-menu">
                    <a href="/account"><button>Personal Information</button></a>
                    <a href="/account"><button>Addresses</button></a>
                    <a href="/account"><button>Registrated Cards</button></a>
                    <a href="/account"><button>Edit your details</button></a>
                    <a href="/account"><button>Preferences</button></a>
                </div>
            </div>
            <div className="profile">
                <p><img src="../../IMG/icons8-круглая-стрелка-100.png" alt="orders" />Orders</p>
                <div className="profile-menu">
                    <a href="/account"><button>Order Details</button></a>
                </div>
            </div>
        </div>

    )
}

export default MyAccount;