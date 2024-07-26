'use client'
import { FaApple, FaFacebook } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import AuthImageSlideShow from '../components/Auth/ImageSlideShow'

import { oAuthSignIn } from './actions'
import ProviderUpdate from './ProvidesUpdate'
import toast, { Toaster } from 'react-hot-toast'
import { useEffect } from "react"
import Cookies from 'js-cookie'
export default function Page() {

    // remove toast notification
    useEffect(() => { 
        Cookies.remove('init')
    }, [])

    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />
            <div className="min-h-screen flex justify-center items-center overflow-hidden bg-slate-200">
                <div className="xl:scale-105 relative z-10 flex flex-col-reverse sm:flex-row md:h-[50vh] lg:h-[56vh] xl:h-[50vh] md:w-[90vw] lg:w-[90vw] xl:w-[50vw]">
                    <div className="flex flex-col justify-evenly w-full sm:w-1/2 bg-slate-50 py-6 sm:py-0 sm:rounded-l-2xl sm:rounded-r-none  rounded-b-2xl shadow-xl">
                        <div className="flex flex-col gap-5 mx-10 sm:mx-0 sm:m-10 items-center">
                            <img src="/home/logo.svg" alt="" className="w-14" />
                            <span className="text-3xl text-slate-900 font-extrabold">
                                RAGE AI Login
                            </span>
                        </div>

                        <div className="flex flex-col p-2 gap-5 m-5">
                            <button
                                onClick={async () => {
                                    await oAuthSignIn('google')
                                }}
                                className="flex justify-center items-center gap-5 border-[3px] rounded-2xl p-2 hover:border-slate-400 duration-300 cursor-pointer"
                            >
                                <FcGoogle className="inline-flex text-2xl" />
                                <span className="text-xl font-semibold">
                                    Login with Google
                                </span>
                            </button>

                            <button
                                className="flex justify-center items-center gap-5 border-[3px] rounded-2xl p-2 hover:border-slate-400 duration-300 cursor-pointer"
                                onClick={() =>
                                    toast.custom((t) =>
                                        ProviderUpdate(t, 'facebook')
                                    )
                                }
                            >
                                <FaFacebook className="inline-flex text-2xl text-blue-500" />
                                <span className="text-xl font-semibold">
                                    Login with Facebook
                                </span>
                            </button>

                            <button
                                className="flex justify-center items-center gap-5 border-[3px] rounded-2xl p-2 hover:border-slate-400 duration-300 cursor-pointer"
                                onClick={() =>
                                    toast.custom((t) =>
                                        ProviderUpdate(t, 'apple')
                                    )
                                }
                            >
                                <FaApple className="inline-flex text-2xl text-slate-600" />
                                <span className="text-xl font-semibold">
                                    Login with Apple ID
                                </span>
                            </button>
                        </div>

                        <div className="flex flex-col p-2 gap-5 mx-10">
                            RAGE AI Yoga Trainer
                        </div>
                    </div>

                    <div className="w-full sm:w-1/2 h-full overflow-hidden sm:rounded-r-2xl sm:rounded-l-none rounded-t-2xl shadow-xl">
                        <AuthImageSlideShow />
                    </div>
                </div>
            </div>
        </>
    )
}
