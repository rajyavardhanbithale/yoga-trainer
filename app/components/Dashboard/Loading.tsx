'use client'

export default function Loading() {
    return (
        <>
            <div className="h-screen w-full flex flex-col gap-12 justify-center align-middle items-center">
                <div className="loader hover:scale-125 duration-500"></div>

                <span className="text-2xl text-slate-800 font-bold">
                    Loading ..
                </span>
            </div>
        </>
    )
}
