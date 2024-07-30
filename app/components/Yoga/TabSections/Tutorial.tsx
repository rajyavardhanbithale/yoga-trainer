'use client'

import { AppDispatch, RootState } from '@/lib/store'
import { setTutorial, TutorialSource } from '@/lib/store/practice/practiceSlice'
import { useDispatch, useSelector } from 'react-redux'

export default function Tutorial() {
    const tutorialSource: TutorialSource | null = useSelector(
        (state: RootState) => state.practiceSlice.tutorialSource
    )
    const poseData = useSelector(
        (state: RootState) => state.practiceSlice.poseData
    )

    const dispatch = useDispatch<AppDispatch>()
    const active = tutorialSource?.provider

    const extractVideoID = poseData?.videoData.tutorialURL.split('/').pop()

    return (
        <>
            <div className="grid sm:grid-cols-2 gap-10 w-full place-items-center">
                <div
                    onClick={() => dispatch(setTutorial({ provider: 'video' }))}
                    className={`w-3/4 relative flex flex-col items-center justify-center cursor-pointer 
border-2 rounded-xl hover:scale-[1.01] duration-700 transition-transform
${active === 'video' ? 'border-blue-950 ring-2 ring-blue-950' : 'border-gray-300'}`}
                >
                    <img
                        src={`https://img.youtube.com/vi/${extractVideoID}/0.jpg`}
                        alt="Video tutorial"
                        className="w-full h-48 object-cover rounded-xl"
                    />
                    <span
                        className={`absolute bottom-0 w-full rounded-b-xl text-center py-2 font-semibold text-white 
${active === 'video' ? 'bg-blue-950' : 'bg-gray-600'}`}
                    >
                        Video Tutorial
                    </span>
                </div>

                <div
                    onClick={() =>
                        dispatch(setTutorial({ provider: 'animated' }))
                    }
                    className={`w-3/4 relative flex flex-col items-center justify-center cursor-pointer 
border-2 rounded-xl hover:scale-[1.01] duration-700 transition-transform
${active === 'animated' ? 'border-blue-950 ring-2 ring-blue-950' : 'border-gray-300'}`}
                >
                    <img
                        src={`/pose/tutorial/${poseData?.tutorial}`}
                        alt="Animated tutorial"
                        className="w-full h-48 object-cover rounded-xl"
                    />
                    <span
                        className={`absolute bottom-0 w-full rounded-b-xl text-center py-2 font-semibold text-white 
${active === 'animated' ? 'bg-blue-950' : 'bg-gray-600'}`}
                    >
                        Animated Tutorial
                    </span>
                </div>
            </div>
        </>
    )
}
