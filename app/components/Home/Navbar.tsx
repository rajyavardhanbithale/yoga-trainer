export default function Navbar() {
    return (
        <>
            <nav className="flex mx-5 my-5 justify-between">
                <div className="flex items-center m-1 glass-card p-2">
                    <img
                        src="/home/logo.svg"
                        alt=""
                        className="w-12"
                    />
                    <span
                        className="text-3xl text-slate-100 px-1 m-1 font-extrabold">
                        RAGE AI
                    </span>
                </div>

                <div className="sm:flex hidden flex-row items-center gap-3 m-1 px-6 glass-card">
                    <span className="text-xl text-slate-100">Features</span>
                    <span className="text-xl text-slate-100">Leaderboard</span>
                    <span className="text-xl text-slate-100">Explore</span>
                    <span className="text-xl text-slate-100">Practice</span>
                </div>

                <div className="flex flex-row items-center gap-3 m-1 p-2 glass-card">
                    <button className="text-xl bg-blue-800 text-slate-100 py-2 px-4 rounded-xl shadow-lg shadow-blue-700 glas-card hover:scale-105 duration-200 transform">
                        Login
                    </button>
                </div>

            </nav>
        </>
    )
}