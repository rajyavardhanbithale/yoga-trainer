'use client'

export default function RelaxMusic() {
    return (
        <>
            <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" />
                <div className="group peer ring-0 
                bg-blue-800 rounded-full outline-none duration-300 after:duration-300 w-[86px] h-9 shadow-md peer-checked:bg-[#00b499] peer-focus:outline-none after:content-['🍂'] after:rounded-full after:absolute after:bg-gray-50 after:outline-none after:h-7 after:w-7 after:top-[4.1px] after:left-1 after:-rotate-180 after:flex after:justify-center after:items-center peer-checked:after:translate-x-12 peer-checked:after:content-['🌿'] peer-hover:after:scale-95 peer-checked:after:rotate-0">
                </div>
            </label>
        </>
    )
}