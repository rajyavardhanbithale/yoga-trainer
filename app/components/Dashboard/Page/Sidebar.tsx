'use client'

import { Raleway } from 'next/font/google'
import { LuAlignLeft, LuLayoutDashboard } from 'react-icons/lu'
import { ImStatsDots } from 'react-icons/im'
import { PiBowlFoodLight } from 'react-icons/pi'
import { RiUser6Line } from 'react-icons/ri'
import { TbTrophy } from 'react-icons/tb'
import { Comfortaa } from 'next/font/google'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/lib/store'
import { activeWindow } from '@/lib/store/dashboard/dashboardSlice'
import { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'

import './dashboard.css'
import { IoHomeOutline, IoLogOutOutline } from 'react-icons/io5'
import { useRouter } from 'next/navigation'
import Logout from './Logout'

const raleway = Raleway({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})
const comfortaa = Comfortaa({ subsets: ['latin'] })

export default function Sidebar() {
    const [sidebar, setSidebar] = useState(false)
    const { push } = useRouter()
    const menuItem = [
        { title: 'Home', icon: <IoHomeOutline /> },
        { title: 'Dashboard', icon: <LuLayoutDashboard /> },
        { title: 'Stats', icon: <ImStatsDots /> },
        { title: 'Badges', icon: <TbTrophy /> },
        { title: 'Diet', icon: <PiBowlFoodLight /> },
        // { title: 'Profile', icon: <RiUser6Line /> },
    ]

    const activeWindows = useSelector(
        (state: RootState) => state.dashboard.activeWindow
    )
    const dispatch = useDispatch<AppDispatch>()

    const handleSideBarToggle = (option: string | null) => {
        if (option === 'home') {
            push('/')
        }
        if (option) {
            dispatch(activeWindow(option.toLowerCase()))
        }
        setSidebar(!sidebar)
    }

    const handleDispatch = (option: string) => {
        if (option === 'home') {
            push('/')
        }
        dispatch(activeWindow(option.toLowerCase()))
    }

    return (
        <>
            {/* for device greater than equal to md */}
            <div className="fixed hidden sm:block">
                <div className="h-[98vh] w-16 mx-3 mt-2 flex flex-col justify-between items-center bg-gradient-to-b from-gray-800 via-blue-800 to-blue-900 rounded-2xl">
                    <img
                        src="/home/logo.svg"
                        alt="Logo"
                        className="w-14 mt-5 brightness-200 hover:brightness-[5] duration-500"
                    />

                    <div className="flex flex-col justify-center items-center gap-5">
                        {menuItem.map((item, idx) => (
                            <div
                                onClick={() =>
                                    handleDispatch(item.title.toLowerCase())
                                }
                                key={idx}
                                className={`tooltip tooltip-right  hover:bg-opacity-50 hover:bg-blue-600 px-2.5 
                                py-2.5 rounded-xl duration-500 cursor-pointer
                                ${activeWindows === item.title.toLowerCase() ? 'bg-blue-100 text-slate-800' : 'bg-transparent text-slate-50'} 
                                `}
                                data-tip={item.title}
                            >
                                <span className="text-2xl font-bold ">
                                    {item.icon}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div>
                        <div
                            onClick={() =>
                                dispatch(activeWindow('profile'.toLowerCase()))
                            }
                            className={`tooltip tooltip-right flex flex-col justify-center items-center mb-3 hover:bg-opacity-50 hover:bg-blue-600 px-2.5 
                        py-2.5 rounded-xl duration-500 cursor-pointer
                        ${activeWindows === 'profile'.toLowerCase() ? 'bg-blue-100 text-slate-800' : 'bg-transparent text-slate-50'} 
                                `}
                            data-tip={'Profile'}
                        >
                            <span className="text-2xl font-bold">
                                <RiUser6Line />
                            </span>
                        </div>

                        <div
                            onClick={() =>
                                dispatch(activeWindow('logout'.toLowerCase()))
                            }
                            className={`tooltip tooltip-right flex flex-col justify-center items-center mb-3 hover:bg-opacity-50 hover:bg-blue-600 px-2.5 
                        py-2.5 rounded-xl duration-500 cursor-pointer
                        ${activeWindows === 'logout'.toLowerCase() ? 'bg-blue-100 text-slate-800' : 'bg-transparent text-slate-50'} 
                                `}
                            data-tip={'Logout'}
                        >
                            <Logout />
                        </div>
                    </div>
                </div>
            </div>

            {/* for device less than md */}
            {/* hamburger  */}
            <div className="z-[100] fixed sm:hidden block">
                <div
                    onClick={() => handleSideBarToggle(null)}
                    className="h-14 w-[90vw] mx-4 my-3 bg-gradient-to-r from-blue-950 to-blue-800 rounded-2xl flex justify-between items-center px-3"
                >
                    <div className="flex flex-col hover:bg-opacity-50 hover:bg-blue-900 px-1 py-1 rounded-xl duration-500 cursor-pointer">
                        <span className="text-3xl text-slate-50 font-bold">
                            <LuAlignLeft />
                        </span>
                    </div>

                    <div className="w-full justify-center text-center -ml-5">
                        <span className="text-xl text-white capitalize font-bold">
                            {activeWindows}
                        </span>
                    </div>
                </div>
            </div>

            {/* sidebar menu for device less than md  */}
            {sidebar && (
                <div
                    className={`z-[110] fixed h-full ${sidebar ? 'sidebar-in-animation' : 'sidebar-out-animation'}`}
                >
                    <div className="h-full w-52 flex flex-col justify-between items-center bg-gradient-to-b from-gray-800 via-blue-800 to-blue-900 rounded-r-3xl">
                        <div className="flex flex-col justify-center items-center mt-10">
                            <img
                                src="/home/logo.svg"
                                alt="Logo"
                                className="w-14 brightness-200 hover:brightness-[5] duration-500"
                            />
                            <span
                                className={`${comfortaa.className} text-3xl font-extrabold text-slate-50`}
                            >
                                RAGE AI
                            </span>
                        </div>
                        <div className="flex flex-col justify-start items-start gap-5">
                            {menuItem.map((item, idx) => (
                                <div
                                    onClick={() =>
                                        handleSideBarToggle(item.title)
                                    }
                                    key={idx}
                                    className="flex hover:bg-opacity-50 hover:bg-blue-600 px-2.5 py-2.5 rounded-xl duration-500 cursor-pointer gap-5"
                                >
                                    <span className="text-2xl text-slate-50 font-bold ">
                                        {item.icon}
                                    </span>
                                    <span className="text-xl text-slate-50 font-bold ">
                                        {item.title}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div>
                            <div
                                onClick={() => handleSideBarToggle('profile')}
                                className="flex flex-row gap-5 justify-start items-center bg-opacity-50 w-full mb-3 hover:bg-opacity-50 hover:bg-blue-600 px-4 py-2.5 rounded-xl duration-500 cursor-pointer"
                            >
                                <span className="text-2xl text-slate-50 font-bold">
                                    <RiUser6Line />
                                </span>
                                <span className="text-xl text-slate-50 font-bold">
                                    Profile
                                </span>
                            </div>

                            <div className="flex flex-row gap-5 justify-start items-center bg-opacity-50 w-full mb-3 hover:bg-opacity-50 hover:bg-blue-600 px-4 py-2.5 rounded-xl duration-500 cursor-pointer">
                                <Logout />
                                <span className="text-xl text-slate-50 font-bold"></span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {sidebar && (
                <div
                    onClick={() => handleSideBarToggle(null)}
                    className="absolute h-screen w-screen bg-transparent"
                ></div>
            )}
        </>
    )
}
