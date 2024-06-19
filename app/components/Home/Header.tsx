import { Raleway } from "next/font/google"
import { IoArrowForwardOutline, IoCompassOutline } from "react-icons/io5";

const raleway = Raleway({ subsets: ["latin"] });

export default function Header() {
    return (
        <>
            <main className="flex min-h-screen justify-center items-center w-11/12 mx-auto">
                <div className="flex flex-col gap-5 justify-center items-center">
                    <span className="text-6xl text-slate-100">
                        Welcome To RAGE AI
                    </span>

                    <div className={`${raleway.className} flex flex-col gap-3 justify-center items-center`}>
                        <span className="text-2xl text-slate-200">
                            Transform Your Yoga Practice with RageAI
                        </span>
                        <span className="text-2xl text-slate-200 w-1/2 text-center">
                            Discover our user-friendly yoga guidance platform: select poses, get real-time feedback, and personalized tips for an enhanced practice experience.
                        </span>
                    </div>

                    <div className="flex gap-10">
                        <button className="text-xl glass-card px-4 py-2 text-slate-300 cursor-pointer shadow-lg hover:shadow-blue-950 duration-300">
                            Get Started
                            <IoArrowForwardOutline className="inline-flex mx-1 my-auto" />
                        </button>
                        <button className="text-xl glass-card px-4 py-2 text-slate-300 cursor-pointer shadow-lg hover:shadow-blue-950 duration-300">
                            Explore
                            <IoCompassOutline className="inline-flex mx-1 my-auto" />
                        </button>

                    </div>

                    <div className="relative flex opacity-80 justify-center w-1/2 h-[25rem] mt-5 rounded-2xl shadow-xl overflow-hidden">
                        <img
                            src="/home/vec.jpg"
                            alt=""
                            className="w-full object-cover brightness-75 hover:scale-125 duration-1000 ease-in-out"
                        />

                        <span className="absolute left-0 h-full blr" />
                        <span className="absolute right-0 h-full blr" />
                        <span className="absolute top-0 w-full blr" />
                        <span className="absolute bottom-0 w-full blr" />


                    
                </div>
            </div>
        </main >
        </>
    )
}