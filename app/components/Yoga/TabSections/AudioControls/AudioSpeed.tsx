'use client'

import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { AppDispatch } from "@/lib/store"
import { setAudioSpeed } from "@/lib/store/practice/audioSlice"
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"

export default function AudioSpeed() {
    const [speed, setSpeed] = useState<'slower' | 'slow' | 'fine' | 'fast' | 'faster'>('fine')
    const dispatch = useDispatch<AppDispatch>()
    const audioSpeed = useSelector((state: any) => state.audioSlice.audioSpeed)

    useEffect(() => {
        dispatch(setAudioSpeed(speed))
    }, [speed])
    
    const handleValueChange = (value: string) => {
        if (['slower', 'slow', 'fine', 'fast', 'fastest'].includes(value)) {
            setSpeed(value as 'slower' | 'slow' | 'fine' | 'fast' | 'faster')
        }
    }
    
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    className="capitalize text-lg bg-blue-900 text-slate-50 hover:bg-blue-950 hover:text-slate-50 duration-500 focus-visible:ring-0 focus-visible:ring-offset-0"
                >
                    {audioSpeed}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-blue-950 text-slate-50 border-none">
                <DropdownMenuLabel className="font-bold">
                    Playback Speed
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                    value={audioSpeed}
                    onValueChange={handleValueChange}
                    className="capitalize font-bold"
                >
                    <DropdownMenuRadioItem value="slower">
                        slower
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="slow">
                        slow
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="fine">
                        fine
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="fast">
                        fast
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="fastest">
                        fastest
                    </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
