

import LeaderboardCarousel from './LeaderboardCarousel'
import LeaderboardDisplay from "./LeaderboardDisplay"

export default async function Leaderboard() {
    const response = await fetch('http://localhost:3000/api/leaderboard', {
        next: {
            revalidate: 60,
        },
    })
    const data = await response.json()

    return (
        <>
            <div className="z-50 w-11/12 justify-center glass-card">
                <div className="sm:grid xl:grid-cols-6 m-3 p-3 gap-3 w-full">
                    <div className="xl:col-span-2 w-full mx-auto h-full flex justify-center items-center">
                        {data &&
                            <LeaderboardCarousel
                                userData={data}
                            />
                        }
                        {!data &&
                            <div className="h-full w-full bg-slate-50 bg-opacity-20 rounded-2xl animate-pulse"></div>
                        }
                    </div>

                    <div className="mt-20 xl:mt-0 col-span-4 w-full flex flex-col gap-5 ">
                        <span className="mb-10 xl:mb-0 text-slate-50 text-2xl font-semibold mx-auto">
                            Leaderboard
                        </span>
                        <LeaderboardDisplay data={data?.metrics} />
                    </div>

                </div>
            </div>
        </>
    )
}
