'use client'

import { createClientBrowser } from '@/utils/supabase/client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
    IoAccessibilityOutline,
    IoHomeOutline,
    IoLogInOutline,
    IoTrendingUpOutline,
} from 'react-icons/io5'
import { MdOutlineSpaceDashboard, MdMenu } from 'react-icons/md'
import { PiBowlFoodLight } from 'react-icons/pi'

export default function NavbarDummy() {
    const pathname = usePathname()
    const [isAuth, setIsAuth] = useState<boolean>(false)
    const [menuOpen, setMenuOpen] = useState<boolean>(false)

    // Extract the current path directly from pathname
    const currentPath = pathname === '/' ? '/' : pathname.split('/')[1]

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

    const supabase = createClientBrowser()
    const valiDateUserCookie = async () => {
        const { data: user, error } = await supabase.auth.getSession()
        if (user.session) {
            setIsAuth(true)
        }
    }
    useEffect(() => {
        valiDateUserCookie()
    }, [])

    // Define paths where the navbar should be hidden
    const hiddenPaths = ['/', 'dashboard']

    return (
        <>
            {!hiddenPaths.includes(currentPath) && (
                <nav className="z-[120] w-full fixed h-20 glass-nav inset-0 mx-auto mt-5 flex justify-between items-center px-4 sm:px-8">
                    {/* Logo */}
                    <Link href="/">
                        <div className="flex items-center m-1 p-2">
                            <img
                                src="/home/logo.svg"
                                alt="Logo"
                                className="w-12"
                            />
                            <span className="text-2xl text-blue-950 px-1 m-1 mt-1 font-extrabold">
                                RAGE AI
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden sm:flex flex-row items-center gap-5 m-1 px-6">
                        {options.map((option, idx) => (
                            <Link key={idx} href={`/${option.name}`}>
                                <div
                                    className={`text-xl text-slate-900 flex bg-slate-100 bg-opacity-60 px-2 py-1 rounded-2xl items-center hover:brightness-75 duration-1000 cursor-pointer ${currentPath === option.name ? 'bg-blue-100' : ''}`}
                                >
                                    {currentPath === option.name ? (
                                        <IoHomeOutline className="inline-flex align-middle mr-2 " />
                                    ) : (
                                        option.icon
                                    )}
                                    <span className="capitalize inline-flex items-center cursor-pointer">
                                        {currentPath === option.name
                                            ? 'Home'
                                            : option.name}
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Authentication Button */}
                    <div className="hidden sm:flex flex-row items-center gap-3 m-1 p-2">
                        <Link href={isAuth ? '/dashboard' : '/login'}>
                            <button className="text-xl bg-slate-100 bg-opacity-60 text-slate-900 py-2 px-4 rounded-xl hover:scale-105 duration-200 transform">
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

                    {/* Mobile Menu Button */}
                    <div className="sm:hidden flex items-center">
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="text-2xl"
                        >
                            <MdMenu />
                        </button>
                    </div>
                </nav>
            )}

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="fixed top-20 right-0 w-full mt-6 rounded-2xl bg-slate-100 shadow-lg z-50 p-4">
                    <div className="flex flex-col items-center gap-5">
                        {options.map((option, idx) => (
                            <Link
                                key={idx}
                                href={`/${option.name}`}
                                onClick={() => setMenuOpen(false)}
                            >
                                <div
                                    className={`text-xl text-slate-900 flex bg-slate-100 px-2 py-1 rounded-2xl items-center hover:brightness-75 duration-1000 cursor-pointer ${currentPath === option.name ? 'bg-blue-100' : ''}`}
                                >
                                    {option.icon}
                                    <span className="capitalize inline-flex items-center cursor-pointer">
                                        {option.name}
                                    </span>
                                </div>
                            </Link>
                        ))}
                        <Link
                            href={isAuth ? '/dashboard' : '/login'}
                            onClick={() => setMenuOpen(false)}
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

            {!hiddenPaths.includes(currentPath) && (
                <div className="mb-12 md:mb-16"></div>
            )}
        </>
    )
}
