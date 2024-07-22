'use client'
import { Raleway } from 'next/font/google'
import { LuLayoutDashboard } from 'react-icons/lu'
import { ImStatsDots } from 'react-icons/im'
import { PiBowlFoodLight } from 'react-icons/pi'
import { RiUser6Line } from 'react-icons/ri'
import { TbTrophy } from 'react-icons/tb'
import { Comfortaa } from 'next/font/google'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/lib/store'
import { activeWindow } from '@/lib/store/dashboard/dashboardSlice'

const raleway = Raleway({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})
const comfortaa = Comfortaa({ subsets: ['latin'] })

export default function Sidebar() {
    const menuItem = [
        { title: 'Dashboard', icon: <LuLayoutDashboard /> },
        { title: 'Stats', icon: <ImStatsDots /> },
        { title: 'Achievements', icon: <TbTrophy /> },
        { title: 'Diet', icon: <PiBowlFoodLight /> },
        { title: 'Profile', icon: <RiUser6Line /> },
    ]

    const activeWindows = useSelector(
        (state: RootState) => state.dashboard.activeWindow
    )
    const dispatch = useDispatch<AppDispatch>()

    return (
        <>
            <div
                className={`${raleway.className} h-screen sticky top-0 bg-gradient-to-b from-gray-800 via-blue-800 to-blue-900 text-white flex flex-col w-64 shadow-lg`}
            >
                <div className="flex flex-col mt-8 items-center justify-center">
                    <img
                        src="/home/logo.svg"
                        alt="Logo"
                        className="w-16 mb-3"
                    />
                    <span
                        className={`${comfortaa.className} text-3xl font-extrabold`}
                    >
                        RAGE AI
                    </span>
                </div>
                <div className="flex-1 flex items-center mx-5 h-fit">
                    <ul className="w-full">
                        {menuItem.map((item, index) => (
                            <li
                                onClick={() =>
                                    dispatch(
                                        activeWindow(
                                            item.title.toLocaleLowerCase()
                                        )
                                    )
                                }
                                key={index}
                                className="flex items-center p-4 my-4 hover:bg-blue-950 hover:bg-opacity-50 cursor-pointer text-xl font-semibold transition-colors duration-500 rounded-2xl  ease-in-out"
                            >
                                <span className="mr-4">{item.icon}</span>
                                <span>{item.title}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="p-4 mt-20 text-center">Signout</div>
            </div>
        </>
    )
}
