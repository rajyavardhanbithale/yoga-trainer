'use client'

import DietFavorite from './DietFavorite'
import { ScrollArea } from '@/components/ui/scroll-area'
import MacroNutrients from './MarcoNurtients'
import DietStatChart from './DietStatsChart'
import axios from 'axios'
import { useEffect, useState } from 'react'

interface Nutrients {
    fat: number[]
    carb: number[]
    calorie: number[]
    protein: number[]
    dates: number[]
}
interface FavMeal {
    name: string
    count: number
    image: string
}

export default function DietStats() {
    const [nutrition, setNutrition] = useState<Nutrients>()
    const [favMeal, setFavMeal] = useState<FavMeal[]>()

    const fetchDiet = async () => {
        const response = await axios.get('/api/diet')
        setNutrition(response?.data?.response)
        setFavMeal(response?.data?.favMeal)
    }

    useEffect(() => {
        fetchDiet()
    }, [])

    return (
        <>
            {favMeal && nutrition && (
                <>
                    <div className="grid grid-cols-12 gap-8 m-2 overflow-y-hidden">
                        <div className="col-span-full xl:col-span-4 min-h-[40vh] overflow-hidden rounded-2xl ">
                            <div className="h-full flex flex-col justify-center ">
                                <div className="flex items-center align-middle p-5 justify-between">
                                    <span className="text-3xl">
                                        Favorite Diet Meal
                                    </span>
                                </div>
                                <ScrollArea className="z-10 h-[40vh] rounded-xl p-4">
                                    <div className="flex flex-col gap-5 ">
                                        {favMeal.length == 0 && (
                                            <div className="mt-20 text-center text-xl text-gray-500">
                                                No favorite meal found
                                            </div>
                                        )}
                                        {favMeal.length !== 0 && (
                                            <DietFavorite
                                                diet={favMeal}
                                            ></DietFavorite>
                                        )}
                                    </div>
                                </ScrollArea>
                            </div>
                        </div>

                        <div className="col-span-full xl:col-span-8 min-h-[40vh] flex flex-col  rounded-2xl ">
                            <div className="flex items-center align-middle p-5 justify-between">
                                <span className="text-3xl">Macronutrients</span>
                            </div>
                            <div className=" xl:w-full flex flex-col xl:flex-row">
                                <MacroNutrients data={nutrition} />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-12 gap-8 m-2 overflow-y-hidden mt-20 xl:mt-2 mb-20">
                        <div className="col-span-full xl:col-span-12 min-h-[40vh] flex flex-col rounded-2xl">
                            <div className="flex items-center align-middle p-5 justify-between">
                                <span className="text-3xl">
                                    Nutrients Consumed
                                </span>
                            </div>

                            <div className="xl:px-5 mb-10">
                                <DietStatChart nutrientData={nutrition} />
                            </div>
                        </div>
                    </div>
                </>
            )}

            {(!favMeal || !nutrition) && (
                <>
                    <div className="grid grid-cols-12 gap-8 m-2 overflow-y-hidden">
                        <div className="bg-slate-300 col-span-full xl:col-span-4 min-h-[40vh] rounded-2xl"></div>
                        <div className="bg-slate-300 col-span-full xl:col-span-8 min-h-[40vh]  rounded-2xl">
                            {' '}
                        </div>
                    </div>

                    <div className="mt-20 grid grid-cols-12 gap-8 m-2 overflow-y-hidden">
                        <div className="bg-slate-300 animate-pulse col-span-full xl:col-span-12 min-h-[40vh]  rounded-2xl"></div>
                    </div>
                </>
            )}
        </>
    )
}
