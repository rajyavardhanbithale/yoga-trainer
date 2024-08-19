import BackgroundSVG from '../components/Home/Background'
import Navbar from '../components/Home/Navbar'
import Leaderboard from '../components/LeaderBoard/Leaderboard'

export default async function LeaderboardPage() {
    return (
        <>
            <main className="flex h-screen w-full justify-center flex-col bg-[url('/home/bg.svg')] bg-repeat-y bg-top bg-[length:auto_150%]">
                <Navbar />

                <div className="z-50 flex justify-center my-auto">
                    <Leaderboard />
                </div>
            </main>
        </>
    )
}
