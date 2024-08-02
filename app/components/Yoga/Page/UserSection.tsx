'use client'

import { poseInfo } from '@/app/api/pose/poseApiData'
import { useSearchParams } from 'next/navigation'
import { IoIosMore } from 'react-icons/io'
import TensorControl from '../Utils/TesnorControl'

import { useEffect, useRef } from 'react'
import { AppDispatch, RootState } from '@/lib/store'
import { useDispatch, useSelector } from 'react-redux'
import { setPoseData } from '@/lib/store/practice/practiceSlice'
import TutorialControl from '../Utils/TutorialControl'
import { setAudioData } from '@/lib/store/practice/audioSlice'
import dynamic from 'next/dynamic'
import Loading from '../../Dashboard/Loading'
import InputSource from '../VideoWebcam/InputSource'
import Preferences from "../Utils/Preferences"

const UserSectionExtras = dynamic(
    () => import('@/app/components/Yoga/TabSections/Section'),
    {
        ssr: false,
        loading: () => <Loading />,
    }
)

export default function UserSection() {
    const searchParams = useSearchParams()
    const id = searchParams.get('id') ?? 101
    const data = useSelector((state: RootState) => state.practiceSlice.poseData)
    const dispatch = useDispatch<AppDispatch>()

    const videoRef = useRef(null)
    const source = 'tree.mp4'

    useEffect(() => {
        const poseData = poseInfo.filter((pose) => pose.id === Number(id))[0]
        dispatch(setPoseData(poseData))

        dispatch(
            setAudioData({
                audioID: poseData.id,
                audioName: poseData.TFData.class,
                mainAudio: poseData.audioData.mainAudio,
                benefits: poseData.audioData.benefits,
                narratorSegment: poseData.audioData.narratorSegment,
            })
        )
    }, [id])

    return (
        <>
            {data && (
                <div className="flex flex-col justify-center items-center mb-2">
                    <div className="flex gap-3  text-slate-800 px-5 py-1 rounded-2xl">
                        <span className="text-3xl capitalize font-bold">
                            {data.name}
                        </span>
                        <span className="text-3xl capitalize font-bold">-</span>
                        <span className="text-3xl capitalize font-bold">
                            {data.originalName}
                        </span>
                    </div>

                    <button
                        className="z-[120] tooltip tooltip-bottom before:max-w-[60vw] bg-slate-200 px-4 rounded-xl hover:bg-slate-300 duration-500 cursor-pointer"
                        data-tip={data.description}
                    >
                        <IoIosMore className="text-slate-700" />
                    </button>
                </div>
            )}
            <div className="grid grid-cols-12 gap-5">
                <div className="col-span-6 h-[50vh] ">
                    <InputSource videoRef={videoRef} source={source} />
                </div>
                <div className="relative col-span-6 h-[50vh] bg-slate-100 rounded-2xl overflow-hidden">
                    <TutorialControl />
                </div>
            </div>

            <div className="grid grid-cols-12 gap-5  mt-5">
                <div className="col-span-9 h-[40vh] ">
                    <UserSectionExtras />
                </div>
                <div className="col-span-3 h-[50vh] rounded-2xl">
                    <TensorControl></TensorControl>
                </div>
            </div>


            <div className="absolute top-5 right-5">
                <Preferences />
            </div>
        </>
    )
}
