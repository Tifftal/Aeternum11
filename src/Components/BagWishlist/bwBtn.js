
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
                BagBtn: 'actBtn font-gramatika-reg',
                WishBtn: 'defBtn font-gramatika-reg',
            })
        } else {
            setIsOpenBag(false);
            setIsOpenWishlist(true);
            setClasses({
                WishBtn: 'actBtn font-gramatika-reg',
                BagBtn: 'defBtn font-gramatika-reg',
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
        BagBtn: 'defBtn font-gramatika-reg',
        WishBtn: 'actBtn font-gramatika-reg',
    });

    const HandleFloatBtn = (isOpen = true) => {
        if (!isOpen) {
            setClasses({
                BagBtn: 'actBtn font-gramatika-reg',
                WishBtn: 'defBtn font-gramatika-reg',
            })
            window.localStorage.setItem("bw", "bag")
            HandleOpenBag()
            HandleCloseWishlist()
        } else if (isOpen) {
            setClasses({
                BagBtn: 'defBtn font-gramatika-reg',
                WishBtn: 'actBtn font-gramatika-reg',
            })
            window.localStorage.setItem("bw", "wishlist")
            HandleCloseBag()
            HandleOpenWishlist()
        }
    }

    return (
        <div className="bwBtn">

            <div className="floating-btn">
                <button onClick={() => {HandleFloatBtn(false)}} className={classes.BagBtn}>Корзина</button>
                <button onClick={() => {HandleFloatBtn(true)}} className={classes.WishBtn}>Вишлист</button>
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