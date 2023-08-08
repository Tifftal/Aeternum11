import React from "react";
import './main.css';
import First from "./FirstContainer/first";
import Second from "./SecondContainer/second";
import Third from "./ThirdContainer/third";
import Fourth from "./FourthContainer/fourth";
import Fifth from "./FifthComponents/fifth";

const Main = () => {

    return (
        <div className="main">
            <First />
            <Second />
            <Third />
            <Fourth />
            <Fifth />
        </div>
    )
}

export default Main;