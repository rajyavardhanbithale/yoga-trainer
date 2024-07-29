'use client'

import { useDispatch, useSelector } from 'react-redux'
import DietAddForm from './DietAddForm'
import { AppDispatch, RootState } from '@/lib/store'
import { useEffect, useRef, useState } from 'react'
import {
    DietChange,
    fetchDiet,
    saveRecentDiet,
} from '@/lib/store/dashboard/dietSlice'
import { mealData } from '@/app/api/diet/mealData'
import toast, { Toaster } from 'react-hot-toast'

import DietStats from './Stats/DietStats'
import { IoTrashBinSharp } from 'react-icons/io5'

type View = 'manageDiet' | 'dietAnalysis'

export default function DietDashboard() {
    const userDiet = useSelector((state: RootState) => state.dietSlice.USERDIET)
    const status = useSelector((state: RootState) => state.dietSlice.STATE)
    const operation = useSelector(
        (state: RootState) => state.dietSlice.operation
    )

    const reduxOptimisticDiet = useSelector(
        (state: RootState) => state.dietSlice.optimisticDiet
    )

    const [currentView, setCurrentView] = useState<View>('manageDiet')
    const [optimisticDiet, setOptimisticDiet] = useState<DietChange[] | null>(
        null
    )
    const reversedUserDiet = optimisticDiet && [...optimisticDiet].reverse()

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
    const imagesName: string[] | undefined = reversedUserDiet?.map(
        (item) => item.name
    )
    const imageMap: { [key: string]: string } = mealData.reduce(
        (map, item) => {
            map[item.name] = item.image ?? 'default.png'
            return map
        },
        {} as { [key: string]: string }
    )

    const images = imagesName?.map((name) => imageMap[name] || 'default.png')

    const loadingToastId = useRef<string | null>(null)

    useEffect(() => {
        if (status === 'pending' && operation === 'saveDiet') {
            loadingToastId.current = toast.loading('Saving your diet')
        } else if (status === 'success' && operation === 'saveDiet') {
            if (loadingToastId.current) {
                toast.dismiss(loadingToastId.current)
            }
            toast.success('Diet saved successfully')
            setOptimisticDiet(reduxOptimisticDiet)
        }
    }, [status, operation, reduxOptimisticDiet])

    useEffect(() => {
        setOptimisticDiet(userDiet)
    }, [userDiet])

    const handleViewChange = (view: View) => {
        setCurrentView(view)
    }

    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />

            <div className="flex gap-4 p-5 justify-center sm:justify-normal">
                <button
                    className="capitalize bg-blue-900 text-slate-50 px-3 py-2 rounded-2xl hover:bg-blue-700 hover:scale-[1.01] duration-700"
                    onClick={() => handleViewChange('manageDiet')}
                >
                    Manage Diet
                </button>
                <button
                    className="capitalize bg-blue-900 text-slate-50 px-3 py-2 rounded-2xl hover:bg-blue-700 hover:scale-[1.01] duration-700"
                    onClick={() => handleViewChange('dietAnalysis')}
                >
                    Diet Analysis
                </button>
            </div>

            {currentView === 'manageDiet' && (
                <div className="">
                    <div className="flex sm:flex-row flex-col items-center align-middle p-5 justify-between gap-5 sm:gap-0">
                        <span className="text-3xl">Recent Diet Meal</span>
                        <DietAddForm />
                    </div>
                    <div className="flex flex-wrap overflow-x-hidden">
                        {status === 'success' &&
                            reversedUserDiet?.map((data, idx) => (
                                <div
                                    key={idx}
                                    className="relative w-full xl:w-[30%] m-5 sm:p-2 flex items-center bg-slate-50 shadow-md rounded-2xl overflow-hidden hover:scale-[1.01] duration-700 cursor-pointer"
                                >
                                    <div className="h-full overflow-hidden p-2">
                                        <img
                                            src={`/meals/${images && images[idx]}`}
                                            alt="Default"
                                            className="sm:w-40 w-28 h-full object-cover rounded-2xl hover:scale-105 duration-700"
                                        />
                                    </div>
                                    <div className="p-4 flex-1">
                                        <h2 className="text-xl font-semibold mb-2">
                                            {data.name}
                                        </h2>
                                        <p className="text-slate-600 mb-1">
                                            <strong>Calories:</strong>{' '}
                                            {data.calorie} kcal
                                        </p>
                                        <p className="text-slate-600 mb-1">
                                            <strong>Protein:</strong>{' '}
                                            {data.protein} g
                                        </p>
                                        <p className="text-slate-600 mb-1">
                                            <strong>Fat:</strong> {data.fat} g
                                        </p>
                                        <p className="text-slate-600 mb-1">
                                            <strong>Carbs:</strong> {data.carb}{' '}
                                            g
                                        </p>
                                        <p className="text-slate-600 mb-1">
                                            <strong>Date Added:</strong>{' '}
                                            {dateToday(data.id)}
                                        </p>
                                    </div>

                                    <div
                                        onClick={() =>
                                            dispatch(
                                                saveRecentDiet({
                                                    dietChanges: data,
                                                    method: 'remove',
                                                })
                                            )
                                        }
                                        className="absolute sm:bottom-5 sm:right-5 bottom-1 right-2 flex items-center justify-center p-2 rounded-xl bg-red-500 hover:bg-red-600 duration-500"
                                    >
                                        <IoTrashBinSharp className="text-slate-50 text-lg" />
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
                                        <p className="text-slate-600 mb-1 bg-slate-300 h-8 w-3/4 rounded-xl animate-pulse"></p>
                                        <p className="text-slate-600 mb-1 bg-slate-300 h-4 w-1/2 rounded-xl animate-pulse"></p>
                                        <p className="text-slate-600 mb-1 bg-slate-300 h-4 w-1/2 rounded-xl animate-pulse"></p>
                                        <p className="text-slate-600 mb-1 bg-slate-300 h-4 w-1/2 rounded-xl animate-pulse"></p>
                                        <p className="text-slate-600 mb-1 bg-slate-300 h-4 w-1/2 rounded-xl animate-pulse"></p>
                                        <p className="text-slate-600 mb-1 bg-slate-300 h-4 w-1/2 rounded-xl animate-pulse"></p>
                                    </div>
                                </div>
                            ))}
                    </div>

                    {(!optimisticDiet || optimisticDiet.length === 0) &&
                        status !== 'pending' && (
                            <div className="flex items-center justify-center  mt-40">
                                <div className="max-w-md mx-auto p-6 bg-slate-50 shadow-lg rounded-2xl text-center">
                                    <div className="text-2xl font-semibold text-slate-800 mb-4">
                                        Uh oh, no recent diet found
                                    </div>
                                    <div className="text-slate-600 mb-6">
                                        It seems like you haven&apos;t added any
                                        recent meal. Please add your recent diet
                                        to continue.
                                    </div>
                                    <div className="flex w-full px-4 py-2 justify-center">
                                        <DietAddForm />
                                    </div>
                                </div>
                            </div>
                        )}
                </div>
            )}

            {currentView === 'dietAnalysis' && <DietStats />}
        </>
    )
}
