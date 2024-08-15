import Link from "next/link";
import BackgroundSVG from "./components/Home/Background";
import Navbar from "./components/Home/Navbar";

export default function NotFound() {
    return (
        <>
            <BackgroundSVG />
            <Navbar />
            <div className="relative min-h-screen flex items-center justify-center px-4 -mt-20">
                <div className="relative z-10 backdrop-blur-lg bg-white/10 rounded-3xl p-12 max-w-xl w-full text-center shadow-2xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-500/20 opacity-10"></div>
                    <div className="relative z-20">
                        <h1 className="text-8xl font-extrabold text-white mb-4 tracking-tighter animate-fade-down">404</h1>
                        <h2 className="text-3xl font-light text-blue-100 mb-8">Page Not Found</h2>
                        <p className="text-blue-200 mb-12 text-lg">The page you&apos;re looking for has drifted away. Let&apos;s get you back on course.</p>
                        <Link
                            href="/"
                            className="group inline-flex items-center bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-8 rounded-full transition-all duration-300 ease-in-out"
                        >
                            <span>Return Home</span>
                            <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300 ease-in-out" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>
                    </div>
                    <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full blur-3xl"></div>
                    <div className="absolute -top-16 -right-16 w-64 h-64 bg-gradient-to-br from-blue-300/30 to-indigo-500/30 rounded-full blur-3xl"></div>
                </div>
            </div>
        </>
    )
}