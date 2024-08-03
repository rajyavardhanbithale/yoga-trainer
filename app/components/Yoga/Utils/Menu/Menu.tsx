'use client'

import Image from 'next/image'
import { useState } from 'react'
import { RiDashboardFill, RiMenu5Line } from 'react-icons/ri'
import '@/app/components/Yoga/yoga.css'
import Preferences from './Preferences'
import { IoMdHome } from 'react-icons/io'
import Link from 'next/link'

export default function Menu() {
    const [hover, setHover] = useState<boolean>(false)

    return (
        <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className={`flex gap-2 p-1 bg-slate-200 rounded-xl justify-center items-center z-[300] ${hover && 'animate-fade-left flex-row-reverse'}`}
        >
            <div className="cursor-pointer">
                <RiMenu5Line className="text-2xl text-slate-800 font-extrabold" />
            </div>

            <div
                className={`flex gap-1 justify-center items-center ${hover ? 'block' : 'hidden'}`}
            >
                <Link href={'/'}>
                    <div
                        className={`cursor-pointer ${hover ? 'slide-enter' : 'slide-exit'}`}
                    >
                        <IoMdHome className="text-2xl text-slate-800 hover:scale-125 duration-500" />
                    </div>
                </Link>
                <div
                    className={`cursor-pointer ${hover ? 'slide-enter' : 'slide-exit'}`}
                >
                    <Preferences />
                </div>
                <Link href={'/dashboard'}>
                    <div
                        className={`cursor-pointer ${hover ? 'slide-enter' : 'slide-exit'}`}
                    >
                        <RiDashboardFill className="text-2xl text-slate-800  hover:scale-125 duration-500" />
                    </div>
                </Link>
            </div>
        </div>
    )
}
