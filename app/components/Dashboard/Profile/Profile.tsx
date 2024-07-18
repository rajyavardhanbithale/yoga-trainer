'use client'

import { useEffect, useMemo, useState } from "react"
import { MdModeEditOutline } from "react-icons/md"
import { IoLocationOutline } from "react-icons/io5"
import Image from "next/image"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/lib/store"
import { fetchUser } from "@/lib/store/dashboard/userProfileSlice"
import { getName } from "country-list"

export default function Profile(props: any) {
    const [isPublic, setIsPublic] = useState(false);

    const userProfile = useSelector((state: RootState) => state.userProfile.USERINFO)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(fetchUser())
    }, [])

    useEffect(()=>{
        if(userProfile){
            setIsPublic(userProfile?.isPublic);
        }
    },[userProfile])

    const joinedTime = (time: number) => {
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        const jTime = new Date(time)
        const date = jTime.getDate()
        const year = jTime.getFullYear()
        const month = jTime.getMonth()
        const monthName = monthNames[month]
        // return { date, year, month, monthName }
        return `${date} ${monthName} ${year}`
    }


    const handleToggle = () => {
        setIsPublic(!isPublic);
    };

    return (
        <>
            {userProfile &&
                <div className="h-screen flex justify-center items-center bg-gray-50">
                    <div className="grid bg-white w-11/12 xl:w-1/2 grid-cols-6 p-6 rounded-2xl shadow-xl">
                        <div className="col-span-2 flex flex-col justify-center items-center">
                            <div className="m-4 w-40 h-40 overflow-hidden rounded-xl shadow-2xl">
                                <img
                                    src="/avatar/men/men-5.webp"
                                    alt="avatar"
                                    className="w-full h-full object-cover rounded-xl shadow-2xl transition-transform hover:scale-110 duration-700"
                                />
                            </div>

                            <button
                                className="w-3/4 xl:w-1/2 bg-blue-900 text-white px-4 py-2 font-medium rounded-2xl my-2 hover:brightness-90 duration-500 flex items-center justify-center">
                                Change
                                <MdModeEditOutline className="ml-2" />
                            </button>
                        </div>
                        <div className="col-span-4 flex flex-col justify-center m-5 gap-4">
                            <div className="flex flex-col">
                                <span className="text-4xl font-semibold text-gray-800">{userProfile.name}</span>
                                <span className="text-sm font-semibold text-gray-600">#{userProfile.userID}</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <Image
                                    height={24}
                                    width={24}
                                    className="mr-2 rounded-md shadow-xl brightness-95"
                                    src={`https://flagicons.lipis.dev/flags/4x3/${userProfile.country}.svg`} alt="" />
                                <span className="text-xl text-gray-700 cursor-pointer hover:text-gray-900 duration-500">
                                    {getName(userProfile.country)}
                                </span>
                            </div>

                            <span className="text-gray-800">
                                Member since {joinedTime(userProfile.date)}
                            </span>

                            <div className="flex items-center gap-2">
                                <span className="text-gray-800">{isPublic ? "Public" : "Private"} Account</span>
                                <label className="flex cursor-pointer select-none items-center">
                                    <div className="relative">
                                        <input
                                            type="checkbox"
                                            checked={isPublic}
                                            onChange={handleToggle}
                                            className="sr-only"
                                        />
                                       <div className={`block h-6 w-10 rounded-full transition ${isPublic ? "bg-emerald-500" : "bg-blue-500"}`}></div>
                                       <div className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition transform ${isPublic ? "translate-x-4" : ""}`}></div>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

            }
        </>
    )
} 