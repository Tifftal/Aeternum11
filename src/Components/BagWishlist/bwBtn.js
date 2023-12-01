
import React, { useState, useEffect } from "react";
import Bag from "../Bag/bag";

import Wishlist from "../Wishlist/wishlist";
import './bwBtn.css';
import { useTranslation } from "react-i18next";

const BWBtn = () => {
    const [t] = useTranslation("global");

    const [isOpenBag, setIsOpenBag] = useState(false);
    const [isOpenWishlist, setIsOpenWishlist] = useState(true);

    useEffect(() => {
        if (window.localStorage.getItem("bw") === "bag") {
            setIsOpenBag(true);
            setIsOpenWishlist(false);
            setClasses({
                BagBtn: 'actBtn',
                WishBtn: 'defBtn',
            })
        } else {
            setIsOpenBag(false);
            setIsOpenWishlist(true);
            setClasses({
                WishBtn: 'actBtn',
                BagBtn: 'defBtn',
            })
        }
    }, [])
    
    const HandleOpenBag = () => {
        setIsOpenBag(true)
    };

    const HandleCloseBag = () => {
        setIsOpenBag(false)
    };

    const HandleOpenWishlist = () => {
        setIsOpenWishlist(true)
    };

    const HandleCloseWishlist = () => {
        setIsOpenWishlist(false)
    };

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
            window.localStorage.setItem("bw", "bag")
            HandleOpenBag()
            HandleCloseWishlist()
        } else {
            setClasses({
                BagBtn: 'defBtn',
                WishBtn: 'actBtn',
            })
            window.localStorage.setItem("bw", "wishlist")
            HandleCloseBag()
            HandleOpenWishlist()
        }
    }

    return (
        <div className="bwBtn">

            <div className="floating-btn">
                <button onClick={HandleFloatBtn} className={classes.BagBtn}>Корзина</button>
                <button onClick={HandleFloatBtn} className={classes.WishBtn}>Вишлист</button>
            </div>
            {isOpenBag && (
                <Bag onClose={HandleCloseBag} setIsOpen={setIsOpenBag} />
            )}
            {isOpenWishlist && (
                <Wishlist onClose={HandleCloseWishlist} setIsOpen={setIsOpenWishlist} />
            )}
        </div>

    )
}

export default BWBtn;