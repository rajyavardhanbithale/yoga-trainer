import { IoCalendarClearOutline } from 'react-icons/io5'

export default function SkeletonDashboard() {
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
                        <span className="text-nowrap">{dateToday()}</span>
                    </div>
                </div>

                {/* level 1 */}

                {/* level 1.1 - user welcome */}
                <div className="bg-slate-300 animate-pulse col-span-full xl:col-span-4 min-h-[40vh] overflow-hidden rounded-2xl"></div>

                {/* level 1.2 - today list */}
                <div className="bg-slate-300 animate-pulse col-span-full xl:col-span-5 min-h-[40vh] flex flex-col justify-between rounded-2xl"></div>

                {/* level 1.3 - calendar */}
                <div className="bg-slate-300 animate-pulse col-span-full xl:col-span-3 min-h-[40vh] max-h-[40vh] rounded-2xl overflow-hidden"></div>

                {/* level 2 */}

                {/* level 2.1 recent activity */}
                <div className="bg-slate-300 animate-pulse col-span-full xl:col-span-9 min-h-[40vh] rounded-2xl">
                    {' '}
                </div>

                {/* level 2.2 last 30 days */}
                <div className="bg-slate-300 animate-pulse col-span-full xl:col-span-3 min-h-[40vh] max-h-[40vh] rounded-2xl">
                    {' '}
                </div>
            </div>
        </>
    )
}
