'use client'
import { AppDispatch } from '@/lib/store'
import { setVolume } from '@/lib/store/practice/audioSlice'
import { useState } from 'react'
import { IoMdVolumeHigh } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'

export default function VolumeSlider() {
    const volumeVal = useSelector((state: any) => state.audioSlice.volume)

    const [volume, setVolumeLocal] = useState<number>(volumeVal)

    const dispatch = useDispatch<AppDispatch>()

    const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVolumeLocal(parseInt(e.target.value))
        dispatch(setVolume(parseInt(e.target.value)))
    }

    return (
        <>
            <label className="slider">
                <span className="ml-2 text-nowrap w-8">{volume} %</span>
                <input
                    type="range"
                    className="level"
                    onChange={(e) => handleVolume(e)}
                    value={volume}
                />
                <IoMdVolumeHigh className="text-3xl mr-2" />
            </label>
        </>
    )
}
