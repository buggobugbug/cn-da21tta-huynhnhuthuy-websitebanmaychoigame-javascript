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

    // Hàm chuyển sang ảnh tiếp theo
    const nextSlide = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselData.length);
    }, []);

    // Hàm quay lại ảnh trước
    const prevSlide = useCallback(() => {
        setCurrentIndex(
            (prevIndex) => (prevIndex - 1 + carouselData.length) % carouselData.length
        );
    }, []);

    // Tự động chuyển slider mỗi 5 giây
    useEffect(() => {
        const interval = setInterval(nextSlide, 5000); // 5 giây
        return () => clearInterval(interval); // Cleanup khi component bị unmount
    }, [nextSlide]);

    return (
        <div className="carousel">
            <div className="carousel-container">
                {/* Nút Previous */}
                <button className="carousel-button prev" onClick={prevSlide}>
                    &#10094;
                </button>

                {/* Slider: Hiển thị tất cả ảnh và di chuyển chúng */}
                <div className="carousel-items" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                    {carouselData.map((slide, index) => (
                        <div key={slide.id} className="carousel-item">
                            <img src={slide.imgSrc} alt={`slide-${slide.id}`} />
                        </div>
                    ))}
                </div>

                {/* Nút Next */}
                <button className="carousel-button next" onClick={nextSlide}>
                    &#10095;
                </button>
            </div>
        </div>
    );
};

export default Carousel;
