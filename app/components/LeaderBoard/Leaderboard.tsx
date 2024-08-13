import { ScrollArea } from "@/components/ui/scroll-area"
import LeaderboardStats from "./LeaderboardStats"
import WeeklyActivity from "./WeeklyActivity"


export default async function Leaderboard() {

    const response = await fetch('http://localhost:3000/api/leaderboard', { next: { revalidate: 300 } })
    const data = await response.json()

    console.log(data.metrics)
    return (
        <>
            <div className="z-50 w-11/12  justify-center glass-card">
                <div className="grid grid-cols-6 m-3 p-3">
                    <div className="col-span-2 ">123</div>

                    <div className="col-span-4 w-full flex flex-col gap-5">
                        <span className="text-slate-50 text-2xl font-semibold mx-auto">
                            Leaderboard
                        </span>

                        <ScrollArea className="h-[20rem] my-auto flex flex-col p-2">
                            {data?.metrics?.map((metric:any, idx:number) => (
                                <div
                                    key={idx}
                                    className="flex gap-5 flex-row bg-slate-50 bg-opacity-10 rounded-lg m-2 p-2 items-center"
                                >

                                    {idx < 3 ? (
                                        <img
                                            src={`/leaderboard/${(idx + 1) === 1 ? 'gold' : (idx + 1) === 2 ? 'silver' : 'bronze'}.png`}
                                            alt={(idx + 1) === 1 ? 'gold' : (idx + 1) === 2 ? 'silver' : 'bronze'}
                                            className="w-10 h-10"
                                        />
                                    ) : (
                                        <span className="text-2xl text-slate-50">
                                            {idx + 1}
                                        </span>
                                    )}
                                    <div className="flex gap-5 w-full">
                                        <div className="w-12 h-12 overflow-hidden my-auto mx-auto">
                                            <img
                                                src={`/avatar/${metric.userInfo.profile_pic.split('-')[0]}/${metric.userInfo.profile_pic}.webp`}
                                                alt="avatar"
                                                className="w-full h-full object-cover rounded-full shadow-2xl transition-transform hover:scale-110 duration-700"
                                            />
                                        </div>

                                        <div className="flex flex-col gap-2 w-full">
                                            <span className="h-fit text-2xl text-slate-50 font-bold">
                                                {metric.userInfo.name}
                                            </span>
                                            <LeaderboardStats accuracy={metric.correctPoseMean} timeSpent={metric.durationMean} session={metric.totalSessions} />
                                        </div>

                                        <WeeklyActivity chartData={metric.weekActivity} />
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