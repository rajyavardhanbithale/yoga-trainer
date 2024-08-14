import BackgroundSVG from '../components/Home/Background'
import Navbar from '../components/Home/Navbar'
import Leaderboard from '../components/LeaderBoard/Leaderboard'

export default async function LeaderboardPage() {
    return (
        <>
            <main className="flex min-h-screen flex-col">
                <BackgroundSVG />
                <Navbar />

                <div className="z-50 h-full flex justify-center my-auto ">
                    <Leaderboard />
                </div>
            </main>
        </>
    )
}