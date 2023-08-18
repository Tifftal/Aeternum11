import React, { useState } from "react";
import './bwBtn.css';

const BWBtn = () => {
    const [classes, setClasses] = useState({
        BagBtn: 'defBtn',
        WishBtn: 'actBtn',
    });

    const HandleFloatBtn = (e) => {
        if (classes.BagBtn === 'defBtn' && classes.WishBtn === 'actBtn') {
            setClasses({
                BagBtn: 'actBtn',
                WishBtn: 'defBtn',
            })
        } else {
            setClasses({
                BagBtn: 'defBtn',
                WishBtn: 'actBtn',
            })
        }
            
    }
    return (
        <div className="bwBtn">
            <div className="floating-btn">
                <button onClick={HandleFloatBtn} className={classes.BagBtn}>Bag</button>
                <button onClick={HandleFloatBtn} className={classes.WishBtn}>Wishlist</button>
            </div>
        </div>

    )
}

export default BWBtn;