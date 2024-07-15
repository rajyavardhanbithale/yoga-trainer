'use client'

import { useEffect, useMemo, useState } from "react"
import ProfilePicMenu from "./ProfilePicMenu"
import { MdModeEditOutline } from "react-icons/md"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import CryptoJS from 'crypto-js';
import { IoLocationOutline } from "react-icons/io5"
import { getName } from 'country-list';
import CountrySelector from "./CountrySelector"



const USERDB = process.env.NEXT_PUBLIC_SUPABASE_DATABASE_USER_PROFILE!

interface Avatar {
    name: string | null
    avatar: string | null
    popUpID: string | null
    country: string | null
}


export default function Profile(props: any) {
    const user = props?.user
    const supabase = createClientComponentClient()
    const userID = CryptoJS.MD5(user.id).toString()

    const [isChecked, setIsChecked] = useState<boolean>(false)
    const [userDetails, setUserDetails] = useState<Avatar>({
        name: null,
        avatar: null,
        popUpID: null,
        country: null
    })


    // i know :( :(
    function isValidURL(string: string) {
        const res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        return (res !== null)
    }

    const updateAvatar = async (avatarName: string) => {
        const { data, error } = await supabase
            .from(USERDB)
            .update({ 'profile_pic': avatarName })
            .eq('userID', userID)
            .select('*')
            .single()
    }
    const updateCountry = async (country: string) => {
        const { data, error } = await supabase
            .from(USERDB)
            .update({ 'country': country })
            .eq('userID', userID)
            .select('*')
            .single()
    }

    const updateProfileType = async (profile_type: string) => {
        const { data, error } = await supabase
            .from(USERDB)
            .update({ 'profile_type': profile_type })
            .eq('userID', userID)
            .select('*')
            .single()
    }

    // fetching user profile from  database
    useEffect(() => {
        const fetchDB = async () => {
            const { data, error } = await supabase
                .from(USERDB)
                .select('profile_pic,name,country,profile_type')
                .eq('userID', userID)

            const pic = data && data[0]?.profile_pic
            const name = data && data[0]?.name
            const country = data && data[0]?.country
            const profile_type = data && data[0]?.profile_type

            if (!isValidURL(pic)) {
                const file = `/avatar/${pic.split('.')[0].split('-')[0]}/${pic}.webp`
                setUserDetails({ ...userDetails, avatar: file, name: name, country: country })


            } else {
                setUserDetails({ ...userDetails, avatar: pic, name: name, country: country })
            }

            setIsChecked(profile_type === 'public' ? false : true)

        }

        fetchDB()

    }, [userDetails?.avatar, userDetails?.name, userDetails?.country])



    const joinedTime = () => {
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        const jTime = new Date(user.created_at)
        const date = jTime.getDate()
        const year = jTime.getFullYear()
        const month = jTime.getMonth()
        const monthName = monthNames[month]
        return { date, year, month, monthName }
    }

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked)
    }

    useEffect(() => {
        updateProfileType(isChecked === true ? 'public' : 'private')
    }, [isChecked, setIsChecked])

    const userPublicID = () => {
        const userIDThreshold = 3
        const publicHash = userID.slice(0, userIDThreshold)
            + userID.slice(userID.length - userIDThreshold, userID.length)
        return publicHash
    }



    return (
        <>
            <div className="h-screen flex flex-col justify-center align-middle items-center">
                <div className="xl:w-[40%] w-3/4 grid grid-cols-3  bg-slate-100/75 rounded-2xl p-2 py-5 shadow-2xl">

                    <div className="col-span-1 flex flex-col justify-center gap-3">
                        <div className="flex m-4 w-fit mx-auto cursor-pointer overflow-hidden rounded-xl shadow-2xl">
                            <img
                                src={`${userDetails && userDetails.avatar}`}
                                alt="avatar"
                                className="w-36 h-36 object-cover object-top rounded-xl shadow-2xl transition-transform  hover:scale-110 duration-700"
                            />
                        </div>


                        <button
                            onClick={() => setUserDetails({ ...userDetails, popUpID: 'profilePic' })}
                            className="xl:w-1/2 w-3/4 bg-accent text-white px-2 py-1 font-medium mx-auto rounded-2xl my-2 hover:brightness-90 duration-500">
                            Change
                            <MdModeEditOutline className="inline-flex  justify-start ml-1 mb-0.5" />
                        </button>

                        {userDetails.popUpID === 'profilePic' &&
                            <ProfilePicMenu
                                userDetails={userDetails}
                                setUserDetails={setUserDetails}
                                updateAvatar={updateAvatar}
                            />
                        }
                    </div>

                    <div className="col-span-2 flex flex-col xl:justify-start justify-center m-10 gap-4">

                        <div className="flex flex-col cursor-pointer">
                            <span className="text-4xl text-slate-800 font-semibold">
                                {userDetails && userDetails.name}
                            </span>
                            <span className="text-sm text-slate-600">
                                # {userPublicID()}
                            </span>

                        </div>

                        <div className="flex items-center gap-2">
                            {userDetails && userDetails?.country ? (
                                <div
                                    onClick={() => setUserDetails({ ...userDetails, popUpID: 'countrySelect' })}
                                    className="flex">
                                    <img
                                        className="w-7 mr-2 rounded-md shadow-xl"

                                        src={`https://flagicons.lipis.dev/flags/4x3/${userDetails.country}.svg`} alt={userDetails.country} />
                                    <span className="text-xl text-slate-700 cursor-pointer hover:text-slate-900 duration-500">
                                        {getName(userDetails?.country)}
                                    </span>
                                </div>

                            ) : (
                                <>
                                    <span className="text-xl text-slate-800">
                                        <IoLocationOutline />
                                    </span>
                                    <span
                                        onClick={() => setUserDetails({ ...userDetails, popUpID: 'countrySelect' })}
                                        className="text-slate-700 cursor-pointer hover:text-slate-900 duration-500">
                                        Update Location
                                    </span>

                                </>

                            )}
                            {userDetails.popUpID === 'countrySelect' &&
                                <CountrySelector
                                    userDetails={userDetails}
                                    setUserDetails={setUserDetails}
                                    updateCountry={updateCountry}
                                />
                            }

                        </div>

                        <span className=" text-slate-800">
                            Member since  {joinedTime().date} {joinedTime().monthName} {joinedTime().year}
                        </span>

                        <div className="flex gap-2">
                            <span className=" text-slate-800">
                                Public Account
                            </span>


                            <label className="flex cursor-pointer select-none items-center ">
                                <div className="relative">
                                    <input
                                        type="checkbox"
                                        checked={isChecked}
                                        onChange={handleCheckboxChange}
                                        className="sr-only"
                                    />
                                    <div
                                        className={`box block h-6 w-10 rounded-full ${isChecked ? "bg-emerald-500" : "bg-slate-400"
                                            }`}
                                    ></div>
                                    <div
                                        className={`absolute left-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-white transition ${isChecked ? "translate-x-full" : ""
                                            }`}
                                    ></div>
                                </div>
                            </label>

                        </div>

                    </div>

                </div>

            </div>
        </>
    )
} 0