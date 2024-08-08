'use client'

import { poseInfo } from '@/app/api/pose/poseApiData'
import { useSearchParams } from 'next/navigation'
import { IoIosMore } from 'react-icons/io'
import { useEffect, useRef } from 'react'
import { AppDispatch, RootState } from '@/lib/store'
import { useDispatch, useSelector } from 'react-redux'
import { setPoseData } from '@/lib/store/practice/practiceSlice'
import TutorialControl from '../Utils/TutorialControl'
import { setAudioData } from '@/lib/store/practice/audioSlice'
import dynamic from 'next/dynamic'
import Menu from '../Utils/Menu/Menu'
import NewAchievements from '../../NewAchievements/NewAchievements'
import PracticeLoader from '../Utils/PracticeLoader'

const UserSectionExtras = dynamic(
    () => import('@/app/components/Yoga/TabSections/Section'),
    {
        ssr: false,
        loading: () => <PracticeLoader />,
    }
)

const TensorControl = dynamic(
    () => import('@/app/components/Yoga/Utils/TensorControl'),
    {
        ssr: false,
        loading: () => <PracticeLoader />,
    }
)

const InputSource = dynamic(
    () => import('@/app/components/Yoga/VideoWebcam/InputSource'),
    {
        ssr: false,
        loading: () => <PracticeLoader />,
    }
)

export default function UserSection() {
    const searchParams = useSearchParams()
    const id = searchParams.get('id') ?? 101
    const source = searchParams.get('source') ?? 'tree.mp4'
    const data = useSelector((state: RootState) => state.practiceSlice.poseData)
    const dispatch = useDispatch<AppDispatch>()

    const videoRef = useRef(null)

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
                <div className="flex flex-col justify-center items-center mb-10 sm:mb-2">
                    <div className="flex sm:flex-row flex-col justify-center items-center sm:gap-3 text-slate-800 px-5 py-1 rounded-2xl">
                        <span className="text-3xl capitalize font-bold text-center">
                            {data.name}
                        </span>
                        <span className="text-3xl capitalize font-bold hidden sm:block">
                            -
                        </span>
                        <span className="text-3xl capitalize font-bold text-center">
                            <hr className="block sm:hidden my-1 py-0.5" />
                            {data.originalName}
                        </span>
                    </div>

                    <button
                        className="z-50 tooltip tooltip-bottom before:max-w-[60vw] bg-slate-200 px-4 rounded-xl hover:bg-slate-300 duration-500 cursor-pointer"
                        data-tip={data.description}
                    >
                        <IoIosMore className="text-slate-700" />
                    </button>
                </div>
            )}
            <div className="grid sm:grid-cols-12 gap-10 sm:gap-5">
                <div className="col-span-full sm:col-span-6 h-[50vh] bg-slate-100 rounded-2xl">
                    <InputSource videoRef={videoRef} source={source} />
                </div>
                <div className="col-span-full sm:col-span-6 relative h-[50vh] bg-slate-100 rounded-2xl overflow-hidden">
                    <TutorialControl />
                </div>
            </div>

            <div className="sm:grid sm:grid-cols-12 sm:gap-5 mt-5">
                <div className="sm:col-span-9 h-[40vh]">
                    <UserSectionExtras />
                </div>
                <div className="sm:col-span-3 h-[40vh] rounded-2xl mt-[35rem] sm:mt-3">
                    <TensorControl></TensorControl>
                </div>
            </div>

            <div className="absolute top-5 right-5">
                <Menu />
            </div>
            <NewAchievements></NewAchievements>
        </>
    )
}
