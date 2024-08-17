import Navbar from './components/Home/Navbar'
import Header from './components/Home/Section/Header'
import SupabasePostAuthHelper from './components/Home/SupabasePostAuthHelper'
import Section from './components/Home/Section/PoseTypewriter'
import ImageMarquee from './components/Home/Section/ImageMarquee'
import { Raleway } from 'next/font/google'
import Footer from './components/Home/Footer'
import ScrollProvider from './components/SmoothScroll'
import LeaderBoardSection from "./components/Home/Section/LeaderBoardSection"

const raleway = Raleway({ subsets: ['latin'] })

export default function Home() {
    return (
        <>
            <ScrollProvider>
                <main className="flex h-full flex-col bg-[url('/home/bg.svg')] bg-repeat-y bg-top bg-[length:auto_100%]">
                    {/* <BackgroundSVG /> */}
                    <Navbar />

                    <div className={`${raleway.className} mb-10`}>
                        <div className="xl:mt-20 mt-20 md:mt-0">
                            <Header />
                        </div>

                        {/* <div className="xl:mt-20 mt-20 md:mt-0 overflow-hidden">
                            <Section />
                        </div>

                        <div className="xl:mt-36 sm:mt-40 mt-20">
                            <ImageMarquee />
                        </div> */}

                        <div className="xl:mt-36 sm:mt-40 mt-20 overflow-hidden">
                            <LeaderBoardSection />
                        </div>
                    </div>
                    <Footer />
                </main>
            </ScrollProvider>
            <SupabasePostAuthHelper />
        </>
    )
}
