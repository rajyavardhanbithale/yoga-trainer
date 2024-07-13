'use client'

import { useEffect, useState } from "react";

export default function AuthImageSlideShow() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const duration = 10

    const images = [
        'login-1.svg',
        'login-2.svg',
        'login-3.svg',
    ]

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
        }, duration * 1000);

        return () => clearInterval(interval);
    }, []);
    console.log(currentIndex);
    return (
        <>
            <img
                src={`assets/${images[currentIndex]}`}
                alt=""
                className="w-full h-full hover:scale-110 duration-1000 ease-in-out" />
        </>
    )
}