'use client'

import { AchievementsData, achievementsData } from "@/app/api/achievements/achievementsData";
import { AppDispatch, RootState } from "@/lib/store";
import { fetchAchievement } from "@/lib/store/dashboard/dashboardSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import './tooltip.css'
import { CiLock, CiUnlock } from "react-icons/ci";
import Image from "next/image";

export default function Achievements() {
    const completed = useSelector((state: RootState) => state.dashboard.ACHIEVEMENTS)
    const dispatch = useDispatch<AppDispatch>()

    const gender = 'women'
    const achievements = AchievementsData

    useEffect(() => {
        dispatch(fetchAchievement())
    }, [])

    return (
        <>
            {completed &&
                <div className="h-[75vh] flex flex-col justify-between m-5">
                    <div className="flex flex-col gap-2 justify-start items-start m-5 py-5">
                        <span className="text-5xl font-semibold text-slate-900 uppercase">
                            Achievements
                        </span>
                        <span className="text-2xl font-normal text-slate-600">
                            Explore your achievements and milestones.
                        </span>
                    </div>

                    <div className="flex flex-wrap justify-center w-11/12">
                        {achievements.map((item: achievementsData, key) => (
                            <div
                                data-tooltip-id={`tooltip-${key}`}
                                key={key}
                                className="has-tooltip w-48 h-fit overflow-hidden m-2 span-5 rounded-full cursor-pointer"
                            >


                                <Image
                                    src={`/achievements/${item.icon}-${gender}.jpg`}
                                    width={256}
                                    height={256}
                                    alt="BG-IMAGE"
                                    className={`rounded-full object-cover shadow-lg hover:scale-105 hover:brightness-105 hover:shadow-2xl duration-500 
                                            ${completed?.includes(item.id) ? 'brightness-100' : 'brightness-[.30]'}
                                        `}
                                />

                                <Tooltip id={`tooltip-${key}`} className="place-tooltip animate-fade-up">
                                    <div className="flex flex-col m-2 span-2">
                                        <span className="font-bold text-slate-900 text-xl">{item.name}</span>
                                        <span className="text-slate-800 text-lg">{item.description}</span>
                                        <div className="flex flex-col justify-between text-slate-700 mt-2 capitalize">
                                            <div className="flex gap-2 items-center">
                                                <span className="font-bold text-lg">
                                                    Level -
                                                </span>
                                                <span className="font-semibold text-base">
                                                    {item.level}
                                                </span>
                                            </div>
                                            <div className="flex gap-2 items-center">
                                                <span className="font-bold text-lg">
                                                    Rarity -
                                                </span>
                                                <span className="font-semibold text-base">
                                                    {item.rarity}
                                                </span>
                                            </div>
                                            <div className="flex gap-2 items-center">
                                                <span className="font-bold text-lg">
                                                    Achievement -
                                                </span>
                                                <span className="font-semibold text-base">
                                                    {completed?.includes(item.id) ? (
                                                        <span>
                                                            Unlocked
                                                            <CiUnlock className="inline-flex justify-center align-middle items-center mb-0.5 mx-1 font-bold" />
                                                        </span>

                                                    ) : (
                                                        <span>
                                                            Locked
                                                            <CiLock className="inline-flex justify-center align-middle items-center mb-0.5 mx-1 font-bold" />
                                                        </span>
                                                    )
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Tooltip>


                            </div>
                        ))}
                    </div>
                </div>

            }

        </>
    )
}