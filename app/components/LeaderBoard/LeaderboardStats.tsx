'use client'

import React, { useRef, useEffect, useState } from 'react'
import './leaderboard.css'

export default function LeaderboardStats({
    accuracy,
    timeSpent,
    session,
}: {
    accuracy: number
    timeSpent: number
    session: number
}) {
    const sliderRef = useRef<HTMLInputElement>(null)
    const [sliderWidthAccuracy, setSliderWidthAccuracy] =
        useState<string>('75%')
    const [sliderWidthTime, setSliderWidthTime] = useState<string>('75%')

    useEffect(() => {
        const widthPercentage = Math.max(25, Math.min(100, accuracy * 100))
        setSliderWidthAccuracy(`${widthPercentage}%`)
    }, [accuracy])

    useEffect(() => {
        const widthPercentage = Math.max(0, Math.min(100, timeSpent))
        setSliderWidthTime(`${widthPercentage}%`)
    }, [timeSpent])

    return (
        <div className="flex flex-col gap-[2px] items-center justify-start">
            <div className="w-full flex items-center gap-2">
                <span className="text-sm text-slate-50">Accuracy </span>
                <input
                    type="range"
                    className="gradient-slider"
                    ref={sliderRef}
                    min="0"
                    max="100"
                    value={Math.floor(accuracy * 100)}
                    disabled
                    style={{ width: sliderWidthAccuracy }}
                />
            </div>
            <div className="w-full flex items-center gap-2">
                <span className="text-sm text-slate-50">Duration </span>
                <input
                    type="range"
                    className="gradient-slider"
                    ref={sliderRef}
                    min="0"
                    max="100"
                    value={Math.floor(timeSpent / 100)}
                    disabled
                    style={{ width: sliderWidthTime }}
                />
            </div>
            <div className="w-full flex items-center gap-2">
                <span className="text-sm text-slate-50">Yoga Sessions </span>
                <span className="text-sm text-slate-50">{session}</span>
            </div>
        </div>
    )
}
