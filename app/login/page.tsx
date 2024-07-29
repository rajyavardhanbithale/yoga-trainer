'use client'
import { FaApple, FaFacebook } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import AuthImageSlideShow from '../components/Auth/ImageSlideShow'

import { oAuthSignIn } from './actions'
import ProviderUpdate from './ProvidesUpdate'
import toast, { Toaster } from 'react-hot-toast'
import { useEffect } from 'react'
import Cookies from 'js-cookie'

export default function Page() {
    // remove toast notification
    useEffect(() => {
        Cookies.remove('init')
    }, [])

    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />
            <div className="min-h-screen flex justify-center items-center overflow-hidden bg-white">
                <div className="relative z-10 sm:grid flex flex-col-reverse sm:grid-cols-2  md:grid-rows-1 md:auto-rows-auto md:rounded-xl">
                    <div className="flex flex-col justify-evenly bg-slate-100 py-6 sm:py-5 sm:px-10 sm:rounded-l-2xl sm:rounded-r-none rounded-b-2xl shadow-xl">
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

                    <div className="h-full overflow-hidden sm:rounded-r-2xl sm:rounded-l-none rounded-t-2xl shadow-xl">
                        <AuthImageSlideShow />
                    </div>
                </div>
            </div>
        </>
    )
}
