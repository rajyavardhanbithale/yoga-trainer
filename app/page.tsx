import Navbar from '@/app/components/Home/Navbar'
import Header from '@/app/components/Home/Section/Header'
import SupabasePostAuthHelper from '@/app/components/Home/SupabasePostAuthHelper'
import PoseTypewriter from '@/app/components/Home/Section/PoseTypewriter'
import ImageMarquee from '@/app/components/Home/Section/ImageMarquee'
import { Raleway } from 'next/font/google'
import Footer from '@/app/components/Home/Footer'
import LeaderBoardSection from '@/app/components/Home/Section/LeaderBoardSection'
import DietSection from "@/app/components/Home/Section/DietSection"
import DashboardSection from "@/app/components/Home/Section/DashboardSection"

const raleway = Raleway({ subsets: ['latin'] })

export default function Home() {
    return (
        <>
            <main className="flex h-full flex-col bg-[url('/home/bg.svg')] bg-repeat-y bg-top bg-[length:auto_100%]">
                <Navbar />

                <div className={`${raleway.className} flex flex-col w-full mb-10 gap-28`}>
                    <div className="xl:mt-14">
                        <Header />
                    </div>

                    <div className="overflow-hidden">
                        <PoseTypewriter />
                    </div>

                    <div className="">
                        <ImageMarquee />
                    </div>

                    <div className="overflow-hidden">
                        <LeaderBoardSection />
                    </div>

                    <DietSection />

                    <DashboardSection />
                </div>
                <Footer />
            </main>
            <SupabasePostAuthHelper />
        </>
    )
}
