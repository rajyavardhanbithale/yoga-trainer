'use client'

import { poseInfo } from '@/app/api/pose/poseApiData'
import { ScrollArea } from '@/components/ui/scroll-area'
import Link from 'next/link'
import { useState } from 'react'
import {
    IoAccessibility,
    IoAccessibilityOutline,
    IoHomeOutline,
} from 'react-icons/io5'
import { LuLayoutDashboard } from 'react-icons/lu'

import '@/app/components/Yoga/yoga.css'

interface sidebarShowCase {
    id: number
    title: string
    image: string
}

export default function YogaSidebar() {
    const [open, setOpen] = useState<boolean>(false)

    const pose: sidebarShowCase[] = poseInfo.map((pose) => ({
        id: pose.id,
        title: pose.name,
        image: pose.image,
    }))

    const options = [
        { title: 'Pose', icon: <IoAccessibilityOutline /> },
        { title: 'Home', icon: <IoHomeOutline /> },
        { title: 'Dashboard', icon: <LuLayoutDashboard /> },
    ]

    return (
        <>
            <div className="hidden xl:block h-screen fixed w-52">
                <ScrollArea data-lenis-prevent className="h-[99vh] w-full rounded-md border p-2">
                    <div className="flex flex-col gap-5 p-2">
                        {pose.map((pose, idx) => (
                            <Link key={idx} href={`/practice?id=${pose.id}`}>
                                <div className="bg-slate-50 flex flex-col gap-3 justify-center items-center rounded-2xl border-4 hover:border-slate-400 duration-700 cursor-pointer">
                                    <div className="w-full overflow-hidden">
                                        <img
                                            src={`/pose/image/webp/${pose.image}`}
                                            alt={pose.title}
                                            className="w-full h-full object-contain hover:scale-110 duration-500 rounded-2xl"
                                        />
                                    </div>
                                    <div className="bg-slate-200 p-2 w-full text-center rounded-2xl">
                                        <span className="font-bold text-slate-800 text-[1.1rem] capitalize hover:text-blue-950 duration-500">
                                            {pose.title}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </ScrollArea>
            </div>

            {/* display button to open side menu */}
            <div className="xl:hidden block">
                <div
                    onClick={() => setOpen(!open)}
                    className="absolute top-5 left-3 p-1 bg-slate-200 rounded-xl cursor-pointer"
                >
                    <IoAccessibility className="text-2xl text-slate-800 hover:animate-spin animate-once animate-duration-[2000ms] animate-ease-in-out" />
                </div>
            </div>

            {/* for mobile devices */}

            {open && (
                <div
                    className={`h-full fixed w-64 bg-slate-300 z-[100] ${open ? 'sidebar-in-animation' : 'sidebar-out-animation'}`}
                >
                    <ScrollArea data-lenis-prevent className="h-full w-full border p-2">
                        <div className="flex flex-col gap-5 p-2">
                            {pose.map((pose, idx) => (
                                <Link
                                    key={idx}
                                    href={`/practice?id=${pose.id}`}
                                >
                                    <div
                                        onClick={() => setOpen(false)}
                                        className="bg-slate-50 flex flex-col gap-3 justify-center items-center rounded-2xl border-4 hover:border-slate-400 duration-700 cursor-pointer"
                                    >
                                        <div className="w-full overflow-hidden">
                                            <img
                                                src={`/pose/image/webp/${pose.image}`}
                                                alt={pose.title}
                                                className="w-full h-full object-contain hover:scale-110 duration-500 rounded-2xl"
                                            />
                                        </div>
                                        <div className="bg-slate-200 p-2 w-full text-center rounded-2xl">
                                            <span className="font-bold text-slate-800 text-[1.1rem] capitalize hover:text-blue-950 duration-500">
                                                {pose.title}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </ScrollArea>
                </div>
            )}

            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="absolute h-screen w-screen bg-transparent z-[99]"
                ></div>
            )}
        </>
    )
}
