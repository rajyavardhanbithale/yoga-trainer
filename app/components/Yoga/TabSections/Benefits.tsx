'use client'
import { AppDispatch, RootState } from '@/lib/store'
import { setAudioState } from '@/lib/store/practice/audioSlice'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { IoVolumeMediumOutline, IoVolumeMuteOutline } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'

export default function Benefits() {
    const benefits = useSelector(
        (state: RootState) => state.practiceSlice.poseData?.benefits
    )
    const name = useSelector(
        (state: RootState) => state.practiceSlice.poseData?.name
    )
    const audioState = useSelector(
        (state: RootState) => state.audioSlice.audioState
    )

    const dispatch = useDispatch<AppDispatch>()

    return (
        <>
            <div className={`flex flex-col`}>
                <div className="sm:text-2xl text-xl font-extrabold capitalize my-2">
                    <span>benefits of {name}</span>

                    <span
                        // onClick={() => props?.playAudio(props?.audioBenefits, "benefits")}
                        className="inline-flex align-middle mx-2 sm:w-10 w-10 rounded-2xl bg-blue-900 text-white hover:brightness-75 duration-300 cursor-pointer"
                    >
                        {audioState === 'benefits' ? (
                            <IoVolumeMediumOutline
                                onClick={() => dispatch(setAudioState(null))}
                                className="text-[1.85rem] font-bold mx-auto py-1 px-0.5 text-button-text"
                            />
                        ) : (
                            <IoVolumeMuteOutline
                                onClick={() =>
                                    dispatch(setAudioState('benefits'))
                                }
                                className="text-[1.85rem] mx-auto font-bold py-1 px-0.5 text-button-text"
                            />
                        )}
                    </span>
                </div>

                <ScrollArea>
                    {benefits?.map((text: string, idx: number) => (
                        <div
                            key={idx}
                            className="sm:mb-1 mb-5 text-justify sm:text-left mx-auto"
                        >
                            <span className="sm:text-lg text-base font-bold">
                                {text.split(':')[0]} -
                            </span>
                            <span className="sm:text-lg text-base leading-relaxed tracking-wide">
                                {text.split(':')[1]}
                            </span>
                        </div>
                    ))}
                </ScrollArea>
            </div>
        </>
    )
}
