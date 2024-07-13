
import { FaApple, FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import AuthImageSlideShow from "../components/Auth/ImageSlideShow";

export default function Page() {

    return (
        <>
            <div className="h-screen flex  justify-center items-center">
                <img src="/home/bg.svg" alt="" className="xl:flex inset-0 w-full h-full object-cover hidden absolute z-0" />
                <img src="/home/bg-md.svg" alt="" className="absolute inset-0 w-full h-full object-cover z-0 xl:hidden" />
                <div className="z-10 md:w-[90vw] md:h-[50vh] xl:w-[50vw] xl:h-[50vh] flex sm:flex-row flex-col-reverse">

                    <div className="sm:w-1/2 h-full bg-slate-50 sm:rounded-l-2xl  rounded-b-2xl py-6 sm:py-1">
                        <div className="flex flex-col p-2 gap-5 mx-10 sm:mx-0 sm:m-10 items-center">
                            <img
                                src="/home/logo.svg"
                                alt=""
                                className="w-14"
                            />
                            <span className="text-3xl text-slate-900 font-extrabold">
                                Welcome Back
                                {/* <CgSmileMouthOpen className="inline-flex mb-0.5 mx-2 text-2xl"/> */}
                            </span>

                        </div>

                        <div className="flex flex-col p-2 gap-5 m-10">
                            <div className="flex justify-center items-center gap-5 border-[3px] rounded-2xl p-2 hover:border-slate-400 duration-300 cursor-pointer">
                                <FcGoogle className="inline-flex text-2xl" />
                                <span className="text-xl font-semibold">
                                    Login with Google
                                </span>
                            </div>

                            <div className="flex justify-center items-center gap-5 border-[3px] rounded-2xl p-2 hover:border-slate-400 duration-300 cursor-pointer">
                                <FaFacebook className="inline-flex text-2xl text-blue-500" />
                                <span className="text-xl font-semibold">
                                    Login with FaceBook
                                </span>
                            </div>

                            <div className="flex justify-center items-center gap-5 border-[3px] rounded-2xl p-2 hover:border-slate-400 duration-300 cursor-pointer">
                                <FaApple className="inline-flex text-2xl text-slate-600" />
                                <span className="text-xl font-semibold">
                                    Login with Apple ID
                                </span>
                            </div>

                        </div>

                        <div className="flex flex-col p-2  gap-5 mx-10">
                            RAGE AI Yoga Trainer
                        </div>
                    </div>

                    <div className="sm:w-1/2 h-full overflow-hidden sm:rounded-r-2xl rounded-t-2xl">
                        <AuthImageSlideShow ></AuthImageSlideShow>

                    </div>
                </div>
            </div>

        </>
    )
}