import LeaderBoardCard from './LeaderBoardCard'

export default async function LeaderBoardSection() {
    return (
        <>
            <div className="w-3/4 mx-auto flex flex-col justify-center items-center gap-6 py-10">
                <span className="text-4xl sm:text-5xl font-semibold bg-gradient-to-b from-slate-50 via-slate-200 to-slate-400 text-transparent bg-clip-text">
                    RAGE AI Yoga Leaderboard
                </span>

                <span className="text-xl sm:text-2xl font-normal bg-gradient-to-b from-slate-50 to-slate-100 text-transparent bg-clip-text">
                    Celebrate Your Progress and Achievements
                </span>

                <p className="text-lg sm:text-xl text-center bg-gradient-to-b from-slate-50 to-slate-100 text-transparent bg-clip-text">
                    Welcome to the RageAI Leaderboard, where dedication meets
                    recognition! Our leaderboard highlights the top performers
                    in our yoga community, showcasing those who’ve made
                    significant strides in their practice with the help of
                    RageAI.
                </p>
            </div>

            <div className="w-11/2 flex mx-auto justify-center items-center overflow-hidden">
                <LeaderBoardCard />
            </div>
        </>
    )
}
