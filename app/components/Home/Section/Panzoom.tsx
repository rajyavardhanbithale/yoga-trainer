'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ZoomableDivProps {
    children: React.ReactNode;
    minZoom?: number; 
    maxZoom?: number; 
}

export default function ZoomableDiv({ children, minZoom = 1, maxZoom = 4 }: ZoomableDivProps) {
    const [scale, setScale] = useState(minZoom);

    useEffect(() => {
        const handleWheel = (event: WheelEvent) => {
            event.preventDefault(); 

            setScale(prevScale => {
                const zoomFactor = 0.001; 
                const newScale = Math.min(
                    Math.max(minZoom, prevScale - event.deltaY * zoomFactor),
                    maxZoom
                );
                return newScale;
            });
        };

        window.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            window.removeEventListener('wheel', handleWheel);
        };
    }, [minZoom, maxZoom]);

    return (
        <motion.div
            style={{ scale }}
            className="transition-transform duration-300 ease-in-out overflow-x-hidden overflow-y-auto"
        >
            {children}
        </motion.div>
    );
}
