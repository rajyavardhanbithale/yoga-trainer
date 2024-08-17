'use client'

// components/ScrollProvider.tsx

import React, { useEffect, useRef } from 'react';
import Scrollbar from 'smooth-scrollbar';

const ScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const scrollbarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollbarRef.current) {
            Scrollbar.init(scrollbarRef.current, {
                damping: 0.05,
                thumbMinSize: 20,
                renderByPixels: true,
                alwaysShowTracks: true,
                continuousScrolling: true,
                plugins: {
                    overscroll: {
                        effect: 'bounce',
                        damping: 0.1,
                        maxOverscroll: 150,
                    },
                },
            });
        }
    }, []);

    return (
        <div
            ref={scrollbarRef}
            style={{
                height: '100vh',
                overflow: 'hidden', // Hide native scrollbar
                position: 'relative', // Position relative to ensure scrollbar positioning
            }}
        >
            {children}
        </div>
    );
};

export default ScrollProvider;
