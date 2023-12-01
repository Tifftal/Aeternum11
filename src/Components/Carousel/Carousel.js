import MenuCard from "../../Entities/MenuCards/MenuCard";
import { useState } from "react";
import "./Сarousel.css";

export const Carousel = ({ items }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const showPrevSlide = () => {
    setCurrentSlide((currentSlide - 1 + items.length) % items.length);
  };

  const showNextSlide = () => {
    setCurrentSlide((currentSlide + 1) % items.length);
  };

  return (
    <div className="carousel-container"
        style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column"
        }}
    >
      <div className="carousel-wrapper">
        <div
          className="slides"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
            display: "flex",
            flexDirection: "row",
            transition: "transform 0.5s ease-in-out", // Add smooth transition
          }}
        >
          {items.map((item, index) => (
            <MenuCard key={index} data={item} />
          ))}
        </div>
      </div>
      <div className="btnPlaceholder"
        style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "50%",
        }}
      >
        <button className="prev" onClick={showPrevSlide}
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "40px",
                width: "40px",
                borderRadius: "10px",
                backgroundColor: "rgba(255,255,255,0.26)",
                border: "none",
                color: "white",
                fontSize: "1.25rem"
            }}
        >
          «
        </button>
        <button className="next" onClick={showNextSlide}
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "40px",
                width: "40px",
                borderRadius: "10px",
                backgroundColor: "rgba(255,255,255,0.26)",
                border: "none",
                color: "white",
                fontSize: "1.25rem"
            }}
        >
          »
        </button>
      </div>
    </div>
  );
};
