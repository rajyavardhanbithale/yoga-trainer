'use client'

import { useEffect, useState } from 'react'
import Marquee from 'react-fast-marquee'
import { Button, Description, Title } from './StyleUtils'

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

    return (
        <div className="flex flex-col xl:flex-row gap-5">
            <div className="hidden w-1/2 xl:flex xl:flex-col gap-8 rounded-2xl xl:skew-yoga">
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
                <Title>Your Personalized Yoga Companion</Title>

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
                    <Description>
                        Select yoga poses and get instant feedback with our
                        easy-to-use platform. Enjoy helpful tips from our guide
                        and make your practice smoother and more enjoyable.
                        Start improving your yoga today!
                    </Description>
                </div>

                <div className="mt-8 xl:mt-1">
                    <Button link="/practice">Try AI Trainer</Button>
                </div>
            </div>
        </div>
    )
}
