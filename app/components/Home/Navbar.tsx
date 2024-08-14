'use client'

import { useEffect, useState } from 'react'
import {
    IoAccessibilityOutline,
    IoCloseOutline,
    IoLogInOutline,
    IoTrendingUpOutline,
} from 'react-icons/io5'
import { RxHamburgerMenu } from 'react-icons/rx'
import toast, { Toaster } from 'react-hot-toast'
import Link from 'next/link'
import Cookies from 'js-cookie'
import { PiBowlFoodLight } from 'react-icons/pi'
import { createClientBrowser } from '@/utils/supabase/client'
import { MdOutlineSpaceDashboard } from 'react-icons/md'

export default function Navbar() {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isAuth, setIsAuth] = useState<boolean>(false)

    const supabase = createClientBrowser()

    const toastAndSetCookie = (userPromise: Promise<any>, username: string) => {
        toast.promise(
            userPromise,
            {
                loading: 'Loading...',
                success: <b>Hello {username}, You are now logged in</b>,
                error: <b>Couldn&apos;t Authenticate.</b>,
            },
            {
                duration: 2000,
                icon: '🧘',
                style: {
                    borderRadius: '10px',
                    background: '#033298',
                    color: '#fff',
                },
            }
        )
        Cookies.set('init', '0')
    }

    const valiDateUserCookie = async () => {
        const { data: user, error } = await supabase.auth.getSession()
        const userPromise = new Promise((resolve, reject) => {
            if (user.session) {
                setIsAuth(true)
                resolve(user)
            }
        })

        const readCookie = Cookies.get('init')
        readCookie === undefined
            ? toastAndSetCookie(
                  userPromise,
                  user.session?.user?.user_metadata?.name
              )
            : null
    }

    useEffect(() => {
        valiDateUserCookie()
    }, [])

    const options = [
        {
            name: 'diet',
            icon: (
                <PiBowlFoodLight className="inline-flex align-middle mr-2 cursor-pointer" />
            ),
        },
        {
            name: 'leaderBoard',
            icon: (
                <IoTrendingUpOutline className="inline-flex align-middle mr-2 " />
            ),
        },
        {
            name: 'practice',
            icon: (
                <IoAccessibilityOutline className="inline-flex align-middle mr-2 " />
            ),
        },
    ]

    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />

            <nav className="z-50 flex mx-5 my-5 justify-between">
                <div className="flex items-center m-1 glass-card p-2">
                    <img src="/home/logo.svg" alt="" className="w-12" />
                    <span className="text-3xl text-slate-100 px-1 m-1 font-extrabold">
                        RAGE AI
                    </span>
                </div>

                <div className="sm:flex hidden flex-row items-center gap-4 m-1 px-6 glass-card">
                    {options.map((option, idx) => (
                        <Link key={idx} href={`/${option.name.toLowerCase()}`}>
                            <div className="text-xl text-slate-100 flex items-center hover:brightness-50 duration-500 cursor-pointer">
                                {option.icon}
                                <span className="capitalize inline-flex items-center cursor-pointer">
                                    {option.name}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="flex flex-row items-center  m-1 p-2 glass-card">
                    <Link href={isAuth ? '/dashboard' : '/login'}>
                        <button className="sm:block hidden text-xl  text-slate-100 py-2 px-4 rounded-xl shadow-lg shadow-blue-700 hover:scale-105 duration-200 transform">
                            {isAuth ? 'Dashboard' : 'Login'}
                        </button>
                    </Link>

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="sm:hidden block text-xl text-slate-100 py-2 px-4 rounded-xl   hover:scale-105 duration-200 transform"
                    >
                        <RxHamburgerMenu className="text-2xl " />
                    </button>
                </div>
            </nav>

            {/* Hamburger */}
            {isOpen && (
                <div className="fixed top-20 right-0 animate-in mt-6 rounded-2xl w-11/12 inset-x-0 mx-auto shadow-lg z-50 p-4 glass-card">
                    <div className="flex flex-col items-center gap-5">
                        {options.map((option, idx) => (
                            <Link
                                key={idx}
                                href={`/${option.name.toLowerCase()}`}
                                onClick={() => setIsOpen(false)}
                            >
                                <div className="text-xl text-slate-50 flex  px-2 py-1 rounded-2xl items-center hover:brightness-75 duration-1000 cursor-pointer ">
                                    {option.icon}
                                    <span className="capitalize inline-flex items-center cursor-pointer">
                                        {option.name}
                                    </span>
                                </div>
                            </Link>
                        ))}
                        <Link
                            href={isAuth ? '/dashboard' : '/login'}
                            onClick={() => setIsOpen(false)}
                        >
                            <button className="text-xl bg-slate-100 text-slate-900 py-2 px-4 rounded-xl hover:scale-105 duration-200 transform">
                                {isAuth ? (
                                    <span>
                                        <MdOutlineSpaceDashboard className="inline-flex align-middle mr-2 mb-0.5" />
                                        Dashboard
                                    </span>
                                ) : (
                                    <span>
                                        <IoLogInOutline className="inline-flex align-middle mr-2 mb-0.5" />
                                        Login
                                    </span>
                                )}
                            </button>
                        </Link>
                    </div>
                </div>
            )}
        </>
    )
}
