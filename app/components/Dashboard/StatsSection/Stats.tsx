import dynamic from 'next/dynamic'


import { IoCalendarClearOutline } from "react-icons/io5"
import Heading from "../DashboardSection/Heading";
import WeekActivity from "./WeekActivity";
import DaySpent from "./DaysSpent";
import Accuracy from "./Accuracy";
import AreaOfInterest from "./AreaOfInterest";
import PerformanceAOI from "./PerformanceAOI";
import { DashboardStats } from "../../../../../types";


// const WeekActivity = dynamic(() => import('./WeekActivity'), { ssr: false })
// const DaySpent = dynamic(() => import('./DaysSpent'), { ssr: false })
// const Accuracy = dynamic(() => import('./Accuracy'), { ssr: false })
// const AreaOfInterest = dynamic(() => import('./AreaOfInterest'), { ssr: false })
// const PerformanceAOI = dynamic(() => import('./PerformanceAOI'), { ssr: false })


export default function StatsDashboard({ weeklyActivity, activeInMonth, performance, areaOfInterest }: DashboardStats) {

    const dateToday = () => {
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        const timestamp = Date.now()
        const epochDate = new Date(timestamp)
        const month = epochDate.getMonth()
        const date = epochDate.getDate()
        const year = epochDate.getFullYear()

        const dayIndex = epochDate.getDay()

        return `${dayNames[dayIndex]}, ${date} ${monthNames[month]} ${year}`
    }
    return (
        <>
            <div className="grid grid-cols-12 gap-8 m-5 overflow-y-hidden">
                {/* level 0 */}
                <div className="col-span-12 min-h-[5vh] flex flex-col sm:flex-row justify-between items-center rounded-2xl">
                    <span className="text-3xl mx-5 font-medium text-slate-800">
                        Dashboard
                    </span>
                    <div className="flex text-gray-700 font-light">
                        <IoCalendarClearOutline className="mx-3 text-xl" />
                        <span className="text-nowrap">
                            {dateToday()}
                        </span>
                    </div>
                </div>

                <div className="col-span-full xl:col-span-6 min-h-[50vh] flex flex-col justify-between rounded-2xl">
                    <Heading
                        title="Weekly Activity"
                        description="Overview of your activity throughout the week"
                    />
                    <div className="animate-fade-up">
                        <WeekActivity weeklyActivity={weeklyActivity} />

                    </div>
                </div>
                <div className="col-span-full xl:col-span-6 min-h-[50vh] flex flex-col justify-between rounded-2xl">
                    <Heading
                        title="Last 30 Days Activity"
                        description="Summary of your recent activity."
                    />
                    <div className="flex h-full w-full justify-center items-center animate-fade-left">
                        <DaySpent activeInMonth={activeInMonth} />

                    </div>
                </div>


                <div className="col-span-full xl:col-span-full min-h-[50vh] flex flex-col justify-between rounded-2xl">
                    <Heading
                        title="Last 30 Days Activity"
                        description="Summary of your recent activity."
                    />

                    <div className="animate-fade-up">

                        <Accuracy performanceData={performance} />
                    </div>


                </div>

                <div className="col-span-full xl:col-span-6 min-h-[50vh] flex flex-col justify-between rounded-2xl">
                    <Heading
                        title="Area of interest"
                        description="Here are the most performed yoga pose"
                    />

                    <div className="flex h-full w-full justify-center items-center">
                        <AreaOfInterest areaOfInterest={areaOfInterest} />
                    </div>


                </div>

                <div className="col-span-full xl:col-span-6 min-h-[50vh] flex flex-col justify-between rounded-2xl">
                    <Heading
                        title="Performance in Yoga Pose"
                        description="Here are the most commonly practiced yoga poses."
                    />

                    <div className="flex h-full w-full justify-center items-center">
                        <PerformanceAOI areaOfInterest={areaOfInterest} />
                    </div>


                </div>




                {/* <div className="bg-slate-300 animate-pulse col-span-full xl:col-span-6 min-h-[50vh] flex flex-col justify-between rounded-2xl"></div> */}




            </div >

        </>
    )
}