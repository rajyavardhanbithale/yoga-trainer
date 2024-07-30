'use client'

export default function TensorControl() {
    const isModelLoaded = true
    return (
        <>
            <div className="flex justify-center items-center h-full rounded-2xl">
                <div className="w-full h-full  bg-slate-200 flex rounded-2xl justify-center items-center shadow-xl hover:shadow-lg duration-500">
                    <button
                        className="bg-blue-500 text-slate-50 font-semibold text-2xl h-fit 
                    py-2 px-6 rounded-tl-2xl rounded-br-2xl 
                    hover:rounded-tr-2xl hover:rounded-bl-2xl duration-500
                    hover:rounded-tl-none hover:rounded-br-none
                    shadow-xl hover:shadow-blue-800/50
                    "
                    >
                        Start
                    </button>
                </div>
            </div>
        </>
    )
}
