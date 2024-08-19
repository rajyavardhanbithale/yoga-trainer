import Navbar from '@/app/components/Home/Navbar'
import Header from '@/app/components/Home/Section/Header'
import SupabasePostAuthHelper from '@/app/components/Home/SupabasePostAuthHelper'
import { Raleway } from 'next/font/google'
import Footer from '@/app/components/Home/Footer'
import PoseTypewriter from '@/app/components/Home/Section/PoseTypewriter'
import ImageMarquee from '@/app/components/Home/Section/ImageMarquee'
import LeaderBoardSection from '@/app/components/Home/Section/LeaderBoardSection'
import DietSection from '@/app/components/Home/Section/DietSection'
import DashboardSection from '@/app/components/Home/Section/DashboardSection'
import FAQ from './components/Home/Section/FAQ'

const raleway = Raleway({ subsets: ['latin'] })

export default function Home() {
    return (
        <>
            {/* <main className="flex h-full flex-col bg-[url('/home/bg.svg')] bg-repeat-y bg-top bg-[length:auto_100%]">
                <Navbar />

                <div
                    className={`${raleway.className} flex flex-col w-full mb-10 sm:gap-28 gap-16`}
                >
                    <div className="xl:mt-14 mt-14 sm:mt-0">
                        <Header />
                    </div>

                    <div className="overflow-hidden">
                        <PoseTypewriter />
                    </div>

                    <ImageMarquee />

                    <div className="overflow-hidden">
                        <LeaderBoardSection />
                    </div>

                    <DietSection />

                    <DashboardSection />
                    <FAQ />
                </div>
                <Footer />
            </main>
            <SupabasePostAuthHelper /> */}
        </>
    )
}
