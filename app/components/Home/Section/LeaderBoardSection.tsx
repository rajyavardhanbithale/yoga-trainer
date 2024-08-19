import LeaderBoardCard from './LeaderBoardCard'
import { Button, Description, Title } from './StyleUtils'

export default async function LeaderBoardSection() {
    return (
        <>
            <div className="sm:w-3/4 w-11/12 mx-auto flex flex-col justify-center items-center gap-6">
                <Title>RAGE AI Yoga Leaderboard</Title>

                <Description>
                    Celebrate Your Progress and Achievements
                </Description>

                <Description>
                    Compete with other users and see how you rank on the
                    leaderboard. The more you practice, the higher you&apos;ll
                    climb!
                </Description>

                <Button link="/leaderboard">View Leaderboard</Button>
            </div>

            <div className="mt-10 w-11/2 flex mx-auto justify-center items-center overflow-hidden">
                <LeaderBoardCard />
            </div>
        </>
    )
}
