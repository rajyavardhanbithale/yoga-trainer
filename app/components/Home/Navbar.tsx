'use client'
import { createClientBrowser } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { IoAccessibilityOutline, IoCloseOutline, IoCompassOutline, IoTrendingUpOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import toast, { Toaster } from 'react-hot-toast';
import Link from "next/link";
import Cookies from 'js-cookie';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [animate, setAnimate] = useState<boolean>(false)
    const [isAuth, setIsAuth] = useState<boolean>(false)

    const supabase = createClientBrowser()


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


    const toastAndSetCookie = (userPromise: Promise<any>, username: string) => {
        toast.promise(userPromise, {
            loading: 'Loading...',
            success: <b>Hello {username}, You are now logged in</b>,
            error: <b>Couldn't Authenticate.</b>
        }, {
            duration: 2000,
            icon: '🧘',
            style: {
                borderRadius: '10px',
                background: '#033298',
                color: '#fff',
            },
        })
        Cookies.set('init', '0')
    }

    const handleReadCookie = async () => {
        const { data: { user } } = await supabase.auth.getUser()

        const userPromise = new Promise((resolve, reject) => {
            if (user) {
                setIsAuth(true)
                resolve(user);
            }
        });

        const ISLOGGEDIN = Cookies.get(
            'sb-kdsknciyenkdduogvoqj-auth-token.0' ||
            'sb-kdsknciyenkdduogvoqj-auth-token') ? true : false


        const SHOWTOAST = Cookies.get('init') ? true : false


        ISLOGGEDIN && !SHOWTOAST && (
            toastAndSetCookie(userPromise, user?.user_metadata?.name)
        )

    }

    useEffect(() => {
        handleReadCookie()
    }, [])

    console.log("navbar ",process.browser);
    

    return (
        <>
            <Toaster
                position="top-right"
                reverseOrder={false}

            />

            <nav className="z-50 flex mx-5 my-5 justify-between">
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
                    <Link href={isAuth ? "/dashboard" : "/login"}>
                        <button className="sm:block hidden text-xl  text-slate-100 py-2 px-4 rounded-xl shadow-lg shadow-blue-700 hover:scale-105 duration-200 transform">
                            {isAuth ? "Dashboard" : "Login"}
                        </button>
                    </Link>

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

                    <Link href={isAuth ? "/dashboard" : "/login"}>
                        <button

                            className=" glass-card text-3xl text-slate-100 m-2 py-2 mb-16">
                            {isAuth ? "Dashboard" : "Login"}
                        </button>
                    </Link>
                </div>
            }
        </>
    )
}