import React, { useState } from "react";
import Bag from "../Bag/bag";
import DropUn from "../Navbar/DropDownMenu/dropUnisex";
import DropW from "../Navbar/DropDownMenu/dropWomen";
import Wishlist from "../Wishlist/wishlist";
import './bwBtn.css';

const BWBtn = () => {
    const [isOpenBag, setIsOpenBag] = useState(false);
    const [isOpenWishlist, setIsOpenWishlist] = useState(true);

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
            HandleOpenBag()
            HandleCloseWishlist()
        } else {
            setClasses({
                BagBtn: 'defBtn',
                WishBtn: 'actBtn',
            })
            HandleCloseBag()
            HandleOpenWishlist()
        }
    }

    return (
        <div className="bwBtn">

            <div className="floating-btn">
                <button onClick={HandleFloatBtn} className={classes.BagBtn}>Bag</button>
                <button onClick={HandleFloatBtn} className={classes.WishBtn}>Wishlist</button>
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