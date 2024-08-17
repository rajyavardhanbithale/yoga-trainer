'use client'

import React, { useEffect, useRef } from 'react'
import Scrollbar from 'smooth-scrollbar'

const ScrollProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const scrollbarRef = useRef<HTMLDivElement>(null)

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
            })
        }
    }, [])

    return (
        <div
            ref={scrollbarRef}
            style={{
                height: '100vh',
                overflow: 'hidden',
                position: 'relative',
            }}
        >
            {children}
        </div>
    )
}

export default ScrollProvider
