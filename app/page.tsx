import Navbar from './components/Home/Navbar'
import Header from './components/Home/Header'
import BackgroundSVG from './components/Home/Background'
import SupabasePostAuthHelper from './components/Home/SupabasePostAuthHelper'
import Section from './components/Home/Section/PoseTypewriter'
import ImageMarquee from './components/Home/Section/ImageMarquee'
import { Raleway } from 'next/font/google'

const raleway = Raleway({ subsets: ['latin'] })
export default function Home() {
    return (
        <>
            <main className="flex h-full flex-col bg-[url('/home/bg.svg')] bg-repeat-y bg-top bg-[length:auto_100%]">
                {/* <BackgroundSVG /> */}
                <Navbar />

                <div className={`${raleway.className}`}>
                    <div className="xl:mt-20 mt-20 md:mt-0">
                        <Header />
                    </div>

                    <div className="xl:mt-20 mt-20 md:mt-0">
                        <Section />
                    </div>

                    <div className="xl:mt-20 sm:mt-40 mt-20">
                        <ImageMarquee />
                    </div>
                </div>
            </main>
            <SupabasePostAuthHelper />
        </>
    )
}
