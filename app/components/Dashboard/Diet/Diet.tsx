'use client'

import { useDispatch, useSelector } from 'react-redux'
import DietAddForm from './DietAddForm'
import { AppDispatch, RootState } from '@/lib/store'
import { useEffect } from 'react'
import { fetchDiet } from '@/lib/store/dashboard/dietSlice'
import { mealData } from '@/app/api/meals/mealData'

export default function DietDashboard() {
    const userDiet = useSelector((state: RootState) => state.dietSlice.USERDIET)
    const status = useSelector((state: RootState) => state.dietSlice.STATE)

    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(fetchDiet())
    }, [])

    const dateToday = (timestamp: number) => {
        const monthNames = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
        ]
        const dayNames = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
        ]
        const epochDate = new Date(timestamp)
        const month = epochDate.getMonth()
        const date = epochDate.getDate()
        const year = epochDate.getFullYear()

        const dayIndex = epochDate.getDay()

        return `${dayNames[dayIndex]}, ${date} ${monthNames[month]} ${year}`
    }

    // Bad Approach Should be removed on future
    const imagesName: string[] | undefined = userDiet?.map((item) => item.name)
    const imageMap: { [key: string]: string } = mealData.reduce(
        (map, item) => {
            map[item.name] = item.image ?? 'default.png'
            return map
        },
        {} as { [key: string]: string }
    )

    const images = imagesName?.map((name) => imageMap[name] || 'default.png')

    console.log(userDiet)

    return (
        <>
            <div className="m-5 p-5">
                <div className="flex items-center align-middle p-5 justify-between">
                    <span className="text-3xl">Recent Diet Meal</span>
                    <DietAddForm />
                </div>
                <div className="flex flex-wrap gap-2">
                    {status === 'success' &&
                        userDiet?.map((data, idx) => (
                            <div
                                key={idx}
                                className="w-full xl:w-auto m-5 p-2 flex items-center bg-slate-50 shadow-md rounded-2xl overflow-hidden hover:scale-105 duration-700 cursor-pointer"
                            >
                                <div className="h-full overflow-hidden p-2">
                                    <img
                                        src={`/meals/${images && images[idx]}`}
                                        alt="Default"
                                        className="w-40 h-full object-cover rounded-2xl hover:scale-105 duration-700"
                                    />
                                </div>
                                <div className="p-4 flex-1">
                                    <h2 className="text-xl font-semibold mb-2">
                                        {data.name}
                                    </h2>
                                    <p className="text-gray-600 mb-1">
                                        <strong>Calories:</strong>{' '}
                                        {data.calorie} kcal
                                    </p>
                                    <p className="text-gray-600 mb-1">
                                        <strong>Protein:</strong> {data.protein}{' '}
                                        g
                                    </p>
                                    <p className="text-gray-600 mb-1">
                                        <strong>Fat:</strong> {data.fat} g
                                    </p>
                                    <p className="text-gray-600 mb-1">
                                        <strong>Carbs:</strong> {data.carb} g
                                    </p>
                                    <p className="text-gray-600 mb-1">
                                        <strong>Date Added:</strong>{' '}
                                        {dateToday(data.id)}
                                    </p>
                                </div>
                            </div>
                        ))}

                    {status === 'pending' &&
                        Array.from({ length: 5 }).map((_, idx) => (
                            <div
                                key={idx}
                                className="xl:w-1/2 m-5 p-2 flex items-center bg-slate-50 shadow-md rounded-2xl overflow-hidden hover:scale-105 duration-700 cursor-pointer"
                            >
                                <div className="h-full overflow-hidden p-2">
                                    <div className="bg-slate-300 h-full w-40 rounded-2xl animate-pulse"></div>
                                </div>
                                <div className="p-4 flex-1 w-full">
                                    <p className="text-gray-600 mb-1 bg-slate-300 h-8 w-3/4 rounded-xl animate-pulse"></p>
                                    <p className="text-gray-600 mb-1 bg-slate-300 h-4 w-1/2 rounded-xl animate-pulse"></p>
                                    <p className="text-gray-600 mb-1 bg-slate-300 h-4 w-1/2 rounded-xl animate-pulse"></p>
                                    <p className="text-gray-600 mb-1 bg-slate-300 h-4 w-1/2 rounded-xl animate-pulse"></p>
                                    <p className="text-gray-600 mb-1 bg-slate-300 h-4 w-1/2 rounded-xl animate-pulse"></p>
                                    <p className="text-gray-600 mb-1 bg-slate-300 h-4 w-1/2 rounded-xl animate-pulse"></p>
                                </div>
                            </div>
                        ))}
                </div>

                {!userDiet && (
                    <div className="flex items-center justify-center  mt-40">
                        <div className="max-w-md mx-auto p-6 bg-slate-50 shadow-lg rounded-2xl text-center">
                            <div className="text-2xl font-semibold text-gray-800 mb-4">
                                Uh oh, no recent diet found
                            </div>
                            <div className="text-gray-600 mb-6">
                                It seems like you haven&apos;t added any recent
                                meal. Please add your recent diet to continue.
                            </div>
                            <div className="flex w-full px-4 py-2 justify-center">
                                <DietAddForm />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}
