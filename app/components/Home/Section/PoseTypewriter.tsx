'use client'

import { Raleway } from 'next/font/google'
import { useEffect, useState } from 'react'
import Typewriter from 'typewriter-effect'
import { Separator } from '@/components/ui/separator'
import PanZoom from './Panzoom'

interface Pose {
    id: number
    name: string
    originalName: string
    image: string
}

const raleway = Raleway({ subsets: ['latin'] })
export default function PoseTypewriter() {
    const [poseList, setPoseList] = useState<string[]>([])

    useEffect(() => {
        const fetchPoseList = async () => {
            const response = await fetch('/api/pose?list=true', {
                next: { revalidate: 3600 },
            })
            const data: Pose[] = await response.json()

            console.log(data)

            setPoseList(data.map((item: Pose) => item.originalName))
        }

        fetchPoseList()
    }, [])

    return (
        <>
            <PanZoom minZoom={1} maxZoom={1.1}>
                <div className="flex flex-col gap-5">
                    <Separator className="w-1/4 mx-auto opacity-20" />
                    <div
                        className={`${raleway.className} w-full flex flex-col sm:flex-row justify-center items-center gap-3`}
                    >
                        <span className="text-slate-50 text-4xl font-medium sm:w-1/2 text-end bg-gradient-to-r from-slate-50 via-slate-100 to-slate-200 text-transparent bg-clip-text">
                            Engage in the
                        </span>

                        <span className="text-slate-50 truncate capitalize sm:text-4xl text-3xl font-bold sm:w-1/2 text-start bg-gradient-to-r from-slate-200 via-slate-300 to-slate-600 text-transparent bg-clip-text">
                            {poseList && (
                                <Typewriter
                                    options={{
                                        strings: poseList
                                            ? poseList
                                            : 'Loading...',
                                        autoStart: true,
                                        delay: 50,
                                        deleteSpeed: 90,
                                        loop: true,
                                        cursor: '|',
                                    }}
                                />
                            )}
                        </span>
                    </div>
                    <Separator className="w-1/4 mx-auto opacity-20" />
                </div>
            </PanZoom>
        </>
    )
}
