import React, { useState, useEffect } from "react";
import '../assets/css/slideBanner.css';
import slide1 from '../assets/img/slide-banner-1.svg';
import slide2 from '../assets/img/slide-banner-2.svg';
import slide3 from '../assets/img/slide-banner-3.svg';

export default function SlideBanner() {
    const images = [slide1, slide2, slide3];
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); 

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="slide-banner">
            <div 
                className="slide-container" 
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {images.map((image, index) => (
                    <div className="slide" key={index}>
                        <img src={image} alt={`Slide ${index + 1}`} />
                    </div>
                ))}
            </div>
        </div>
    );
}
