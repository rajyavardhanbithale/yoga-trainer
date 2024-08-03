'use client'
import { useState } from 'react'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'

type Prop = {
    epochTimes: number[]
}

export default function Calendar({ epochTimes }: Prop) {

    
    const dates: Date[] = epochTimes.map(time => {
        const date = new Date(time * 1000);
        return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
    });

  

    return (
        <>
            <div className="xl:scale-[.70]">
                <DayPicker 
                mode="multiple"
                 selected={dates} />
            </div>
        </>
    )
}
