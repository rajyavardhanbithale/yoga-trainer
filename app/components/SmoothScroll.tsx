'use client'
import { ReactLenis } from '@studio-freight/react-lenis'
import { usePathname, useRouter } from 'next/navigation'

function SmoothScrolling({ children }: { children: React.ReactNode }) {
    const searchParam = usePathname()

    return (
        // disable smooth scrolling for practice page
        <>
            {searchParam.includes('practice') ? (
                children
            ) : (
                <ReactLenis
                    root
                    options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}
                >
                    {children}
                </ReactLenis>
            )}
        </>
    )
}

export default SmoothScrolling
