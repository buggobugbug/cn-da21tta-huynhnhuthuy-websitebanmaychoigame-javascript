import React, { useState, useEffect, useCallback } from 'react';
import './Carousel.css';
import img1 from '../assets/slideshow_1.jpg';
import img2 from '../assets/slideshow_6.jpg';
import img3 from '../assets/slideshow_2.jpg';

const carouselData = [
    {
        id: 1,
        imgSrc: img1,
    },
    {
        id: 2,
        imgSrc: img2,
    },
    {
        id: 3,
        imgSrc: img3,
    },
];

const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselData.length);
    }, []);

    const prevSlide = useCallback(() => {
        setCurrentIndex(
            (prevIndex) => (prevIndex - 1 + carouselData.length) % carouselData.length
        );
    }, []);

    useEffect(() => {
        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval);
    }, [nextSlide]);

    return (
        <div className="carousel-custom">
            <div className="carousel-custom-container">
                {/* Nút Previous */}
                <button className="carousel-custom-button prev" onClick={prevSlide}>
                    &#10094;
                </button>

                {/* Slider */}
                <div
                    className="carousel-custom-items"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {carouselData.map((slide) => (
                        <div key={slide.id} className="carousel-custom-item">
                            <img src={slide.imgSrc} alt={`slide-${slide.id}`} />
                        </div>
                    ))}
                </div>

                {/* Nút Next */}
                <button className="carousel-custom-button next" onClick={nextSlide}>
                    &#10095;
                </button>
            </div>
        </div>
    );
};

export default Carousel;
