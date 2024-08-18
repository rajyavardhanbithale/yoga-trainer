import LeaderBoardCard from './LeaderBoardCard'

export default async function LeaderBoardSection() {
    return (
        <>
            <div className="sm:w-3/4 w-11/12 mx-auto flex flex-col justify-center items-center gap-6 py-10">
                <span className="xl:text-3xl text-4xl text-center xl:text-start font-semibold bg-gradient-to-br from-slate-50 via-slate-200 to-slate-400 text-transparent bg-clip-text">
                    RAGE AI Yoga Leaderboard
                </span>

                <span className="text-xl sm:text-2xl font-normal text-center bg-gradient-to-b from-slate-50 to-slate-100 text-transparent bg-clip-text">
                    Celebrate Your Progress and Achievements
                </span>

                <p className="xl:text-2xl text-2xl font-light bg-gradient-to-br from-slate-50 via-slate-200 to-slate-400 text-transparent bg-clip-text">
                Welcome to the RageAI Leaderboard! Here, we celebrate the top performers in our yoga community who have made impressive 
                strides with the help of RageAI.
                </p>
            </div>

            <div className="w-11/2 flex mx-auto justify-center items-center overflow-hidden">
                <LeaderBoardCard />
            </div>
        </>
    )
}
