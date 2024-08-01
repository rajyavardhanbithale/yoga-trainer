'use client'

import { AppDispatch } from '@/lib/store'
import { setAudioState } from '@/lib/store/practice/audioSlice'
import { IoIosArrowDown } from 'react-icons/io'
import { IoVolumeMediumOutline, IoVolumeMuteOutline } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import AudioSpeed from './AudioSpeed'
import RelaxMusic from './RelaxMusic'
import VolumeSlider from './VolumeSlider'

export default function AudioControl() {
    const audioState = useSelector((state: any) => state.audioSlice.audioState)
    const dispatch = useDispatch<AppDispatch>()

    const handleAudioState = (state: 'narrator' | 'tips') => {
        if (audioState !== state) {
            dispatch(setAudioState(state))
        } else {
            dispatch(setAudioState(null))
        }
    }
    
    
    return (
        <>
            <div className="w-full flex flex-col gap-5 p-5 m-5">
                <div className="w-full flex gap-10">
                    <div className="w-1/2 flex flex-col text-center gap-2">
                        <span className="text-xl font-semibold">Narrator</span>
                        <span
                            onClick={() => handleAudioState('narrator')}
                            className="text-button-text inline-flex justify-center w-16 mx-auto rounded-2xl bg-blue-900 text-slate-100 hover:brightness-75 duration-300 cursor-pointer"
                        >
                            {audioState === 'narrator' ? (
                                <IoVolumeMediumOutline className="text-4xl p-1" />
                            ) : (
                                <IoVolumeMuteOutline className="text-4xl p-1" />
                            )}
                        </span>
                    </div>

                    <div className="w-1/2 flex flex-col text-center gap-2">
                        <span className="text-xl font-semibold">
                            Audio Speed
                        </span>
                        <div>
                            <AudioSpeed />
                        </div>
                    </div>
                </div>

                <div className="w-full flex gap-10">
                    <div className="w-1/2 flex flex-col  text-center gap-2">
                        <span className="text-xl font-semibold">Tips</span>
                        <span
                            onClick={() => handleAudioState('tips')}
                            className="text-button-text inline-flex justify-center w-16 mx-auto rounded-2xl bg-blue-900 text-slate-100 hover:brightness-75 duration-300 cursor-pointer"
                        >
                            {audioState === 'tips' ? (
                                <IoVolumeMediumOutline className="text-4xl p-1" />
                            ) : (
                                <IoVolumeMuteOutline className="text-4xl p-1" />
                            )}
                        </span>
                    </div>
                    <div className="w-1/2 flex flex-col  text-center gap-2">
                        <span className="text-xl font-semibold">
                            Ambient Music
                        </span>
                        <div>
                            <RelaxMusic />
                        </div>
                    </div>
                </div>

                <div className="w-1/2 flex flex-col justify-center items-center gap-3 mx-auto -mt-5">
                    <span className="text-xl font-semibold">Volume</span>
                    <div className="w-full flex justify-center items-center ">
                        <VolumeSlider  />
                    </div>
                </div>
            </div>
        </>
    )
}
