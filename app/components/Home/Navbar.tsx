'use client'
import { createClientBrowser } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'
import {
    IoAccessibilityOutline,
    IoCloseOutline,
    IoTrendingUpOutline,
} from 'react-icons/io5'
import { RxHamburgerMenu } from 'react-icons/rx'
import toast, { Toaster } from 'react-hot-toast'
import Link from 'next/link'
import Cookies from 'js-cookie'
import { createUserForDatabase, postAuth } from '@/app/auth/callback/postAuth'
import { PiBowlFoodLight } from "react-icons/pi"

export default function Navbar() {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isAuth, setIsAuth] = useState<boolean>(false)

    const supabase = createClientBrowser()
    const postAuthFunction = async () => {
        const {
            data: { user },
            error,
        } = await supabase.auth.getUser()

        if (user) {
            // adding new configuration to user-db
            // using false wale because it check if the user created time is
            // greater than Threshold time (in seconds)
            // false if the user is created in the last 2 minutes
            if (!(await postAuth(user?.created_at, 120))) {
                createUserForDatabase(user)
            }
        }
    }

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
        postAuthFunction()
        valiDateUserCookie()
    }, [])

    const options = [
        { name: 'diet', icon: <PiBowlFoodLight className="inline-flex align-middle mr-2 cursor-pointer" /> },
        { name: 'leaderBoard', icon: <IoTrendingUpOutline className="inline-flex align-middle mr-2 " /> },
        { name: 'practice', icon: <IoAccessibilityOutline className="inline-flex align-middle mr-2 " /> }
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
                        <Link
                            key={idx}
                            href={`/${option.name}`}>
                            <div

                                className="text-xl text-slate-100 flex items-center hover:brightness-50 duration-500 cursor-pointer">
                                {option.icon}
                                <span className="capitalize inline-flex items-center cursor-pointer">
                                    {option.name}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="flex flex-row items-center gap-3 m-1 p-2 glass-card">
                    <Link href={isAuth ? '/dashboard' : '/login'}>
                        <button className="sm:block hidden text-xl  text-slate-100 py-2 px-4 rounded-xl shadow-lg shadow-blue-700 hover:scale-105 duration-200 transform">
                            {isAuth ? 'Dashboard' : 'Login'}
                        </button>
                    </Link>

                    <button
                        onClick={() => setIsOpen(true)}
                        className="sm:hidden block text-xl text-slate-100 py-2 px-4 rounded-xl   hover:scale-105 duration-200 transform"
                    >
                        <RxHamburgerMenu className="text-2xl shadow-lg shadow-blue-700" />
                    </button>
                </div>
            </nav >

            {/* Hamburger */}
            {
                isOpen && (
                    <div className="z-50 glass-card absolute flex flex-col justify-between gap-20 h-screen w-full">
                        <button className="absolute right-3 top-3">
                            <IoCloseOutline className="text-slate-200 text-3xl" />
                        </button>

                        <div className="flex items-center justify-center m-1 glass-card p-2 mt-16 w-3/4 mx-auto">
                            <img src="/home/logo.svg" alt="" className="w-14" />
                            <span className="text-4xl text-slate-100 px-1 m-1 font-extrabold">
                                RAGE AI
                            </span>
                        </div>

                        <div className="flex flex-col gap-5 items-center mx-auto cursor-pointer">
                            {options.map((option, idx) => (
                                <div
                                    key={idx}
                                    className="text-4xl capitalize text-slate-100 bg-slate-950 bg-opacity-20 rounded-2xl w-full m-1 p-2 text-center">
                                    {option.icon}
                                    <span className="inline-flex items-center">
                                        {option.name}
                                    </span>
                                </div>
                            ))}


                        </div>

                        <Link href={isAuth ? '/dashboard' : '/login'}>
                            <button className=" glass-card text-3xl text-slate-100 m-2 py-2 mb-16">
                                {isAuth ? 'Dashboard' : 'Login'}
                            </button>
                        </Link>
                    </div>
                )
            }
        </>
    )
}
