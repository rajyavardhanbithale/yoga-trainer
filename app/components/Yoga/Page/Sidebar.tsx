// 'use client'

import { poseInfo } from "@/app/api/pose/poseApiData"
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from "next/link";
import { IoAccessibilityOutline, IoHomeOutline } from "react-icons/io5";
import { LuLayoutDashboard } from "react-icons/lu";

interface sidebarShowCase {
    id: number,
    title: string,
    image: string,
}

export default function YogaSidebar() {

    const pose: sidebarShowCase[] = poseInfo.map(pose => ({
        id: pose.id,
        title: pose.name,
        image: pose.image
    }));

    const options = [
        { title: 'Pose', icon: <IoAccessibilityOutline /> },
        { title: 'Home', icon: <IoHomeOutline /> },
        { title: 'Dashboard', icon: <LuLayoutDashboard /> },
    ]

    return (
        <>
            <div className="h-screen fixed w-52">
                <ScrollArea className="h-[99vh] w-full rounded-md border p-2">
                    <div className="flex flex-col gap-5 p-2">
                        {pose.map((pose, idx) => (
                            <Link
                                key={idx}
                                href={`/practice?id=${pose.id}`}
                            >
                                <div
                                    className="bg-slate-50 flex flex-col gap-3 justify-center items-center rounded-2xl border-4 hover:border-slate-400 duration-700 cursor-pointer">

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

            {/* <div className="h-[98vh] w-14 bg-blue-950 ml-2 mt-2 rounded-2xl border-1 border-slate-50">
                <div className="flex flex-col justify-evenly h-full items-center">
                    {options.map((option, idx) => (
                        <div key={idx} className="flex flex-col gap-5 p-2">
                            <div className="bg-slate-50 flex flex-col gap-3 justify-center items-center rounded-xl p-2 hover:border-slate-400 duration-700 cursor-pointer">
                                <div className="w-full overflow-hidden text-3xl">
                                    {option.icon}
                                </div>
                                
                            </div>
                        </div>
                    ))}
                </div>
            </div> */}
        </>
    )
}