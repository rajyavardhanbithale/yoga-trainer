'use client'

import { RootState } from "@/lib/store"
import { TutorialSource } from "@/lib/store/practice/practiceSlice"
import { useState } from "react"
import { useSelector } from "react-redux"

export default function TutorialControl() {
    const [loading, setLoading] = useState<boolean>(true)

    const tutorialSource: TutorialSource | null = useSelector((state: RootState) => state.practiceSlice.tutorialSource)
    return (
        <>
            {tutorialSource?.source && tutorialSource?.provider === 'animated' &&
                <>
                    <img
                        src={`/pose/tutorial/${tutorialSource.source}`}
                        alt={'animated'}
                        className="absolute top-0 left-0 w-[100vw] h-[100vh] object-contain blur-2xl z-10"
                    />
                    <img
                        src={`/pose/tutorial/${tutorialSource.source}`}
                        alt={'animated'}
                        className="absolute top-0 left-0 w-full h-full object-contain z-20"
                    />
                </>
            }

            {tutorialSource?.source && tutorialSource?.provider === 'video' &&
                <div className="relative h-full">
                    {loading &&
                        <div className="absolute inset-0 flex items-center justify-center bg-slate-400 rounded-2xl animate-pulse z-10"></div>
                    }

                    <iframe
                        className="w-full h-full rounded-2xl z-20"
                        src={tutorialSource.source}
                        title="YouTube video player"
                        allow="encrypted-media; picture-in-picture;"
                        referrerPolicy="strict-origin-when-cross-origin"
                        onLoad={() => setLoading(false)}
                        allowFullScreen
                    ></iframe>
                </div>
            }
        </>
    )
}