import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel'
import Image from 'next/image'
import LeaderboardStats from './LeaderboardStats'

export default function LeaderboardCarousel({ userData }: { userData: any }) {
    return (
        <>
            <div className="h-full w-full  xl:ml-0 flex justify-center items-center bg-slate-50 bg-opacity-10 rounded-2xl border-2 border-slate-50 border-opacity-10 shadow-2xl p-2">
                <Carousel className="w-3/4 h-full flex items-center px-1 py-1">
                    <CarouselContent>
                        {userData?.metrics
                            ?.slice(0, 3)
                            .map((data: any, idx: number) => (
                                <CarouselItem key={idx}>
                                    <div className="p-1 flex flex-col gap-3 justify-center items-center">
                                        <div className="w-36 h-36 overflow-hidden rounded-badge">
                                            <Image
                                                height={0}
                                                width={0}
                                                sizes="100wv"
                                                src={`/avatar/${data.userInfo.profile_pic.split('-')[0]}/${data.userInfo.profile_pic}.webp`}
                                                // src={`/avatar/men/men-5.webp`}
                                                alt="avatar"
                                                className="w-full h-full object-cover rounded-2xl shadow-2xl transition-transform hover:scale-110 duration-700"
                                            />
                                        </div>

                                        <div className="flex items-center gap-3">
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
                                                className="p-0 m-0 brightness-110 shadow-xl"
                                            />
                                            {data.userInfo.country && (
                                                <div className="rounded-lg h-fit w-fit overflow-hidden">
                                                    <Image
                                                        height={40}
                                                        width={40}
                                                        alt={
                                                            data.userInfo
                                                                .country
                                                        }
                                                        src={`https://flagicons.lipis.dev/flags/4x3/${data.userInfo.country}.svg`}
                                                        className="shadow-2xl"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span className="text-nowrap text-xl text-slate-50 text-extrabold">
                                                {data.userInfo.name}
                                            </span>
                                        </div>

                                        <div className="flex flex-col w-full">
                                            <LeaderboardStats
                                                accuracy={data.correctPoseMean}
                                                timeSpent={data.durationMean}
                                                session={data.totalSessions}
                                            />
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </>
    )
}
