import DietSectionCard from './DietSectionCard'
import { Button, Description, Title } from './StyleUtils'

export default function DietSection() {
    return (
        <>
            <div className="sm:w-3/4 w-11/12 mx-auto flex flex-col justify-center items-center gap-6 py-10">
                <Title>Discover Healthy Delights with RAGE AI</Title>
                <Description>Explore Our Healthy Food Showcase</Description>

                <Description>
                    Discover delicious and nutritious recipes in our Healthy
                    Food Showcase. Like, explore detailed info, watch videos,
                    and connect with a community of health enthusiasts.
                </Description>
                <div className="mt-8 xl:mt-1">
                    <Button link="/diet">Explore Healthy Food</Button>
                </div>

                <div className="w-11/2 flex mx-auto justify-center items-center overflow-hidden">
                    <DietSectionCard />
                </div>
            </div>
        </>
    )
}
