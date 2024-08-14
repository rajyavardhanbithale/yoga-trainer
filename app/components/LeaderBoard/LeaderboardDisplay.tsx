import { ScrollArea } from '@/components/ui/scroll-area'
import Image from 'next/image'
import WeeklyActivity from './WeeklyActivity'
import LeaderboardStats from './LeaderboardStats'

export default async function LeaderboardDisplay({ data }: { data: any }) {
    return (
        <>
            <ScrollArea className="sm:h-[26rem] w-full my-auto flex flex-col rounded-2xl ">
                {data &&
                    data?.map((metric: any, idx: number) => (
                        <div
                            key={idx}
                            className="flex gap-5 my-5 sm:my-3 flex-col sm:flex-row bg-slate-50 bg-opacity-10 rounded-lg sm:m-2 sm:p-2 p-4 items-center"
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
                            <div className="flex flex-col sm:flex-row justify-center items-center gap-5 sm:gap-3 w-full">
                                <div className="sm:w-16 sm:h-14 w-20 h-20 overflow-hidden my-auto">
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

                                        {metric.userInfo.country && (
                                            <div className="rounded-lg h-fit w-fit overflow-hidden">
                                                <Image
                                                    height={20}
                                                    width={28}
                                                    alt={
                                                        metric.userInfo.country
                                                    }
                                                    src={`https://flagicons.lipis.dev/flags/4x3/${metric.userInfo.country}.svg`}
                                                    className="shadow-2xl brightness-90 opacity-90"
                                                />
                                            </div>
                                        )}
                                    </div>

                                    <LeaderboardStats
                                        accuracy={metric.correctPoseMean}
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

                {!data &&
                    Array.from({ length: 10 }).map((_, idx) => (
                        <div
                            key={idx}
                            className="w-[97%] mx-auto h-20 px-5 my-5 bg-slate-50 bg-opacity-10 rounded-2xl animate-pulse"
                        ></div>
                    ))}
            </ScrollArea>
        </>
    )
}
