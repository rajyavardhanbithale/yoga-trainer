'use client'

import { BsFillCameraVideoFill, BsStars } from 'react-icons/bs'
import { TbTargetArrow } from 'react-icons/tb'
import { VscGraphLine } from 'react-icons/vsc'
import { LuSettings2 } from 'react-icons/lu'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/lib/store'
import { changeTab } from '@/lib/store/practice/practiceSlice'

import '@/app/components/Yoga/yoga.css'
export default function TabSwitcher() {
    const options = [
        {
            name: 'benefits',
            class: 'benefits',
            icon: <BsStars />,
        },
        {
            name: 'tutorial',
            class: 'tutorial',
            icon: <BsFillCameraVideoFill />,
        },
        {
            name: 'accuracy',
            class: 'accuracy',
            icon: <TbTargetArrow />,
        },
        {
            name: 'analysis',
            class: 'analysis',
            icon: <VscGraphLine />,
        },
        {
            name: 'audio control',
            class: 'audio',
            icon: <LuSettings2 />,
        },
    ]
    const currentTab = useSelector(
        (state: RootState) => state.practiceSlice.currentTab
    )
    const dispatch = useDispatch<AppDispatch>()
    return (
        <>
            <div className="flex overflow-x-auto flex-row w-full bg-slate-100 py-2 gap-5 border-b-[3px] border-slate-500">
                {options.map((opt, idx) => (
                    <div
                        key={idx}
                        onClick={() =>
                            dispatch(changeTab(opt.class.toLowerCase() as 'benefits' | 'tutorial' | 'accuracy' | 'analysis' | 'audio'))
                        }
                        className={`flex px-3 py-0.5 items-center justify-start gap-2 rounded-xl 
                             duration-700 hover:rounded-3xl cursor-pointer
                            ${currentTab === opt.class.toLowerCase() ? 'bg-blue-950 text-slate-50' : 'bg-slate-300 hover:bg-opacity-50'}`}
                    >
                        <span className="capitalize text-xl whitespace-nowrap font-extrabold">
                            {opt.name}
                        </span>

                        <span>{opt.icon}</span>
                    </div>
                ))}
            </div>
        </>
    )
}
