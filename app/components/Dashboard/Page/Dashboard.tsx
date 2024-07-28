'use client'

import './dashboard.css'
import { BsLightningCharge } from 'react-icons/bs'
import { IoCalendarClearOutline } from 'react-icons/io5'
import Calendar from './Calendar'
import RecentActivity from './RecentActivity'
import Heading from './Heading'
import LastTHDays from './LastTHDays'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    fetchDashboardAPI,
    fetchRecentActivity,
    fetchYogaPoseAPI,
} from '@/lib/store/dashboard/dashboardSlice'
import { AppDispatch, RootState } from '@/lib/store'
import { RxActivityLog } from 'react-icons/rx'

export default function Dashboard(name: any) {
    const dashboardData = useSelector(
        (state: RootState) => state.dashboard.data
    )
    const poseInfo = useSelector((state: RootState) => state.dashboard.POSEDATA)
    const recentActivities = useSelector(
        (state: RootState) => state.dashboard.RECENTACT
    )
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(fetchDashboardAPI())
    }, [dispatch])

    useEffect(() => {
        if (dashboardData) {
            dispatch(fetchYogaPoseAPI(dashboardData?.todayPoseList.toString()))
            dispatch(
                fetchRecentActivity(
                    dashboardData?.userRecentActivity.toString()
                )
            )
        }
    }, [dashboardData])

    const dateToday = () => {
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

        const timestamp = Date.now()
        const epochDate = new Date(timestamp)
        const month = epochDate.getMonth()
        const date = epochDate.getDate()
        const year = epochDate.getFullYear()

        const dayIndex = epochDate.getDay()

        return `${dayNames[dayIndex]}, ${date} ${monthNames[month]} ${year}`
    }

    const wishes = (time: string, name: string) => {
        switch (time) {
            case 'Morning':
                return `Good morning, ${name}! Rise and shine for your yoga session.`
            case 'Midday':
                return `Hey ${name}, it's time for your midday yoga break. Take a moment to recharge.`
            case 'Evening':
                return `Good evening, ${name}! Unwind and release tension with some calming yoga.`
            case 'Afternoon':
                return `Hello, ${name}! Take a break from your day and enjoy a refreshing yoga session.`
            case 'Night':
                return `Hey ${name}, wind down your day with some relaxing yoga before bed.`
            default:
                return `Hello, ${name}! Enjoy your yoga session.`
        }
    }


    return (
        <>
            {dashboardData && poseInfo && recentActivities && (
                <div className="grid grid-cols-12 gap-8 m-2 overflow-y-hidden">
                    {/* level 0 */}
                    <div className="col-span-12 min-h-[5vh] flex flex-col sm:flex-row justify-between items-center rounded-2xl">
                        <span className="text-3xl mx-5 font-medium text-slate-800">
                            Dashboard
                        </span>
                        <div className="flex text-gray-700 font-light">
                            <IoCalendarClearOutline className="mx-3 text-xl" />
                            <span className="text-nowrap">{dateToday()}</span>
                        </div>
                    </div>

                    {/* level 1 */}

                    {/* level 1.1 - user welcome */}
                    <div className="col-span-full xl:col-span-4 h-[50vh] overflow-hidden rounded-2xl">
                        <div className="h-full anim-blob flex flex-col justify-center">
                            <div className="w-44 mx-auto">
                                <img
                                    src="/dashboard/meditation.gif"
                                    alt="yoga"
                                />
                            </div>
                            <div className="flex text-center mx-5">
                                <span className="text-xl px-5 text-white capitalize font-bold">
                                    {wishes('Morning', name.name.split(' ')[0] ?? 'User')}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* level 1.2 - today list */}
                    <div className="col-span-full xl:col-span-5 sm:h-[50vh] flex flex-col  rounded-2xl">
                        <Heading
                            title=" Today's List"
                            description="Complete the following yoga exercises"
                        />

                        <div className="my-3 flex flex-col justify-around h-full">
                            {poseInfo &&
                                poseInfo.map((item: any, idx) => (
                                    <div
                                        key={idx}
                                        className="flex flex-col sm:flex-row gap-5 sm:gap-0 justify-between capitalize mt-2 px-3 py-5 sm:py-2 items-center align-middle rounded-2xl shadow-lg hover:shadow-xl border-2 border-slate-200 duration-500"
                                    >
                                        <div className="flex flex-col sm:flex-row items-center sm:w-3/5 gap-5 sm:gap-0">
                                            <div className="sm:w-16 w-36">
                                                <img
                                                    className="object-scale-down mix-blend-multiply rounded-xl"
                                                    src={`/pose/image/webp/${item?.image}`}
                                                    alt={item.name}
                                                />
                                            </div>

                                            <span className="text-xl overflow-hidden mx-4 p-1 truncate sm:block hidden">
                                                {item.name} -{' '}
                                                {item.originalName}
                                            </span>

                                            <span className="text-xl overflow-hidden mx-4 p-1 truncate sm:hidden block">
                                                {item.name} -{' '}
                                            </span>
                                            <span className="text-xl overflow-hidden mx-4 p-1 truncate sm:hidden block">
                                                {item.originalName}
                                            </span>
                                        </div>

                                        <button className="capitalize bg-blue-800 text-xl text-slate-100 rounded-xl px-3 py-3 font-medium h-fit mx-2 shadow-md hover:shadow-indigo-900 duration-300">
                                            perform
                                            <BsLightningCharge className="inline-flex mx-1" />
                                        </button>
                                    </div>
                                ))}
                        </div>
                    </div>

                    {/* level 1.3 - calendar */}
                    <div className="col-span-full xl:col-span-3 h-[50vh] rounded-2xl overflow-hidden">
                        <Heading
                            title="Current Activity"
                            description="All active dates are marked below"
                        />

                        <div className="flex sm:-mt-11 2xl:mt-0 justify-center">
                            <Calendar
                                epochTimes={dashboardData.userActiveDays}
                            />
                        </div>
                    </div>


                    {/* level 2 */}

                    {/* level 2.1 recent activity */}
                    <div className="col-span-full xl:col-span-9 h-[50vh] rounded-2xl overflow-hidden">
                        <Heading
                            title="Recent Activities"
                            description="All your recent activities are displayed below"
                        />
                        {recentActivities.length !== 0 && (
                            <div className="mx-5 my-3 p-3 flex flex-col justify-between h-fit">
                                <RecentActivity
                                    recentActivities={recentActivities}
                                />
                            </div>
                        )}

                        {recentActivities.length === 0 && (
                            <div className="h-full flex flex-col gap-5 justify-center items-center align-middle">
                                <RxActivityLog className="text-4xl text-slate-900" />
                                <span className="text-2xl text-slate-900 font-semibold">
                                    No recent activities
                                </span>
                            </div>
                        )}
                    </div>

                    {/* level 2.2 last 30 days */}
                    <div className="col-span-full xl:col-span-3 h-[50vh] rounded-2xl overflow-hidden">
                        <Heading
                            title="Last 30 Days"
                            description="Overview of activity trends over the last 30 days."
                        />
                        <div className="h-[45vh] flex justify-center items-center my-5 mx-8">
                            <LastTHDays
                                chartData={dashboardData.userLastNDaysActivity}
                            />
                        </div>
                    </div>
                </div>
            )}
            {!(dashboardData && poseInfo && recentActivities) && (
                <div className="grid grid-cols-12 gap-8 m-2 overflow-y-hidden">
                    {/* level 0 */}
                    <div className="col-span-12 min-h-[5vh] flex flex-col sm:flex-row justify-between items-center rounded-2xl">
                        <span className="text-3xl mx-5 font-medium text-slate-800">
                            Dashboard
                        </span>
                        <div className="flex text-gray-700 font-light">
                            <IoCalendarClearOutline className="mx-3 text-xl" />
                            <span className="text-nowrap">{dateToday()}</span>
                        </div>
                    </div>

                    <div className="col-span-full xl:col-span-4 min-h-[40vh] bg-slate-300 animate-pulse overflow-hidden rounded-2xl"></div>
                    <div className="col-span-full xl:col-span-5 min-h-[40vh] bg-slate-300 animate-pulse rounded-2xl"></div>
                    <div className="col-span-full xl:col-span-3 min-h-[40vh] max-h-[40vh] rounded-2xl bg-slate-300 animate-pulse"></div>
                    <div className="col-span-full xl:col-span-9 min-h-[40vh] rounded-2xl bg-slate-300 animate-pulse"></div>
                    <div className="col-span-full xl:col-span-3 min-h-[40vh] max-h-[40vh] rounded-2xl bg-slate-300 animate-pulse"></div>
                </div>
            )}
        </>
    )
}
