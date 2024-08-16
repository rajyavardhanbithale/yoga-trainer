'use client'

import { useEffect, useState } from 'react'
import Marquee from 'react-fast-marquee'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface Pose {
    id: number
    name: string
    originalName: string
    image: string
}

export default function ImageMarquee() {
    const [poseList, setPoseList] = useState<Pose[]>([])
    const [imageList, setImageList] = useState<string[]>([])

    useEffect(() => {
        const fetchPoseList = async () => {
            const response = await fetch('/api/pose?list=true', {
                next: { revalidate: 3600 },
            })
            const data: Pose[] = await response.json()
            setPoseList(data)
            setImageList(data.map((pose) => pose.image))
        }

        fetchPoseList()
    }, [])

    const firstHalf = imageList.slice(0, imageList.length / 2)
    const secondHalf = imageList.slice(imageList.length / 2, imageList.length)

    console.log(firstHalf)
    return (
        <div className="flex flex-col xl:flex-row gap-5">
            <div className="hidden w-1/2 xl:flex xl:flex-col gap-8 rounded-2xl skew-y-3">
                <Marquee direction="right" autoFill={true}>
                    <div className="flex flex-row">
                        {firstHalf.map((image, idx) => (
                            <div
                                key={idx}
                                className="bg-white/10 backdrop-blur-lg mx-3 h-32 w-32  rounded-2xl p-1"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-500/20 opacity-10"></div>
                                <img
                                    key={idx}
                                    src={`/pose/image/webp/${image}`}
                                    alt=""
                                    className="object-cover h-full w-full"
                                />
                            </div>
                        ))}
                    </div>
                </Marquee>

                <Marquee direction="left" autoFill={true}>
                    <div className="flex flex-row">
                        {secondHalf.map((image, idx) => (
                            <div
                                key={idx}
                                className="bg-white/10 backdrop-blur-lg mx-3 h-32 w-32  rounded-2xl p-1"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-500/20 opacity-10"></div>
                                <img
                                    key={idx}
                                    src={`/pose/image/webp/${image}`}
                                    alt=""
                                    className="object-cover h-full w-full"
                                />
                            </div>
                        ))}
                    </div>
                </Marquee>
            </div>

            <div className="xl:w-1/2 flex flex-col justify-start m-3 p-3">
                <span className="xl:text-3xl text-4xl text-center xl:text-start font-semibold bg-gradient-to-br from-slate-50 via-slate-200 to-slate-400 text-transparent bg-clip-text">
                    Your Personalized Yoga Companion
                </span>

                <div className="xl:hidden block">
                    <Marquee direction="left" autoFill={true} className="my-10">
                        <div className="flex flex-row">
                            {imageList.map((image, idx) => (
                                <div
                                    key={idx}
                                    className="bg-white/10 backdrop-blur-lg mx-3 h-32 w-32  rounded-2xl p-1"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-500/20 opacity-10"></div>
                                    <img
                                        key={idx}
                                        src={`/pose/image/webp/${image}`}
                                        alt=""
                                        className="object-cover h-full w-full"
                                    />
                                </div>
                            ))}
                        </div>
                    </Marquee>
                </div>

                <div className="flex flex-1 items-center justify-center">
                    <span className="xl:text-2xl text-3xl font-light bg-gradient-to-br from-slate-50 via-slate-200 to-slate-400 text-transparent bg-clip-text">
                        Select yoga poses and get instant feedback with our
                        easy-to-use platform. Enjoy helpful tips from our guide
                        and make your practice smoother and more enjoyable.
                        Start improving your yoga today!
                    </span>
                </div>

                <div className="mt-5 xl:mt-1">
                    <Link
                        href="/practice"
                        className="group inline-flex items-center bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-8 rounded-full transition-all duration-300 ease-in-out"
                    >
                        <span className="text-xl xl:text-base">
                            Try AI Trainer
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
                </div>
            </div>
        </div>
    )
}
