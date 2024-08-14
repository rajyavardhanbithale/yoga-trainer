import { ScrollArea } from '@/components/ui/scroll-area'
import LeaderboardStats from './LeaderboardStats'
import WeeklyActivity from './WeeklyActivity'
import Image from "next/image"


import LeaderboardCarousel from "./LeaderboardCarousel"

export default async function Leaderboard() {
    const response = await fetch('http://localhost:3000/api/leaderboard', {
        next: {
            revalidate: 60
        }
    })
    const data = await response.json()

    return (
        <>
            <div className="z-50 w-11/12 justify-center glass-card">
                <div className="grid xl:grid-cols-6 m-3 p-3 gap-3 w-full">
                    <div className="xl:col-span-2 w-full mx-auto h-full flex justify-center items-center">
                        <LeaderboardCarousel userData={data}></LeaderboardCarousel>
                    </div>

                    <div className="col-span-4 w-full flex flex-col gap-5 ">
                        <span className="text-slate-50 text-2xl font-semibold mx-auto">
                            Leaderboard
                        </span>

                        <ScrollArea className="h-[25rem] w-full my-auto flex flex-col rounded-2xl ">
                            {data && data?.data?.metrics?.map((metric: any, idx: number) => (
                                <div
                                    key={idx}
                                    className="flex gap-5 flex-row bg-slate-50 bg-opacity-10 rounded-lg m-2 p-2 items-center"
                                >
                                    {idx < 3 ? (
                                        <Image
                                            src={`/leaderboard/${idx + 1 === 1 ? 'gold' : idx + 1 === 2 ? 'silver' : 'bronze'}.png`}
                                            alt={
                                                idx + 1 === 1
                                                    ? 'gold'
                                                    : idx + 1 === 2
                                                        ? 'silver'
                                                        : 'bronze'
                                            }
                                            height={40}
                                            width={40}
                                        // className="w-10 h-10"
                                        />
                                    ) : (
                                        <span className="text-2xl text-slate-50">
                                            {idx + 1}
                                        </span>
                                    )}
                                    <div className="flex gap-3 w-full">
                                        <div className="w-16 h-14 overflow-hidden my-auto">
                                            <Image
                                                height={0}
                                                width={0}
                                                sizes="100wv"
                                                src={`/avatar/${metric.userInfo.profile_pic.split('-')[0]}/${metric.userInfo.profile_pic}.webp`}
                                                alt="avatar"
                                                className="w-full h-full object-cover rounded-full shadow-2xl transition-transform hover:scale-110 duration-700"
                                            />
                                        </div>

                                        <div className="flex flex-col gap-2 w-full">
                                            <div className="flex flex-row w-full items-center gap-3">
                                                <span className="h-fit text-2xl text-slate-50 font-bold max-w-3/4 truncate tracking-wide">
                                                    {metric.userInfo.name}
                                                </span>

                                                {metric.userInfo.country &&
                                                    <div className="rounded-lg h-fit w-fit overflow-hidden">
                                                        <Image
                                                            height={20}
                                                            width={28}
                                                            alt={metric.userInfo.country}
                                                            src={`https://flagicons.lipis.dev/flags/4x3/${metric.userInfo.country}.svg`}
                                                            className="shadow-2xl brightness-90 opacity-90"
                                                        />
                                                    </div>
                                                }
                                            </div>

                                            <LeaderboardStats
                                                accuracy={
                                                    metric.correctPoseMean
                                                }
                                                timeSpent={metric.durationMean}
                                                session={metric.totalSessions}
                                            />
                                        </div>

                                        <div className="w-16 h-16 flex justify-center items-center my-auto">
                                            <WeeklyActivity
                                                chartData={metric.weekActivity}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </ScrollArea>


                    </div>
                </div>
            </div>
        </>
    )
}
