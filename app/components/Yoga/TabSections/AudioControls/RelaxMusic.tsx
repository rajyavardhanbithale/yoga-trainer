'use client'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { AppDispatch, RootState } from "@/lib/store"
import { setAmbientMusic, setAmbientMusicName } from "@/lib/store/practice/audioSlice"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

export default function RelaxMusic() {
    const [open, setOpen] = useState<boolean>(false)

    const ambientMusic = useSelector((state: RootState) => state.audioSlice.ambientMusic)
    const dispatch = useDispatch<AppDispatch>()

    const availableAmbientMusic = ['ambient', 'forest 1', 'forest river 1', 'forest river 2']
    return (
        <>
            <div>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input

                        type="checkbox"
                        value=""
                        className="sr-only peer"
                        checked={ambientMusic}
                        onChange={() => dispatch(setAmbientMusic())}
                    />
                    <div

                        className="group peer ring-0 
                  bg-blue-800 rounded-full outline-none duration-300 after:duration-300 w-[86px] h-9 shadow-md peer-checked:bg-[#00b499] peer-focus:outline-none after:content-['🍂'] after:rounded-full after:absolute after:bg-gray-50 after:outline-none after:h-7 after:w-7 after:top-[4.1px] after:left-1 after:-rotate-180 after:flex after:justify-center after:items-center peer-checked:after:translate-x-12 peer-checked:after:content-['🌿'] peer-hover:after:scale-95 peer-checked:after:rotate-0"
                    ></div>
                </label>
            </div>

            {ambientMusic &&
                <DropdownMenu open={open} onOpenChange={setOpen}>
                    <DropdownMenuTrigger asChild>
                        <span className="cursor-pointer bg-slate-200 font-semibold px-2 py-0.5 rounded-2xl mt-2">Select Music</span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 bg-blue-950 text-slate-50 border-none">
                        <DropdownMenuLabel>Ambient Music Options</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {availableAmbientMusic.map((music, idx) => (
                            <DropdownMenuItem
                                key={idx}
                                className="capitalize"
                                onClick={() => dispatch(setAmbientMusicName(music))}
                            >
                                {music}
                            </DropdownMenuItem>

                        ))}

                    </DropdownMenuContent>
                </DropdownMenu>
            }
        </>
    )
}


