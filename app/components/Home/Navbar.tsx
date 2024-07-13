'use client'
import { useEffect, useState } from "react";
import { IoAccessibilityOutline, IoCloseOutline, IoCompassOutline, IoTrendingUpOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [animate, setAnimate] = useState(false)

    useEffect(() => {
        let timeout: NodeJS.Timeout
        if (animate) {
            timeout = setTimeout(() => {
                setAnimate(false);
                setIsOpen(false)
            }, 700)
        }
        return () => clearTimeout(timeout); 
    }, [animate])

    return (
        <>
            <nav className="flex mx-5 my-5 justify-between">
                <div className="flex items-center m-1 glass-card p-2">
                    <img
                        src="/home/logo.svg"
                        alt=""
                        className="w-12"
                    />
                    <span
                        className="text-3xl text-slate-100 px-1 m-1 font-extrabold">
                        RAGE AI
                    </span>
                </div>

                <div className="sm:flex hidden flex-row items-center gap-4 m-1 px-6 glass-card">
                    <div className="text-xl text-slate-100 flex items-center">
                        <IoCompassOutline className="inline-flex align-middle mr-2" />
                        <span className="inline-flex items-center">
                            Explore
                        </span>
                    </div>
                    <div className="text-xl text-slate-100 flex items-center">
                        <IoTrendingUpOutline className="inline-flex align-middle mr-2" />
                        <span className="inline-flex items-center">
                            LeaderBoard
                        </span>
                    </div>
                    <div className="text-xl text-slate-100 flex items-center">
                        <IoAccessibilityOutline className="inline-flex align-middle mr-2" />
                        <span className="inline-flex items-center">
                            Practice
                        </span>
                    </div>
                </div>

                <div className="flex flex-row items-center gap-3 m-1 p-2 glass-card">
                    <button className="sm:block hidden text-xl bg-blue-800 text-slate-100 py-2 px-4 rounded-xl shadow-lg shadow-blue-700 glass-card hover:scale-105 duration-200 transform">
                        Login
                    </button>

                    <button
                        onClick={() => setIsOpen(true)}
                        className="sm:hidden block text-xl text-slate-100 py-2 px-4 rounded-xl   hover:scale-105 duration-200 transform">
                        <RxHamburgerMenu className="text-2xl shadow-lg shadow-blue-700" />
                    </button>

                </div>

            </nav>

            {/* Hamburger */}
            {isOpen &&
                <div className={`z-50 glass-card absolute flex flex-col justify-between gap-20 h-screen w-full ${!animate ? "animate-fade-right" : "animate-navbar-close"}`}>
                    <button
                        onClick={() => setAnimate(true)}
                        className="absolute right-3 top-3">
                        <IoCloseOutline className="text-slate-200 text-3xl" />
                    </button>

                    <div className="flex items-center justify-center m-1 glass-card p-2 mt-16 w-3/4 mx-auto">
                        <img
                            src="/home/logo.svg"
                            alt=""
                            className="w-14"
                        />
                        <span
                            className="text-4xl text-slate-100 px-1 m-1 font-extrabold">
                            RAGE AI
                        </span>
                    </div>

                    <div className="flex flex-col gap-5 items-center mx-auto cursor-pointer">
                        <div className="text-4xl text-slate-100 bg-slate-950 bg-opacity-20 rounded-2xl w-full m-1 p-2 text-center">
                            <IoCompassOutline className="inline-flex align-middle mr-2" />
                            <span className="inline-flex items-center">
                                Explore
                            </span>
                        </div>

                        <div className="text-4xl text-slate-100 bg-slate-950 bg-opacity-20 rounded-2xl w-full m-1 p-2 text-center">
                            <IoTrendingUpOutline className="inline-flex align-middle mr-2" />
                            <span className="inline-flex items-center">
                                LeaderBoard
                            </span>
                        </div>
                        <div className="text-4xl text-slate-100 bg-slate-950 bg-opacity-20 rounded-2xl w-full m-1 p-2 text-center">
                            <IoAccessibilityOutline className="inline-flex align-middle mr-2" />
                            <span className="inline-flex items-center">
                                Practice
                            </span>
                        </div>
                    </div>

                    <button className=" glass-card text-3xl text-slate-100 m-2 py-2 mb-16">
                        Login
                    </button>
                </div>
            }
        </>
    )
}