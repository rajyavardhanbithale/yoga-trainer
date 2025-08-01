import axios from 'axios'
import LeaderboardCarousel from './LeaderboardCarousel'
import LeaderboardDisplay from './LeaderboardDisplay'

const ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT

export default async function Leaderboard() {

    const response = await axios.get(`${ENDPOINT}/api/leaderboard`) // call
    const data = response.data 


    return (
        <>
            <div className="z-50 w-11/12 justify-center glass-card">
                <div className="sm:grid xl:grid-cols-6 xl:m-3 sm:p-3 gap-3 w-full">
                    <div className="mt-3 xl:mt-0 md:col-span-4 xl:col-span-2 flex-col h-full flex justify-center items-center  px-3">
                        {data && <LeaderboardCarousel userData={data} />}
                        {!data && (
                            <div className="h-full w-full bg-slate-50 bg-opacity-20 rounded-2xl animate-pulse"></div>
                        )}
                    </div>

                    <div className="mt-20 xl:mt-0 col-span-4 w-full flex flex-col gap-5">
                        <span className="mb-10 xl:mb-0 text-slate-50 text-3xl font-extrabold mx-auto">
                            Leaderboard
                        </span>
                        <LeaderboardDisplay data={data?.metrics} />
                    </div>
                </div>
            </div>
        </>
    )
}
