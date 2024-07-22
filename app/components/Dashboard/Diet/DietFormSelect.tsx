'use client'

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { mealData } from "@/app/api/meals/mealData"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/lib/store"
import { getFoodData } from "@/lib/store/dashboard/dietSlice"

export function DietAddSelect() {
    
    const dispatch = useDispatch<AppDispatch>()

    const options = mealData.map((item) => item.name)

    return (
        <>
            <Select
                onValueChange={(value) =>
                    dispatch(getFoodData(value))
                }
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a Dish" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Dishes</SelectLabel>
                        {options.map((name, idx) => (
                            <SelectItem key={idx} value={name}>{name}</SelectItem>

                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </>
    )
}
