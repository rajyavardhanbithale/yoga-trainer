'use client'
import Link from "next/link";
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';




function Title({ children }: { children: React.ReactNode }) {

    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true });

    const text = typeof children === 'string' ? children : '';
    const words = text.split(' ');

    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.12, delayChildren: 0.04 },
        },
    };

    const child = {
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: 'spring',
                damping: 12,
                stiffness: 100,
            },
        },
        hidden: {
            opacity: 0,
            x: 20,
            transition: {
                type: 'spring',
                damping: 12,
                stiffness: 100,
            },
        },
    };
    return (
        <>
            {/* <span className="xl:text-3xl text-4xl text-center xl:text-start font-semibold bg-gradient-to-br from-slate-50 via-slate-200 to-slate-400 text-transparent bg-clip-text">
                {children}
            </span> */}

            <motion.div
                ref={ref}
                style={{ overflow: 'hidden', display: 'flex', fontSize: '2rem' }}
                variants={container}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                transition={{ duration: 5, delay: 5 }}
                className="xl:text-3xl text-4xl text-center xl:text-start font-semibold bg-gradient-to-br from-slate-50 via-slate-200 to-slate-400 text-transparent bg-clip-text"
            >
                {words.map((word, index) => (
                    <motion.span
                        variants={child}
                        style={{ marginRight: '5px' }}
                        key={index}
                        className="xl:text-3xl text-4xl text-center xl:text-start font-semibold bg-gradient-to-br from-slate-50 via-slate-200 to-slate-400 text-transparent bg-clip-text"
                    >
                        {word}
                    </motion.span>
                ))}
            </motion.div>
        </>
    )
}

function Description({ children }: { children: React.ReactNode }) {
    return (
        <>
            <p className="xl:text-2xl text-3xl font-light text-justify sm:text-left bg-gradient-to-br from-slate-50 via-slate-200 to-slate-400 text-transparent bg-clip-text">
                {children}
            </p>
        </>
    )
}

function Button({ children, link }: { children: React.ReactNode, link: string }) {
    return (
        <>
            <Link
                href={link}
                className="group inline-flex items-center glass-card hover:bg-white/20 text-white font-medium py-3 px-8 rounded-full transition-all duration-300 ease-in-out"
            >
                <span className="text-xl xl:text-base">
                    {children}
                </span>
                <svg
                    className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300 ease-in-out"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                </svg>
            </Link>
        </>
    )
}

export { Title, Description, Button }