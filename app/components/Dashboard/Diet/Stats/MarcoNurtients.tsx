'use client'

import React, { useState, useEffect } from 'react'
import MarcoNutDoughnut from './MarcoNutDoughnut'

interface DataProps {
    fat: number[]
    carb: number[]
    calorie: number[]
    protein: number[]
    dates: number[]
}

export default function Macronutrients(props: { data: DataProps }) {
    const data = props?.data
    const [selectedOption, setSelectedOption] = useState<string>('today')
    const [sumFat, setSumFat] = useState<number>(0)
    const [sumCarb, setSumCarb] = useState<number>(0)
    const [sumCalorie, setSumCalorie] = useState<number>(0)
    const [sumProtein, setSumProtein] = useState<number>(0)

    const options = ['today', 'last 7 days', 'last 30 days', 'all']

    useEffect(() => {
        const now = new Date()
        let startDate: Date | null = null

        switch (selectedOption) {
            case 'today':
                startDate = new Date(now.setHours(0, 0, 0, 0)) // Start of today
                break
            case 'last 7 days':
                startDate = new Date(now.setDate(now.getDate() - 7))
                break
            case 'last 30 days':
                startDate = new Date(now.setDate(now.getDate() - 30))
                break
            case 'all':
                startDate = new Date(0) // Consider all data
                break
            default:
                startDate = null
                break
        }

        if (startDate) {
            const filteredIndices = data.dates
                .map((date, index) => ({ date: new Date(date), index }))
                .filter(({ date }) => date >= startDate)
                .map(({ index }) => index)

            const sumFat = filteredIndices.reduce(
                (sum, index) => sum + data.fat[index],
                0
            )
            const sumCarb = filteredIndices.reduce(
                (sum, index) => sum + data.carb[index],
                0
            )
            const sumCalorie = filteredIndices.reduce(
                (sum, index) => sum + data.calorie[index],
                0
            )
            const sumProtein = filteredIndices.reduce(
                (sum, index) => sum + data.protein[index],
                0
            )

            setSumFat(sumFat)
            setSumCarb(sumCarb)
            setSumCalorie(sumCalorie)
            setSumProtein(sumProtein)
        } else {
            setSumFat(0)
            setSumCarb(0)
            setSumCalorie(0)
            setSumProtein(0)
        }
    }, [selectedOption, data])

    return (
        <>
            <div className="flex flex-col gap-2 xl:w-1/2">
                <div className="flex flex-wrap gap-2 px-5">
                    {options.map((item) => (
                        <button
                            key={item}
                            className={`capitalize bg-blue-900 text-slate-50 px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 hover:scale-105 transition-transform duration-300 ${selectedOption === item ? 'bg-blue-700' : ''}`}
                            onClick={() => setSelectedOption(item)}
                        >
                            {item}
                        </button>
                    ))}
                </div>

                <div className="mt-5 w-full px-4">
                    <div className="flex flex-col gap-7">
                        <div className="bg-slate-100 p-4 rounded-lg shadow-md">
                            <p className="text-gray-700 text-xl">
                                Total Fat:{' '}
                                <span className="font-semibold">
                                    {sumFat} grams
                                </span>
                            </p>
                        </div>
                        <div className="bg-slate-100 p-4 rounded-lg shadow-md">
                            <p className="text-gray-700 text-xl">
                                Total Carbs:{' '}
                                <span className="font-semibold">
                                    {sumCarb} grams
                                </span>
                            </p>
                        </div>
                        <div className="bg-slate-100 p-4 rounded-lg shadow-md">
                            <p className="text-gray-700 text-xl">
                                Total Calories:{' '}
                                <span className="font-semibold">
                                    {sumCalorie} kcal
                                </span>
                            </p>
                        </div>
                        <div className="bg-slate-100 p-4 rounded-lg shadow-md">
                            <p className="text-gray-700 text-xl">
                                Total Protein:{' '}
                                <span className="font-semibold">
                                    {sumProtein} grams
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center items-center xl:w-1/2">
                <MarcoNutDoughnut
                    nutritionalData={{
                        sumFat,
                        sumCarb,
                        sumCalorie,
                        sumProtein,
                    }}
                />
            </div>
        </>
    )
}
