import { Raleway } from 'next/font/google'
import { IoArrowForwardOutline, IoCompassOutline } from 'react-icons/io5'

const raleway = Raleway({ subsets: ['latin'] })

export default function Header() {
    return (
        <>
            <main className="z-10 flex sm:min-h-screen justify-center items-center w-11/12 mx-auto">
                <div className="flex flex-col gap-5 justify-center items-center">
                    <span className="sm:text-6xl text-3xl bg-gradient-to-b from-slate-50 via-slate-200 to-slate-400 text-transparent bg-clip-text">
                        Welcome To RAGE AI
                    </span>

                    <div
                        className={`${raleway.className} flex flex-col gap-3 justify-center items-center`}
                    >
                        <span className="sm:text-2xl text-xl text-slate-200 text-center">
                            Transform Your Yoga Practice with RageAI
                        </span>
                        <span className="sm:text-2xl text-lg text-slate-200 xl:w-1/2 text-center">
                            Discover our user-friendly yoga guidance platform:
                            select poses, get real-time feedback, and
                            personalized tips for an enhanced practice
                            experience.
                        </span>
                    </div>

                    <div className="flex sm:flex-row flex-col sm:gap-10 gap-3">
                        <button className="text-lg sm:text-xl glass-card px-4 py-2 text-slate-300 cursor-pointer shadow-lg hover:shadow-blue-950 duration-300">
                            Get Started
                            <IoArrowForwardOutline className="inline-flex mx-1 my-auto" />
                        </button>
                        <button className="text-lg sm:text-xl glass-card px-4 py-2 text-slate-300 cursor-pointer shadow-lg hover:shadow-blue-950 duration-300">
                            Explore
                            <IoCompassOutline className="inline-flex mx-1 my-auto" />
                        </button>
                    </div>

                    <div className="relative flex opacity-80 justify-center sm:w-1/2 w-full sm:h-[25rem] h-[15rem] mt-5 rounded-2xl shadow-xl overflow-hidden">
                        <img
                            src="/home/vec.jpg"
                            alt="Yoga Practice"
                            className="w-full object-cover brightness-75 hover:scale-110 sm:hover:scale-125 duration-1000 ease-in-out"
                        />

                        <span className="absolute left-0 h-full blr" />
                        <span className="absolute right-0 h-full blr" />
                        <span className="absolute top-0 w-full blr" />
                        <span className="absolute bottom-0 w-full blr" />
                    </div>
                </div>
            </main>
        </>
    )
}
