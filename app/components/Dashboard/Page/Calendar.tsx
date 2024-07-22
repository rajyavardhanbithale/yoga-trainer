'use client'
import { useState } from 'react'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'

type Prop = {
    epochTimes: number[]
}

export default function Calendar({ epochTimes }: Prop) {
    const dates: Array<Date> = epochTimes.map((time) => new Date(time * 1000))
    const [selected, setSelected] = useState<Date[]>(dates)
    return (
        <>
            <div className="scale-[.85]">
                <DayPicker mode="multiple" selected={selected} />
            </div>
        </>
    )
}
